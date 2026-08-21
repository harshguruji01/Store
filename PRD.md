# Product Requirements Document (PRD)
## Single-File Full-Stack Web Application (XAMPP → cPanel, Zero Code-Change Deployment)

**Version:** 1.0
**Status:** Draft
**Owner:** [HarshGuruJi]
**Date:** August 21, 2026
**Store Name** GuruStore

---

## 1. Summary

This PRD defines a full-stack web application in which each page is implemented as a single self-contained file combining both frontend markup/styling/scripting and backend (server-side) logic. The system is built for frictionless portability: it must run identically in local development (via XAMPP on `localhost`) and in production (via cPanel shared hosting), with the only difference between environments being the values inside one central configuration file. Reusable UI elements are abstracted into templates/presets to eliminate duplication across pages.

---

## 2. Goals

- **G1 — Simplicity:** Keep the codebase easy to read, navigate, and maintain by co-locating frontend and backend logic per page (one file = one page = one unit of ownership).
- **G2 — Environment Portability:** Support local development on XAMPP and production deployment on cPanel with **zero code changes** — only configuration values change.
- **G3 — Centralized Configuration:** Maintain a single source of truth for database credentials, site-wide settings, and global content, so a fresh deployment requires editing exactly one file.
- **G4 — Reusability:** Avoid duplicated markup/styling/logic by extracting recurring elements (headers, footers, nav bars, cards, buttons, layout shells) into shared templates or presets referenced by every page.
- **G5 — Deployability:** Allow the entire project directory to be uploaded as-is to cPanel and become fully functional after a single configuration update.

### Non-Goals
- This PRD does not mandate a specific framework, CMS, or ORM.
- This PRD does not cover CI/CD pipelines, containerization, or non-cPanel hosting targets.
- This PRD does not include full source code — only architecture, workflow, and file structure.

---

## 3. Target Users

- **Primary:** A solo developer or small team building and maintaining a small-to-medium website/application who values low operational overhead over microservice-style separation of concerns.
- **Secondary:** Future maintainers who need to onboard quickly by opening a single page file to understand both its UI and its logic.

---

## 4. System Architecture

### 4.1 Core Principle: Page-as-a-Unit
Each route/page in the application corresponds to exactly one file (e.g., a `.php` file) that contains:
- The backend logic needed to render that page (data fetching, form handling, validation, session/auth checks).
- The frontend markup, inline/linked styles, and client-side scripting needed to display it.

This avoids splitting a single page's concern across many files (controller, view, route file, etc.), reducing navigation overhead for small projects.

### 4.2 Central Configuration Layer
A single configuration file sits at the root of the project and is the **only** file that should differ between environments. It centralizes:
- **Database credentials:** host, database name, username, password.
- **Website settings:** base URL, environment flag (local/production), timezone, feature toggles.
- **Global content:** site name, contact info, social links, and other values reused across multiple pages.

Every page file reads from this configuration rather than hardcoding any environment-specific or repeated values.

### 4.3 Reusable Components Layer
Elements that appear on multiple pages (navigation bar, footer, page shell/layout, common UI sections, shared CSS) are defined **once** as templates/partials/presets and included by each page file. Pages compose themselves from:
1. The shared layout/template.
2. Shared reusable UI sections/presets, as needed.
3. Page-specific content and logic.

### 4.4 Environment Portability Mechanism
Because every page and template pulls its DB connection, base URL, and settings exclusively from the central config file (never hardcoded), the exact same file tree behaves correctly in both environments:
- **Local (XAMPP):** Config points to local MySQL instance and `http://localhost/...` base path.
- **Production (cPanel):** Config points to the cPanel-provisioned MySQL database and the live domain.

No page file, template, or logic file needs to be touched during migration — only the values inside the config file are updated.

---

## 5. Workflow

### 5.1 Local Development Workflow
1. Install and run XAMPP; place the project directory inside `htdocs`.
2. Create a local MySQL database via phpMyAdmin.
3. Populate the central config file with local DB credentials and set the environment flag to "local."
4. Develop and test pages at `http://localhost/<project>/`.
5. Build/update reusable templates and presets as shared elements evolve, so all pages referencing them stay in sync automatically.

### 5.2 Deployment Workflow (cPanel)
1. Create the production MySQL database and user via cPanel's MySQL Database tool; note credentials.
2. Upload the entire project directory to cPanel (via File Manager or FTP) — no file modifications, no code edits.
3. Import/migrate the database schema and data to the new production database.
4. Open the central config file (directly in cPanel's File Manager or via FTP) and update:
   - Database name, username, password, host.
   - Base URL / environment flag.
   - Any environment-specific global settings.
5. Save the config file. The website is now live and fully functional.

### 5.3 Update Workflow (Post-Launch)
- Content or settings changes (e.g., contact info, site name) are made in the central config file only, and propagate to every page automatically.
- New reusable UI needs are added once to the templates/presets layer and become available to all pages.

---

## 6. File Structure

```
project-root/
│
├── config/
│   └── config.php               # Central config: DB credentials, site settings, global content
│
├── includes/                    # Reusable components (templates/presets)
│   ├── header.php                # Shared header/nav
│   ├── footer.php                # Shared footer
│   ├── layout.php                # Shared page shell (wraps header/footer around page content)
│   └── components/               # Common UI sections (cards, buttons, forms, banners, etc.)
│
├── assets/
│   ├── css/                      # Shared stylesheets (reusable style presets)
│   ├── js/                       # Shared client-side scripts
│   └── images/
│
├── pages/                        # One file per page: frontend + backend combined
│   ├── index.php
│   ├── about.php
│   ├── contact.php
│   ├── login.php
│   └── ...
│
├── uploads/                      # User-generated/content files, if applicable
│
└── .htaccess                     # URL routing / rewrite rules (if needed), no environment-specific values
```

**Key rule:** The only file that should ever differ between the local copy and the deployed copy is `config/config.php`. Everything else is byte-for-byte identical across environments.

---

## 7. Functional Requirements

| ID | Requirement |
|----|-------------|
| FR1 | Each page file must contain both the backend logic required to render it and its full frontend markup/styling/scripting. |
| FR2 | All database connections must be established using credentials read from the central config file — never hardcoded in page or template files. |
| FR3 | The central config file must expose site-wide settings and global content values consumable by any page or template. |
| FR4 | Recurring UI elements (nav, footer, layout shell, common sections) must be implemented once as shared templates/presets and included wherever needed. |
| FR5 | The system must run correctly under XAMPP on `localhost` without modification beyond local config values. |
| FR6 | The system must run correctly on cPanel after directory upload and a single config file update, with no code-level changes. |
| FR7 | Adding or editing a reusable component must automatically reflect across all pages that include it. |

---

## 8. Non-Functional Requirements

- **Portability:** No absolute local file-system paths, hardcoded ports, or environment-specific logic anywhere outside the config file.
- **Security:** Config file must be stored outside the publicly accessible web root where possible, or protected via server rules, since it holds sensitive credentials.
- **Maintainability:** Codebase should favor readability and low duplication over architectural purity, in line with the "simple, easy to manage" goal.
- **Compatibility:** Must run on standard shared-hosting PHP/MySQL stacks typical of cPanel environments, matching XAMPP's default PHP/MySQL/Apache versions as closely as possible.
- **Performance:** Shared assets (CSS/JS) should be cacheable and not duplicated per page.

---

## 9. Constraints

- No full source code is to be produced as part of this PRD — only architecture, workflow, and file structure.
- Deployment to cPanel must require **no code edits**, only edits to the central config file.
- Each page must remain a single file combining frontend and backend logic (no separate controller/view split per page).

---

## 10. Assumptions & Risks

**Assumptions**
- Hosting target uses a standard LAMP-compatible stack (PHP + MySQL) available on both XAMPP and cPanel.
- The team accepts co-located frontend/backend code per page as a deliberate simplicity trade-off over stricter separation of concerns.

**Risks**
- Mixing frontend and backend logic in one file can hurt readability as pages grow in complexity; mitigated by pushing shared logic/UI into `includes/` and `assets/`.
- Storing credentials in a single config file increases the impact of that file being exposed; mitigated by restricting public access to the config file/directory.

---

## 11. Success Criteria

- A developer can clone/copy the project, set up XAMPP, edit one config file, and have the site fully working locally within minutes.
- The exact same project directory can be uploaded to cPanel, the config file updated once, and the site is live with no further changes.
- Updating a shared component or global content value updates every page that uses it, with no per-page edits required.










# Product Requirements Document (PRD)
## Full-Stack E-Commerce Store Website (XAMPP → cPanel, Zero Code-Change Deployment)

**Version:** 1.0
**Status:** Draft
**Owner:** [Your Name]
**Date:** August 21, 2026

> **Note:** Is PRD mein same architecture principles use kiye gaye hain jo pehle define kiye the — har page ek single file (frontend + backend combined), central config file, aur reusable components — ab specifically ek **online store / e-commerce website** ke liye apply kiye gaye hain.

---

## 1. Summary

Yeh PRD ek full-stack e-commerce store website define karta hai jahan customers products browse, cart mein add, aur checkout/order kar sakein, aur admin apne products, orders, aur store settings manage kar sake. Codebase simplicity ke liye har page ek hi file mein frontend + backend logic combine karega. System local development ke liye XAMPP par aur production ke liye cPanel par bina kisi code change ke chalega — sirf ek central configuration file update karke.

---

## 2. Goals

- **G1 — Simplicity:** Har page ek single file (frontend + backend) — easy to read aur maintain.
- **G2 — Environment Portability:** XAMPP (local) → cPanel (production) migration bina code change ke, sirf config file update karke.
- **G3 — Centralized Configuration:** DB credentials, store settings, payment/shipping settings, aur global content ek hi config file mein.
- **G4 — Reusability:** Repeated UI (product card, header, footer, cart widget, etc.) sirf ek baar template/preset ke roop mein banaya jaye.
- **G5 — Complete Store Functionality:** Product catalog, cart, checkout, orders, aur basic admin panel end-to-end kaam kare.

### Non-Goals
- Kisi specific payment gateway ka deep integration guide nahi (sirf integration point define hoga).
- Multi-vendor / marketplace features is scope mein nahi (single-store assumption).
- Mobile app is scope se bahar hai — sirf responsive web store.

---

## 3. Target Users

- **Store Owner / Admin:** Products, orders, aur store settings manage karta hai.
- **Customer:** Website browse karta hai, products dekhta hai, cart mein add karta hai, order place karta hai.
- **Developer/Maintainer:** Codebase ko easily samajhta aur update karta hai (ek page = ek file principle ki wajah se).

---

## 4. System Architecture

### 4.1 Page-as-a-Unit Principle
Har route (Home, Product Listing, Product Detail, Cart, Checkout, Order Confirmation, Login/Register, Admin pages) ek hi file mein:
- Backend logic (DB queries, session/cart handling, form validation, order processing).
- Frontend markup, styling, aur client-side scripting.

### 4.2 Central Configuration Layer
Ek single config file (root level) mein:
- **Database credentials:** host, DB name, username, password.
- **Store settings:** store name, currency, tax rate, shipping charges, base URL, environment flag.
- **Payment settings:** gateway keys/mode (test/live) — placeholders, actual keys env ke hisaab se badalte hain.
- **Global content:** logo, contact info, social links, footer text, policy pages content.

Sab pages aur templates yeh values sirf is config file se lete hain — kahin bhi hardcode nahi.

### 4.3 Reusable Components Layer
Ek baar banaye jaate hain, har jagah reuse hote hain:
- Header/Navbar (with cart icon + item count)
- Footer
- Product Card (image, title, price, "Add to Cart" button)
- Category filter/sidebar
- Page layout shell
- Admin sidebar/layout

### 4.4 Portability Mechanism
Chunki DB connection, base URL, currency, aur payment mode sab config file se aate hain, same file-tree local aur production dono jagah correctly chalta hai — sirf config values change hoti hain.

---

## 5. Core Features (Functional Scope)

### 5.1 Customer-Facing
| Feature | Description |
|---|---|
| Home Page | Featured products, banners, categories |
| Product Listing | Category-wise / search-wise product grid, filters (price, category) |
| Product Detail | Images, description, price, stock status, "Add to Cart" |
| Cart | Add/remove/update quantity, subtotal, persists via session |
| Checkout | Shipping address form, order summary, payment method selection |
| Order Confirmation | Order summary, order ID, status |
| User Account | Register/Login/Logout, Order History, Profile edit |
| Search | Product search by name/keyword |
| Static Pages | About, Contact, Privacy Policy, Terms — content pulled from global config |

### 5.2 Admin-Facing
| Feature | Description |
|---|---|
| Admin Login | Separate authenticated area |
| Product Management | Add/Edit/Delete products, manage stock, categories, images |
| Order Management | View orders, update order status (Pending/Shipped/Delivered/Cancelled) |
| Customer Management | View registered customers |
| Store Settings | Edit store name, currency, shipping/tax rules, banners — via config-backed settings page |

---

## 6. Workflow

### 6.1 Local Development Workflow
1. XAMPP install → project `htdocs` mein rakho.
2. phpMyAdmin se local database banao aur schema import karo (products, categories, users, orders, order_items tables).
3. Central config file mein local DB credentials + environment flag = "local" set karo.
4. `http://localhost/<project>/` par develop/test karo.

### 6.2 Deployment Workflow (cPanel)
1. cPanel MySQL Database tool se production DB + user banao.
2. Poora project directory upload karo (File Manager/FTP) — **koi code change nahi**.
3. Database schema/data import karo production DB mein.
4. Config file open karke update karo: DB credentials, base URL, environment flag, payment mode (live), store settings.
5. Save karo — website live ho jayega.

### 6.3 Order Processing Workflow
1. Customer cart → checkout → order details submit.
2. Backend order record create karta hai (status: Pending), stock update hota hai.
3. Admin panel se order status update hoti hai (Pending → Shipped → Delivered).
4. Customer apni "Order History" mein status dekh sakta hai.

---

## 7. File Structure

```
store-root/
│
├── config/
│   └── config.php               # DB credentials, store settings, payment mode, global content
│
├── includes/                    # Reusable components
│   ├── header.php                # Navbar + cart icon
│   ├── footer.php
│   ├── layout.php                # Page shell
│   └── components/
│       ├── product-card.php
│       ├── category-filter.php
│       └── admin-sidebar.php
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│       └── products/             # Uploaded product images
│
├── pages/                        # Customer-facing pages (frontend + backend combined)
│   ├── index.php                 # Home
│   ├── products.php              # Listing
│   ├── product-detail.php
│   ├── cart.php
│   ├── checkout.php
│   ├── order-confirmation.php
│   ├── login.php
│   ├── register.php
│   ├── account.php
│   └── search.php
│
├── admin/                        # Admin-facing pages
│   ├── login.php
│   ├── dashboard.php
│   ├── products.php               # Manage products
│   ├── orders.php                 # Manage orders
│   ├── customers.php
│   └── settings.php
│
├── database/
│   └── schema.sql                 # Table structure (products, categories, users, orders, order_items)
│
└── .htaccess                      # Routing rules (no env-specific values)
```

**Rule:** Sirf `config/config.php` local aur production ke beech alag hoti hai — baaki sab files identical.

---

## 8. Data Model (High Level)

- **products** — id, name, description, price, stock, category_id, image
- **categories** — id, name
- **users** — id, name, email, password_hash, role (customer/admin)
- **orders** — id, user_id, total_amount, status, shipping_address, created_at
- **order_items** — id, order_id, product_id, quantity, price

*(Detailed schema/source code is out of scope for this PRD.)*

---

## 9. Non-Functional Requirements

- **Security:** Passwords hashed; config file web-root ke bahar ya protected; admin area separately authenticated; SQL injection se bachne ke liye prepared statements.
- **Portability:** Koi bhi absolute local path ya hardcoded environment value page/template files mein nahi.
- **Performance:** Product images optimized; shared CSS/JS cacheable.
- **Scalability (basic):** Product catalog reasonably large ho sakta hai (pagination support).
- **Usability:** Mobile-responsive layout customer pages ke liye.

---

## 10. Constraints

- Har page single file (frontend + backend combined) — no separate MVC split per page.
- cPanel deployment mein **zero code edits** — sirf config file update.
- Full source code is scope se bahar — sirf architecture, features, workflow, aur file structure.

---

## 11. Assumptions & Risks

**Assumptions**
- Single store, single currency, standard LAMP stack (PHP + MySQL).
- Payment gateway integration ek pluggable point hoga config ke through, actual gateway SDK setup separately hoga.

**Risks**
- Config file mein sensitive keys (payment, DB) hone se exposure risk — mitigate via restricted file access.
- Ek page mein frontend+backend mix karne se badi pages (jaise checkout) complex ho sakti hain — mitigate karke shared logic ko `includes/` mein rakh ke.

---

## 12. Success Criteria

- Customer end-to-end flow: browse → cart → checkout → order confirmation bina errors ke chale.
- Admin product add karte hi wo turant storefront par show ho.
- Same project directory XAMPP se cPanel par upload karke, sirf config file update karke, store fully functional ho jaye.
- Order status update admin se hone par customer ko apni account page par turant reflect ho.