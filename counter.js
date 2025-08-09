/**
 * Script to count the number of Discord guilds (servers) a user is in.
 * Requires the user to be logged into Discord in the browser.
 * The script attempts to retrieve the authentication token from localStorage.
 */

(async () => {
  
  /**
   * Retrieve Discord auth token from localStorage.
   * Tries direct access first; falls back to using an iframe if direct access fails.
   * @returns {string|null} The token, or null if not found.
   */
  function getToken() {
    // Attempt direct localStorage access
    try {
      const raw = localStorage.getItem("token");
      if (raw) return raw.replace(/^"|"$/g, ""); // Remove surrounding quotes
    } catch (err) {
      // Ignore direct access errors (e.g., blocked by browser security)
    }

    // Attempt access via an injected iframe
    try {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      const raw = iframe.contentWindow.localStorage.getItem("token");
      iframe.remove();

      if (raw) return raw.replace(/^"|"$/g, "");
    } catch (err) {
      // Ignore iframe access errors
    }

    // Token not found
    return null;
  }

  // Get the token
  const token = getToken();
  if (!token) {
    throw new Error(
      "Token not found. Make sure you're logged into Discord, refresh the page, and try again."
    );
  }

  // Pagination variables
  let totalGuilds = 0;
  let after = null;

  // Loop through paginated API results
  while (true) {
    const url = new URL("https://discord.com/api/v9/users/@me/guilds");
    url.searchParams.set("limit", "200"); // Max allowed per request
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url, {
      headers: { authorization: token },
    });

    // Handle API errors
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text}`);
    }

    const data = await res.json();
    totalGuilds += data.length;

    // Stop if fewer than 200 results were returned (end of list)
    if (data.length < 200) break;

    // Set `after` to the last guild's ID for the next page
    after = data[data.length - 1].id;
  }

  console.log("Total guilds:", totalGuilds);
  return totalGuilds;

})();
