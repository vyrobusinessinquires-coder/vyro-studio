VYRO STUDIO — REFERENCE-LED WEBSITE V2

FILES
- index.html / styles.css / script.js — homepage and interactions
- offgrid.html / offgrid.css — fictional OFFGRID concept case study
- privacy.html / cookies.html / terms.html — initial legal notices requiring adult/legal review
- 404.html — GitHub Pages not-found page
- favicon.svg / robots.txt / sitemap.xml — site metadata

PUBLISH
1. Extract this ZIP.
2. In the existing public GitHub repository vyro-studio, upload and replace the files at the repository root.
3. Keep the existing assets folder. This version does not require it for page rendering.
4. Commit changes and wait for GitHub Pages to publish.
5. Test the live URL and all legal links on desktop and mobile.

IMPORTANT LIMITATIONS / SECURITY
- This is a static GitHub Pages site. It has no backend, database, authentication, checkout, or client-submission form.
- No .env file, API key, database credential or secret token is required. Do not add secrets to this public repository or client-side JavaScript.
- There is no server-side input handler to sanitize or rate-limit because no form endpoint exists. If a form/backend is added later, use a server-side handler, validation, abuse protection/rate limiting, CSRF protections where relevant, and least-privilege database policies (including Supabase/Firebase RLS if used).
- GitHub Pages does not provide configurable custom response security headers for this repository. Do not claim CSP, HSTS, X-Frame-Options or other headers are enforced unless a hosting layer that supports them is configured and verified.
- The cookie notice only remembers dismissal using localStorage. No analytics/ad tracking is installed by this code.
- The legal pages are starter notices, not legal advice or a guarantee of compliance. Have a parent/legal guardian and qualified Philippine legal/privacy professional review the operator identity, lawful basis, retention, rights process, terms, IP, refund/cancellation, payment and consumer-law obligations before accepting client work or payments.
- A separate signed project agreement should define scope, fees, schedule, revisions, cancellation/refund terms, deliverable ownership/licensing, approvals and dispute process.
- Payment provider accounts and any binding business/financial arrangements must be managed with the responsible adult/legal guardian.

TEST CHECKLIST
[ ] Desktop 1440px and 1920px
[ ] Tablet 768px and 820px
[ ] Mobile 360px, 390px and 430px
[ ] Keyboard navigation and visible focus
[ ] Reduced-motion preference
[ ] Cookie notice dismisses and remains dismissed
[ ] Privacy / Cookies / Terms / 404 pages open
[ ] Facebook CTA opens in a new tab
[ ] GitHub Pages 404 behavior works
[ ] Confirm og:image asset exists before social previews; og-cover.jpg is included for social previews.
