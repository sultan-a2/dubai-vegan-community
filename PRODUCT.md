# Dubai Vegan Community

This project is a welcoming guide and editorial community hub for vegans and people curious about vegan life. Dubai is the starting point; content may cover other UAE emirates.

## Current design direction

Sultan selected reference images #3 and #5 from the 24 September 2026 conversation as the main direction: homely warmth, tidy editorial composition, generous spacing, restrained serif type and grounded photography. Reference #4 informs the brown, ruled event calendar. Reference #1 informs spacing and #6 informs occasional friendly green. Keep the supplied bright green circular logo.

Use warm cream, deep green, earthy brown, photography and a clear serif/sans pairing. The page should feel like a guide made by a real community. Current user instructions take priority over previous Paper concepts and site editions. Do not use Sultan's Notion Design Brain for this project; he explicitly requested that.

The September 2026 follow-up references favor Playfair Display for editorial headings and Switzer for body and navigation, with rounded gold and dark outlined buttons like the Mont Rural reference. Both fonts are self-hosted under `public/fonts/`.

## Content and navigation

Visitors should be able to find restaurants, events, vegan products, recipes, practical lifestyle guides, community stories and information for businesses. After the hero, the homepage uses a warm photo-led section with four direct routes—Places, Recipes, Products and Events—and a separate search panel. It then presents short previews of places, recipes and products, compact events, a photo-led guide route, the impact feature and a community invitation. Places, products, recipes, offers and the guide each have a dedicated page so collections can grow without crowding the homepage. Guide articles cover getting started, eating out, shopping and nutrition without long advice lists. Nutrition advice links to the NHS vegan diet guide.

Businesses and individuals should eventually be able to submit details; recipes, stories, reviews and photos require approval before publication. The homepage currently presents the intended flows, but no public submission backend or moderation dashboard is connected.

The current restaurant and product entries are starter content for visual design. The team will later approve, replace or add entries. Upcoming events must be reconfirmed and expired events removed. Do not publish fictional personal stories as real testimonials. The homepage product preview and directory now use retailer packshots for the listed products; other food photography is editorial mood imagery.

Restaurants have independent dining type, food mood and cuisine filters on `/places.html`, and the six starter listings now use venue or food photography from the venues' official sites. See `public/credits/place-images.md`; confirm reuse rights or replace the images before launch. The product collection at `/products.html` has search and category filters. Retailer packshots are used for the six starter products in this local design preview; confirm image rights or replace them with licensed assets before launch. The homepage search finds starter places, products and sample offers. The dedicated `/offers.html` page demonstrates how codes can be revealed, but all current codes are marked inactive examples. Replace them with partner-approved terms, dates and real codes before launch.

Recipes live in one structured data file and have a dedicated `/recipes.html` gallery with search, category filters, pagination and individual detail views. The homepage shows only three. This layout can support a much larger collection without lengthening the homepage. Current recipes are editorial starter content and should be kitchen-tested before publication.

The events preview includes a broad community market and a trade expo alongside a dedicated vegan market. Their descriptions identify those differences. The dedicated Events page shows a visual full calendar and photo-led event details. Only confirmed dates appear in the calendar. The Not Just For Vegans organiser listing currently conflicts with itself on the date, so the displayed 11 October date is explicitly marked tentative and excluded from the confirmed calendar until the organiser clarifies it. The workshop and Ziina checkout are an unconnected concept; the checkout explicitly says that no place is reserved or payment taken. Do not present the workshop as a confirmed event until it exists.

## Impact explainer

The homepage counter uses FAO-derived 2024 data published by Our World in Data: about 87.9 billion land animals slaughtered for meat worldwide that year. It projects that annual average across each UTC day, so the changing figure is a model, not a live count. It excludes fish and other uncounted deaths. Source: https://ourworldindata.org/grapher/land-animals-slaughtered-for-meat.

The two-choice quiz combines ACE's rough global 105 vertebrates per plant-based person-year with a UK high-meat versus vegan diet comparison from Scarborough et al., Nature Food (2023): https://www.nature.com/articles/s43016-023-00795-w. The comparison is about 2.8 tonnes CO₂e and 175,000 litres of water per year. The part-time and multi-year multipliers are a deliberately simple linear model. These numbers are not a personalized UAE impact assessment or a count of specific animals saved. Keep a concise, visible source note adjacent to the quiz and the modelled-estimate label on results.

Scroll motion, handwriting, custom cursor and text reveal are editorial accents that must respect reduced-motion preferences. Caveat is used for the handwritten line because the prior signature font clipped on smaller screens. The story carousel component remains in the codebase, but the placeholder carousel was removed from the homepage until real community stories are ready. The plant loader waits for first-screen images and fonts (up to a short timeout) before fading away on all current pages. Direct homepage hash links scroll after React mounts their target.

## Build

React/Vite with TypeScript components for the impact explainer. The main experience is at `/`, with an illustrated story page at `/about.html`, a recipe book at `/recipes.html`, a practical guide at `/guide.html`, an Events page at `/events.html`, and directories at `/places.html`, `/products.html`, and `/offers.html`. The older edition at `/edition.html` is retained as an archival direction, not the current design source. The main page provides responsive navigation, homepage search, compact event rows and collection previews. The guide page offers the PDF download. Submission forms, live partner offers and payment remain unconnected preview features. Test mobile and desktop before publishing.
