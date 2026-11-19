# VENDORA v1.2.0

Multi-vendor marketplace PWA. Static front end (no build step) + Supabase backend.

## Structure
```
index.html            page shell, loads the scripts below
manifest.webmanifest  PWA manifest (icons, shortcuts, theme)
sw.js                 service worker: app-shell cache, update prompt, notification clicks
css/app.css           design system (tokens, components, responsive layout, day/night)
js/core.js            config, icons, utilities, theme, session, business-type config, dashboard shell
js/public.js          marketplace, storefront, product page, checkout, payment, tracking
js/auth.js            login, sign-up, vendor onboarding, customer account
js/vendor.js          vendor dashboard (overview, orders, catalogue, media, store, delivery, payments, reviews, subscription)
js/admin.js           super admin (overview, vendors, subscriptions, invitations, moderation, settings)
js/play.js            VENDORA Play games
js/notify.js          QR codes, notifications, badge counts, PWA install/update
js/boot.js            router and start-up
```

## Deploy
Upload the whole folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages) over HTTPS.
Then in Supabase: Authentication > URL Configuration > set the Site URL to your address.

## Releasing an upgrade
1. Change the version in `js/core.js` (`APP_VERSION`), the `?v=` query on the script/link tags in `index.html`,
   and the cache name and file list in `sw.js`.
2. Upload. Installed apps show an "Update now" banner; users get the new version on tap.
3. Database changes go through Supabase migrations (never edit tables by hand in production).

## Subscriptions
Trial (7 days), 1 month, 6 months, 1 year, and more than a year (13-120 months). Billing is manual:
vendors pay the owner directly; the owner records it under Admin > Subscriptions. Expired stores are hidden
from customers and cannot take orders (enforced by the database). Reminders go out 3 days before and on expiry.
