---
{
  "title": "Progression between runs",
  "shortDescription": "Persistent upgrades, purchase feedback, and iteration in Snowballing.",
  "parentProject": "snowballing",
  "discipline": "progression",
  "depth": "case-study",
  "published": true,
  "reviewStatus": "approved",
  "sortOrder": 1,
  "featured": true,
  "roles": [
    "Game Designer",
    "Gameplay Programmer"
  ],
  "attribution": "I designed and implemented Snowballing’s core progression systems. The public development logs also credit my health-regeneration and UI work.",
  "claims": [
    {
      "id": "personal-contribution",
      "text": "Core progression design and implementation; confirmed by the author and reviewed against the supplied local project.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    },
    {
      "id": "release-history",
      "text": "The release notes document progression, saving, and health-regeneration work.",
      "sourceType": "public",
      "sourceUrl": "https://fuenteki.itch.io/snowballing/devlog/811210/snowballing-v030-alpha",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "problem": "A survivor-like run is temporary. Between-run upgrades give the player a way to carry earned progress into subsequent attempts.",
  "intent": "Provide persistent upgrade purchases between runs. This describes the implemented behaviour, rather than a measured retention or difficulty outcome.",
  "constraints": [
    "Godot resource-based implementation.",
    "A prototype with public release notes; no player-outcome dataset is presented."
  ],
  "designSummary": "The inspected implementation separates upgrade definitions from saved progression. An upgrade resource supplies its identifier, limit, cost, title, and description. Saved data tracks currency and quantities by upgrade ID. The purchase interface reflects affordability and maximum level.",
  "implementationSummary": "I implemented the progression and purchase interface. The inspected code loads saved progression, increments purchased upgrade quantities, deducts currency, writes the updated state, and refreshes the visible upgrade cards. This account describes the supplied implementation; it is not a claim that every public build is identical.",
  "iterations": [
    "The v0.2.0 notes record work on meta-progression and its save/load system.",
    "The v0.3.0 change list credits @zheyron with health regeneration, a regeneration flash component, and UI and balance adjustments."
  ],
  "outcomes": [
    "A public prototype and dated development logs provide evidence of progression work across releases.",
    "No quantitative claims about player retention, balance improvements, or playtest success are made."
  ],
  "learnings": [
    "Separating upgrade data, persisted state, and purchase feedback makes the system easier to describe and inspect. This is a retrospective observation about the implementation, not a reconstructed historical decision."
  ],
  "evidence": [
    {
      "id": "prototype",
      "title": "Play Snowballing",
      "description": "Public prototype; the game page describes upgrades between runs.",
      "publicUrl": "https://fuenteki.itch.io/snowballing",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "v02",
      "title": "Progression in v0.2.0",
      "description": "Release notes document progression and save/load changes.",
      "publicUrl": "https://fuenteki.itch.io/snowballing/devlog/744129/snowballing-v020-alpha",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "v03",
      "title": "Health regeneration in v0.3.0",
      "description": "The contributor list identifies @zheyron’s regeneration and UI work.",
      "publicUrl": "https://fuenteki.itch.io/snowballing/devlog/811210/snowballing-v030-alpha",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "credits": []
}
---

This study combines inspection of the supplied project with public development notes. It focuses on my progression-system work and the behaviour supported by those sources.
