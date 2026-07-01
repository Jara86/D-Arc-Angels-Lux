# D'Arc Angels Lëtzebuerg - AI Coding Agent Instructions

## Project Overview
Static HTML/CSS/JavaScript website for a Luxembourg-based horseback archery club. Multi-language support (German/Luxembourgish), responsive design, form handling for merchandise orders and tournament registration.

## Architecture & Key Patterns

### Shared Navigation System
- **Pattern**: Dynamic navigation loading via `fetch()` in `nav-loader.js`
- **Implementation**: Each page has `<div id="nav-placeholder"></div>` that loads `nav.html` at runtime
- **Why**: Single source of truth for navigation - update `nav.html` once, all pages reflect changes
- **Location**: `js/nav-loader.js` provides `initializeNavigation()` for mobile menu & dropdown handling
- **Important**: All pages must include `nav-loader.js` AFTER the placeholder in their `<script>` tags

### Form Handling: Two Distinct Approaches
1. **FormSubmit.co Integration** (Contact & Merchandise)
   - Direct form `action="https://formsubmit.co/[email]"` with `method="POST"`
   - See: `merchandise.html` line 209, `contact.html` form
   - Configuration: Hidden `_subject` and `_autoresponse` fields control email behavior

2. **Client-Side Processing** (Tournament Registration)
   - Form `id="tournament-registration"` without action attribute
   - JavaScript validates and stores locally, no direct email submission
   - See: `tournaments.html` line 128, `js/tournaments.js`

### Form Persistence Pattern
- **File**: `js/form-persistence.js`
- **Use case**: Save form data before navigation (e.g., before viewing rules)
- **Pattern**: Stores to `localStorage` with `formPage` tracking for restoration
- **Key function**: `saveFormData()` handles checkboxes with `[]` naming convention
- **When to apply**: Any form with multi-step flows or external link redirects

### CSS Organization
- **Global utilities**: `css/styles.css` (CSS variables, typography, containers)
- **Page-specific**: `css/[page].css` for page-unique styling
- **Shared components**: `css/nav.css`, `css/footer.css`, `css/hero.css`, `css/section.css`
- **Design tokens**: `:root` variables define `--primary-gradient`, `--background-gradient`, `--box-shadow`
- **Font families**: Playfair Display, Marcellus, Poppins loaded via Google Fonts

### Merchandise Order System
- **Order management**: `js/merchandise.js` maintains `orderItems[]` array
- **Order numbers**: Auto-incremented from `localStorage['lastOrderNumber']` (format: `ORDER-###`)
- **Email formatting**: `formatOrderForEmail()` converts order items to readable text
- **Size handling**: Products may have sizes - check `merchandise.html` product dropdowns
- **Local removal**: `window.removeItem(index)` allows removing items before submission

### Image Asset Format
- **Primary format**: `.avif` (modern compression)
- **Fallback**: `.jpg` for tournament images
- **CDN sources**: `waldrandranch.de` for external tournament images
- **Responsive images**: Use `width="X" height="Y"` to prevent layout shift

### Multilingual Context
- **Default language**: German with some Luxembourgish phrases
- **Character handling**: Special characters (Ü, Ö, ä, etc.) used throughout - ensure UTF-8 encoding
- **Example**: "Öffene Registrierung" in tournaments, mixed German/Luxembourgish autoresponses

## Common Development Tasks

### Adding a New Page
1. Create `newpage.html` with structure: nav placeholder → hero → content
2. Create `css/newpage.css` with page-specific styles
3. Include scripts: nav-loader.js at end of body
4. Add navigation link to `nav.html` and both dropdown sections if applicable
5. Use existing font stack: Marcellus (headings), Poppins (body), Playfair Display (accents)

### Fixing Forms
- **Check**: Form `name` attribute matches FormSubmit configuration
- **Check**: All required inputs have `required` attribute and `name` attributes
- **Check**: Submit button has `type="submit"` and correct form `action` if FormSubmit
- **Debug**: Open browser console - `merchandise.js` has debug logging for submission issues

### Updating Navigation
- Edit `nav.html` directly - affects all pages immediately
- Responsive behavior: mobile menu at ≤1140px width (see `nav-loader.js` line 45)
- Dropdown structure: `<li class="dropdown">` with nested `<ul class="dropdown-content">`

### Modifying Merchandise Products
- Products defined in dropdown in `merchandise.html` line ~200
- Each item needs: `value="[product-id]"` and display text
- Update `merchandiseItems` array in `js/merchandise.js` if adding size variants
- Order email formatting happens in `formatOrderForEmail()` function

## Testing Checklist
- [ ] Navigation loads on all pages (check browser console for fetch errors)
- [ ] Forms submit successfully to correct email
- [ ] Images load without 404 errors (use `.avif` or `.jpg`)
- [ ] Mobile menu works at <1140px (toggle closes when clicking links)
- [ ] Form inputs persist when navigating away (if using form-persistence.js)
- [ ] All special characters display correctly (especially German umlauts)

## Key Dependencies
- Bootstrap 5.0.0 (grid/forms)
- Font Awesome 5.15.3 (icons)
- Swiper 11.2.4 (galleries - see `package.json`)
- Google Fonts: Arima, Marcellus, Playfair Display, Poppins
