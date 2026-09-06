# DevForge website

## Run it locally

1. Unzip this folder and open it in VS Code.
2. Open a terminal in VS Code (Terminal → New Terminal) and run:
   ```
   npm install
   npm run dev
   ```
3. Vite will print a local URL (usually `http://localhost:5173`) — open it in your browser.

## Make the contact form actually send you emails

The form is already wired to submit via [Formspree](https://formspree.io), a free
service that forwards form submissions straight to your inbox — no backend needed.

1. Go to formspree.io and sign up (free plan is enough).
2. Click **New Form**, name it anything (e.g. "DevForge contact"), and set the
   receiving email to `rajdeepsinghofficial08@gmail.com`.
3. Formspree will send a confirmation email to that address — open it and click
   confirm, or submissions won't go through.
4. Copy the endpoint URL Formspree gives you — it looks like
   `https://formspree.io/f/abcd1234`.
5. Open `src/App.jsx`, find this line near the top:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   and replace it with your real endpoint.
6. Save, and test the form on your site — the submission should land in your
   inbox within a minute or two.

Free Formspree plans cap out at 50 submissions/month, which is plenty for a
new site. You can upgrade later if you outgrow it.

## Deploying the site

Once you're happy with it, the easiest free options are:

- **Vercel** (vercel.com) — connect your GitHub repo, it builds and deploys automatically.
- **Netlify** (netlify.com) — same idea, drag-and-drop or GitHub-connected.

Either one will also let you point your own domain at it later.
