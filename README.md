# Discord Server (Guild) Counter

A JavaScript snippet to **count the total number of Discord guilds (servers)** your account is in.  
It works directly in the browser console while logged into [Discord Web](https://discord.com/channels/@me).

---
[See the complete driver code here!](./counter.js)

The following snippet is just a "Head & Tail" example.
```js
(async () => {
  // Retrieve Discord token
  function getToken() {
    try { return localStorage.getItem("token")?.replace(/^"|"$/g, ""); } catch {}
    try {
      const f = document.createElement("iframe");
      document.body.appendChild(f);
      const raw = f.contentWindow.localStorage.getItem("token");
      f.remove();
      return raw?.replace(/^"|"$/g, "");
    } catch {}
    return null;
  }

  // ... (pagination & fetch logic)

  console.log("Total guilds:", totalGuilds);
})();
```

## 📌 Features
- **Automatic Token Retrieval** — Attempts to fetch your Discord authentication token from `localStorage` directly or via an iframe fallback.
- **API Pagination Handling** — Iterates through all guilds with proper pagination support.
- **Error Handling** — Displays clear error messages if token retrieval or API calls fail.
- **Self-contained** — No dependencies required; just paste into your browser console.

---

## 🚀 Usage

1. **Log in** to your Discord account on the [web version](https://discord.com).
2. Open your **browser developer console**:
   - Chrome / Edge: `Ctrl + Shift + J` (Windows) or `Cmd + Option + J` (Mac)
   - Firefox: `Ctrl + Shift + K` (Windows) or `Cmd + Option + K` (Mac)
3. Paste the script from [`counter.js`](./counter.js) into the console.
4. Press **Enter**.
5. The total number of guilds will be printed in the console.

---

## 📜 Example Output
```
Total guilds: 137
```


---

## ⚠️ Disclaimer
- This script **does not** store, send, or share your token.  
- Your Discord authentication token is sensitive. **Never share it** with anyone or paste it into untrusted websites/scripts.  
- This script is for **personal use** only.  
- Using your token to make API calls **may violate Discord’s Terms of Service**. Proceed at your own risk.

---

## 🛠 How It Works
1. **Token Retrieval**  
   The script tries:
   - Directly reading `localStorage.getItem("token")`
   - Using an `iframe` to bypass potential access restrictions
2. **Guild Counting**  
   Uses the `/users/@me/guilds` API endpoint with a limit of 200 per request.  
   Continues until all pages are fetched.
3. **Result Display**  
   Prints the total number of guilds in the console.

---

## 📄 License
This project is released under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

Hope you enjoy it!
Made with ❤️

[![MΞHDI ⧗](https://img.shields.io/badge/M%CE%9EHDI-Zerion-darkblue)](https://link.zerion.io/)

---
