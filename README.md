# Techcadd Virtual Academy – Landing Page

Next.js (App Router) landing page for [virtualacademy.in](https://virtualacademy.in).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Course data, contact details and FAQs live in `lib/site.ts`.

## Google Sheet setup (enrollment form)

Form submissions go: **website form → `/api/enroll` → Google Apps Script → your Google Sheet**.
One-time setup, about 5 minutes:

### 1. Create the sheet and script

1. Create a new Google Sheet (e.g. "Virtual Academy Enrollments").
2. In the sheet: **Extensions → Apps Script**.
3. Delete the sample code and paste the contents of [`google-apps-script/Code.gs`](google-apps-script/Code.gs).
4. Set `SECRET` at the top to the value of `GOOGLE_SHEET_SECRET` in your `.env.local`.
5. Click **Save** (💾).

### 2. Deploy it as a web app

1. **Deploy → New deployment**. Click the ⚙️ next to "Select type" → **Web app**.
2. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
3. Click **Deploy**, then **Authorize access** and allow it with your Google account.
   (If you see "Google hasn't verified this app": **Advanced → Go to … (unsafe)**. It's your own script.)
4. Copy the **Web app URL** (ends with `/exec`).

To check it works, open that URL in a browser: you should see `"Enrollment endpoint is live"`.

### 3. Connect the website

Put the URL in `.env.local`:

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
GOOGLE_SHEET_SECRET=<same value as SECRET in Code.gs>
```

Restart `npm run dev`. Submit the form and a row appears in the **Enrollments** tab
(it's created automatically, with a header row).

**On your hosting (Vercel, etc.):** add the same two environment variables in the project settings,
then redeploy.

### Changing the script later

After editing `Code.gs`, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
This keeps the same URL. Choosing "New deployment" again creates a *new* URL, which you'd then need to
update in your environment variables.

### What gets saved

| Timestamp (IST) | Full Name | Mobile (WhatsApp) | Email | City | Course | Current Status | Page |
|---|---|---|---|---|---|---|---|

Spam protection: hidden honeypot field, server-side validation, and the shared secret (so nobody can
post to your script directly without it).
