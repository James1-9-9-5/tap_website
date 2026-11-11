# tap_website

Website for Tapestry Research Group, served at https://tapestry.jamesspooner.org with GitHub Pages.

The site is built with Jekyll, which GitHub Pages runs automatically on every push. There is nothing to install.

## Where things live

| To change | Edit |
|---|---|
| Email, phone, tagline, tabs along the top | `_config.yml` |
| The four program areas (What We Do) | `_data/programs.yml` (updates Home and Services) |
| The list of services | `_data/services.yml` (updates Home, Services, and the contact form) |
| Header and footer | `_includes/header.html`, `_includes/footer.html` |
| Page text | `index.html`, `about.html`, `services.html`, `contact.html` |
| Colours, spacing, layout | `css/style.css` |
| Icons | `_includes/icons/*.svg` (stroke icons that take their colour from the page) |
| Banner photos | `images/photos/` (stills from the BC footage) |

Each page starts with a short block between `---` lines (front matter) that sets its title, description, banner photo, and intro.

`data-sovereignty.html` now redirects to the Data Sovereignty section on About Us, so old links still work.

## Preview locally

GitHub builds the site for you. To preview before pushing you need Ruby and Jekyll: `gem install jekyll`, then `jekyll serve` and open http://localhost:4000.
