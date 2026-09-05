# Implementation prompt: Seed Sanity using provided seed files

## Goal

Import the provided `studio/scripts/seed.ndjson` into the `vertex` dataset on project `83t066qq` using the Sanity CLI (`sanity dataset import`), verify the resulting document counts and reference integrity, without modifying `studio/scripts/seed.ndjson` or `studio/scripts/videos.json`.

Target content breakdown in `studio/scripts/seed.ndjson`:
- **6 categories**
- **5 instructors**
- **10 courses** (each with 4 modules)
- **120 lessons** (3 lessons per module across 40 modules)
- **Total: 141 documents** plus asset references

## Skills and docs read

- `AGENTS.md` — §1 (What you are building), §5 (Studio workspace owns content authoring, web is read-only), §8 (Data model shapes and relationships), §12 (Private dataset, keep tokens server-only), §13 (Studio and web checks).
- `sanity-best-practices` — Schema conventions, GROQ query patterns, asset uploads, and standalone Studio patterns.
- `sanity-migration` — `sanity dataset import --replace`, deterministic IDs, asset handling, and document count / reference validation.

## Code inspected

- `studio/scripts/seed.ndjson` — 141 valid JSON-L records with stable `_id`s (`category.*`, `instructor.*`, `course.*`, `lesson.*`), embedded modules, learning outcomes, resources, Portable Text notes, and `_sanityAsset` image sources for auto-upload.
- `studio/scripts/videos.json` — 120 topically mapped YouTube video references with video IDs, titles, channels, and durations.
- `studio/sanity.cli.ts` & `studio/.env` — Configured for project `83t066qq` and dataset `vertex`.
- `.env.local` — Configured with `NEXT_PUBLIC_SANITY_DATASET="vertex"` and `NEXT_PUBLIC_SANITY_PROJECT_ID="83t066qq"`.
- `studio/schemaTypes/` — Course, lesson, instructor, category document schemas and module, learningOutcome, resource, and blockContent object schemas.

## Decisions and assumptions

1. **No file modifications**: Do not modify `studio/scripts/seed.ndjson` or `studio/scripts/videos.json`.
2. **Use Sanity CLI Import**: Execute `sanity dataset import scripts/seed.ndjson vertex --replace` from the `studio` workspace. `--replace` ensures idempotency if records already exist.
3. **Asset Handling**: Sanity CLI will automatically download and upload images specified via `_sanityAsset` (course covers, instructor portraits, lesson thumbnails) to the Sanity asset store.
4. **Verification**: Run GROQ count queries after import to verify exact counts for each document type:
   - Categories: `count(*[_type == "category"]) == 6`
   - Instructors: `count(*[_type == "instructor"]) == 5`
   - Courses: `count(*[_type == "course"]) == 10`
   - Lessons: `count(*[_type == "lesson"]) == 120`
   - Total content documents: `count(*[_type in ["category", "instructor", "course", "lesson"]]) == 141`
5. **Reference Validation**: Execute GROQ checks ensuring course references to categories/instructors and module references to lessons resolve without dangling pointers.

## Files expected to touch

- None (no code or seed file edits required; prompt file `prompts/seed-from-provided-files.md` created for tracking).

## Requirements

1. Import `studio/scripts/seed.ndjson` directly into dataset `vertex` on project `83t066qq` using `sanity dataset import`.
2. Preserve `studio/scripts/seed.ndjson` and `studio/scripts/videos.json` exactly as they are without modifying them.
3. Verify document counts and reference integrity after import.

## Security considerations

- Private datasets and API tokens are not exposed to the browser or committed to repository files.
- Import operates through the authenticated Sanity CLI environment.

## Acceptance criteria

- `sanity dataset import` completes with exit code 0.
- Querying the `vertex` dataset confirms:
  - Exactly 6 categories
  - Exactly 5 instructors
  - Exactly 10 courses
  - Exactly 120 lessons
  - All referenced relations (instructors, categories, lessons) resolve successfully.
- `seed.ndjson` and `videos.json` remain unchanged (`git status` clean for those files).

## Checks to run

1. `sanity dataset import scripts/seed.ndjson vertex --replace` in `studio/`.
2. Verification GROQ queries:
   - `count(*[_type == "category"])`
   - `count(*[_type == "instructor"])`
   - `count(*[_type == "course"])`
   - `count(*[_type == "lesson"])`
   - Course and module reference resolution checks.

## Manual test steps

1. In `studio`: Run `sanity dataset import scripts/seed.ndjson vertex --replace`.
2. In `studio`: Run `sanity documents query '{"categories": count(*[_type == "category"]), "instructors": count(*[_type == "instructor"]), "courses": count(*[_type == "course"]), "lessons": count(*[_type == "lesson"])}' --dataset vertex`.
3. In `web`: Verify Next.js dev server displays seeded courses on catalog (`/courses`) and course detail pages.
