# Ferrari catalog from Japan — demo

A website of a car exporter from Japan and a catalog of the Ferraris that are on sale
in the Japanese market right now. This is a demo: the company Hayate Motors is fictional and its details are made up.

Open: https://kara-murzin.github.io/ferrari-catalog-demo/

## What is inside

- **Landing page** in English and Japanese (`site/`, `site/ja/`): services, work steps, a request form
  that opens WhatsApp with a ready message.
- **Catalog** (`site/catalog/`): about a thousand cars, search, filters by model, year, price, mileage,
  body type and transmission, sorting, a car card, prices in dollars at the current yen rate.
- **Listing scrapers** (`scraper/`): Python with no dependencies. They collect listings, translate
  the fields from Japanese and write `site/catalog/data.js`.
- **Legal pages** (`site/legal/`) as required by Japanese law;
  all company details come from one file, `site/assets/company.js`.

The site is static, with no build step and no server.

## Running

```bash
python3 -m http.server 8000 --directory site
```

Then open http://localhost:8000.

## What is simplified in the demo

- Only Ferraris are left in the catalog; the data is a snapshot for one date, the daily update is turned off.
- Car photos are loaded from the listing source site and may disappear over time.
- Admin mode (links to the original listings behind a password) does not work in the demo.
- Photos on the landing page are from Unsplash.
