# HarshGuruJi Application & Software Store

Official repository for **HarshGuruJi Store** ([store.webguruji.online](https://store.webguruji.online/)).

## Features
- **Real-Time Database Driven**: Powered 100% by Supabase (store_apps table).
- **Auto-Update Engine**: Connected to dminapkupload.html via Supabase Realtime subscriptions. When an APK is uploaded or updated from the admin panel, the store catalog and app detail pages instantly update without manual reloads.
- **AN1-Inspired Store UI**: Rich category clusters, carousel showcases, mod specifications, checksum verification, and fast direct downloads.
- **Responsive Architecture**: Optimized for desktop, tablet, and mobile devices.

## Key Files
- index.html: Main store catalog landing page.
- store.html: Mirror store catalog route.
- store-detail.html: Deep-dive application details, specs, changelog, screenshots, and direct download links.
- dminapkupload.html: Master APK and software publishing console.
- js/store.js: Store catalog rendering and Supabase realtime feed.
- js/admin-upload.js: APK uploader and Supabase storage/database handler.
- supabase_store_setup.sql: Complete PostgreSQL schema with RLS security policies.

## Custom Domain
Mapped to store.webguruji.online via CNAME.

