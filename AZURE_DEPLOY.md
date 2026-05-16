# Deploy GEM & JEWELLERY on Azure

This project is two apps:

- **frontend/** — Vite + React (static)
- **backend/**  — Node + Express + TypeScript (API)

The cleanest Azure mapping is:

- Frontend → **Azure Static Web App**  (free tier works)
- Backend  → **Azure App Service (Linux · Node 20)**  (B1 is plenty)

You'll end up with two URLs. The Static Web App will rewrite `/api/*` to the App Service so the site looks single-origin to the user.

---

## 0 · Prerequisites

- An Azure subscription
- GitHub account with this repo pushed (recommended) or the Azure CLI for zip-deploy
- Node 20+ locally (for a clean build test)

Quick local sanity check:

```bash
cd backend  && npm install && npm run build && npm start
cd frontend && npm install && npm run build && npm run preview
```

---

## 1 · Deploy the backend (App Service)

1. **Portal → Create → Web App**
   - Runtime: **Node 20 LTS**
   - OS: **Linux**
   - Plan: **B1** (or **F1** for free)
   - Name: e.g. `gaj-api`
2. **Deployment Center**
   - Pick **GitHub Actions** → repo → branch `main`
   - Azure creates a workflow; edit it so it only builds/deploys the `backend/` folder:
     ```yaml
     - name: Install + build
       working-directory: backend
       run: |
         npm ci
         npm run build
     - name: Zip
       run: cd backend && zip -r ../app.zip . -x "src/*" "*.ts" "tsconfig*"
     - uses: azure/webapps-deploy@v3
       with:
         app-name: gaj-api
         package: app.zip
     ```
3. **Configuration → Application settings** — add:
   - `NODE_ENV` = `production`
   - `PORT` = `8080`  (App Service sets this automatically; our code reads `process.env.PORT`)
   - `CORS_ORIGIN` = `https://<your-static-web-app>.azurestaticapps.net`
   - `WHATSAPP_NUMBER` = `919816024887`
   - `BUSINESS_PHONE` = `+91 9816024887`
   - `BUSINESS_EMAIL` = `hello@gemandjewellery.in`
   - (optional) `METALS_API_KEY`, `METALS_API_URL` for live metal rates
4. **Startup Command** (Configuration → General settings): `node dist/index.js`
5. Visit `https://gaj-api.azurewebsites.net/api/health` — you should see `{ ok: true }`.

---

## 2 · Deploy the frontend (Static Web App)

1. **Portal → Create → Static Web App**
   - Plan: **Free**
   - Source: **GitHub** → same repo
   - App location: `frontend`
   - Output location: `dist`
   - Api location: *(leave blank — we're using App Service instead)*
2. Azure writes a workflow at `.github/workflows/azure-static-web-apps-*.yml`. No edits needed.
3. Add `frontend/staticwebapp.config.json` (see below) so `/api/*` is rewritten to your App Service.
4. Push to `main`. Wait for the workflow. Your site will be live at `https://<name>.azurestaticapps.net`.

### `frontend/staticwebapp.config.json`

Create this file once:

```json
{
  "routes": [
    {
      "route": "/api/*",
      "rewrite": "https://gaj-api.azurewebsites.net/api/*"
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/assets/*", "/*.{png,jpg,svg,ico,webp}"]
  }
}
```

(Replace `gaj-api` with whatever you named your App Service.)

---

## 3 · Wire them together

- In the **Static Web App**, set `VITE_API_URL` build variable to `/api` (the default) — the rewrite above takes care of cross-origin.
- In the **App Service**, make sure `CORS_ORIGIN` includes your Static Web App URL. Multiple origins are allowed — comma separate them.
- Redeploy either side if you change env vars.

---

## 4 · Custom domain (optional)

1. In the Static Web App, **Custom domains → Add** → follow the DNS instructions.
2. Once the domain is validated, update `CORS_ORIGIN` on the App Service to include `https://gemandjewellery.in` (and `www.`).

---

## 5 · Smoke test the live site

- Home page loads without console errors
- Ticker shows live rates
- `GET /api/products` (via the rewrite) returns the 8 products
- Adding to bag persists across reloads (session id in localStorage)
- Custom design wizard submits and returns a WhatsApp URL
- WhatsApp FAB opens `wa.me/919816024887`

---

## 6 · Rollback

Both services support "Deployment slots" (App Service) and "Environments" (Static Web Apps) — use them for staging. If a deploy goes bad, re-run the previous successful GitHub Action, or use the Azure CLI:

```bash
az webapp deployment list-publishing-profiles -g <rg> -n gaj-api
az webapp deployment source config-zip -g <rg> -n gaj-api --src <last-good.zip>
```

---

That's it. Two resources, one workflow each, about ₹1.5k/month on B1 + free Static Web App.
