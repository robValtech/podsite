# Data Model: Modern Podcast Website

## Podcast Show

**Purpose**: Represents site-wide podcast identity and the featured episode presented on the landing page.

| Field                 | Type   | Required | Rules                                             |
| --------------------- | ------ | -------- | ------------------------------------------------- |
| `title`               | string | Yes      | Non-empty; used in page headings and metadata     |
| `tagline`             | string | Yes      | Short descriptive phrase for hero and SEO support |
| `description`         | string | Yes      | Plain-language overview of the show               |
| `featuredEpisodeSlug` | string | Yes      | Must match exactly one `Episode.slug`             |
| `hostName`            | string | No       | Optional author/host context for About page       |
| `coverImage`          | string | No       | Must resolve to a local static asset if present   |

**Relationships**:

- References one featured `Episode`
- Supplies identity content to Home, About, and metadata generation

## Episode

**Purpose**: Represents one mocked podcast episode with list and detail-page content.

| Field           | Type             | Required | Rules                                                                 |
| --------------- | ---------------- | -------- | --------------------------------------------------------------------- |
| `slug`          | string           | Yes      | Unique across all episodes; used for static route generation          |
| `title`         | string           | Yes      | Non-empty and human-readable                                          |
| `summary`       | string           | Yes      | Required for cards and detail page intro                              |
| `episodeNumber` | number           | Yes      | Unique positive integer within the mocked catalog                     |
| `publishDate`   | string           | Yes      | Valid display-ready date value                                        |
| `duration`      | string           | Yes      | Human-readable listening length                                       |
| `artwork`       | string           | No       | Falls back gracefully when omitted                                    |
| `body`          | rich text/string | Yes      | Detail-page content for the episode                                   |
| `isFeatured`    | boolean          | Yes      | Exactly one episode should be featured indirectly through site config |

**Validation Rules**:

- Exactly 20 episodes must exist in the initial dataset
- Every episode must have a unique slug
- Every slug must map to one generated `/episodes/[slug]` page
- Missing optional artwork must not block rendering

## FAQ Entry

**Purpose**: Represents one question-and-answer item on the FAQ page.

| Field      | Type   | Required | Rules                                       |
| ---------- | ------ | -------- | ------------------------------------------- |
| `id`       | string | Yes      | Unique stable identifier                    |
| `question` | string | Yes      | Non-empty and understandable out of context |
| `answer`   | string | Yes      | Non-empty and readable in plain language    |

## Static Page Content

**Purpose**: Represents authored page content for informational routes such as About and FAQ intro copy.

| Field   | Type             | Required | Rules                                          |
| ------- | ---------------- | -------- | ---------------------------------------------- |
| `slug`  | string           | Yes      | One of `about` or `faq` for v1                 |
| `title` | string           | Yes      | Used as page heading and metadata title basis  |
| `intro` | string           | Yes      | Short overview placed near the top of the page |
| `body`  | rich text/string | Yes      | Main informational content                     |

## State Notes

- All content is static for v1 and considered published at build time.
- Invalid or missing episode slugs transition to the not-found experience rather than a partially rendered page.
- Featured episode selection is controlled through `Podcast Show.featuredEpisodeSlug`, not through runtime user preference.
