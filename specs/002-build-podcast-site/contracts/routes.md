# Route Contract: Modern Podcast Website

## Public Routes

| Route                 | Type                | Static Data Source                       | Required Outcome                                                                             |
| --------------------- | ------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| `/`                   | Landing page        | Podcast show metadata + featured episode | Show brand identity, highlight one featured episode, expose navigation to all primary routes |
| `/episodes`           | Episode index       | Full episode catalog                     | List all 20 mocked episodes with distinguishable summaries and links to detail pages         |
| `/episodes/[slug]`    | Episode detail      | Single episode by slug                   | Render title, summary, and episode details for every valid slug                              |
| `/about`              | Static content page | About page content + show metadata       | Explain the podcast's purpose and context                                                    |
| `/faq`                | Static content page | FAQ intro + FAQ entries                  | Present common listener questions and answers accessibly                                     |
| `/404` or `not-found` | Fallback route      | Static fallback copy                     | Guide users back to valid content when a slug is invalid                                     |

## Generation Rules

- The build must generate static output for all primary routes and all 20 episode detail pages.
- Every episode slug in content must correspond to one generated route.
- Invalid episode slugs must resolve to the not-found experience rather than a broken page shell.

## Accessibility Contract

- Every route must contain a single clear page heading.
- Primary navigation must be keyboard reachable on every public page.
- Interactive controls must expose accessible names.
- FAQ interactions, if collapsible, must preserve keyboard and screen-reader compatibility.

## Responsive Contract

- Home, Episodes, About, FAQ, and episode detail routes must remain usable at 360px width without horizontal scrolling.
- Long titles and summaries must wrap without obscuring navigation or calls to action.

## Link Integrity Contract

- Featured episode CTA on `/` must resolve to an existing episode detail route.
- Episode cards on `/episodes` must resolve to existing detail routes.
- Global navigation must provide working links to Home, Episodes, About, and FAQ.
