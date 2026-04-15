# Content Schema Contract: Modern Podcast Website

## Episode Collection

Each episode entry must provide:

| Field           | Type             | Required | Notes                                         |
| --------------- | ---------------- | -------- | --------------------------------------------- |
| `slug`          | string           | Yes      | Route-safe unique identifier                  |
| `title`         | string           | Yes      | Used in cards, detail pages, and metadata     |
| `summary`       | string           | Yes      | Required excerpt for list and detail contexts |
| `episodeNumber` | number           | Yes      | Stable display ordering field                 |
| `publishDate`   | string           | Yes      | Human-readable publication label              |
| `duration`      | string           | Yes      | Human-readable length                         |
| `artwork`       | string           | No       | Local asset reference when present            |
| `body`          | rich text/string | Yes      | Full episode content                          |

Collection invariants:

- Exactly 20 episode entries for v1
- Unique `slug` values
- Unique `episodeNumber` values
- At least one episode referenced as the featured episode in site metadata

## Podcast Show Metadata

Required fields:

| Field                 | Type   | Required | Notes                      |
| --------------------- | ------ | -------- | -------------------------- |
| `title`               | string | Yes      | Site-wide podcast title    |
| `tagline`             | string | Yes      | Hero copy support          |
| `description`         | string | Yes      | Show overview              |
| `featuredEpisodeSlug` | string | Yes      | Must match an episode slug |

## FAQ Collection

Each FAQ entry must provide:

| Field      | Type   | Required | Notes                     |
| ---------- | ------ | -------- | ------------------------- |
| `id`       | string | Yes      | Stable unique identifier  |
| `question` | string | Yes      | Displayed as the prompt   |
| `answer`   | string | Yes      | Displayed as the response |

## Informational Page Content

About and FAQ intro content must provide:

| Field   | Type             | Required | Notes            |
| ------- | ---------------- | -------- | ---------------- |
| `slug`  | string           | Yes      | `about` or `faq` |
| `title` | string           | Yes      | Page heading     |
| `intro` | string           | Yes      | Page summary     |
| `body`  | rich text/string | Yes      | Main content     |
