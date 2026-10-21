---
{
  "parentProject": "snowballing",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "roles": [
    "Game Designer",
    "Gameplay Programmer"
  ],
  "claims": [
    {
      "id": "authorship",
      "text": "I designed and implemented the system described here. Authorship is confirmed by my account; behaviour was checked against the local project and the captures.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "accent": "ice",
  "title": "Choosing the next upgrade",
  "shortDescription": "Weighted choices, prerequisite unlocks, and limits shape each run’s upgrade pool.",
  "discipline": "systems",
  "sortOrder": 2,
  "featured": true,
  "attribution": "I built the experience-to-upgrade flow, the upgrade pool, and the selection interface.",
  "cover": {
    "src": "/media/snowballing/level-up.webp",
    "width": 640,
    "height": 360,
    "alt": "Three in-run upgrade cards: Ice Daggers, Sword Damage, and Sword Quickness.",
    "caption": "The real upgrade screen, triggered in a controlled local capture. The player chooses one of three options.",
    "credit": "Snowballing project material",
    "permission": "approved",
    "pixelArt": true
  },
  "gallery": [
    {
      "src": "/media/snowballing/level-up.webp",
      "width": 640,
      "height": 360,
      "alt": "Three in-run upgrade cards: Ice Daggers, Sword Damage, and Sword Quickness.",
      "caption": "The real upgrade screen, triggered in a controlled local capture. The player chooses one of three options.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    }
  ],
  "problem": "A level-up needs to offer useful choices for the current run. Already-maxed upgrades and enhancements for abilities the player has not unlocked should not keep occupying the selection.",
  "intent": "Offer a small set of distinct options, evolve the pool as abilities unlock, and remove upgrades when their limit is reached.",
  "designSummary": "The experience manager emits a level-up event. The upgrade manager draws up to three options, passing already-selected entries as exclusions. Choosing a card updates the run’s upgrade dictionary, expands the pool where an unlock has dependent upgrades, and broadcasts the selection to gameplay listeners.",
  "flow": [
    {
      "label": "Level up",
      "detail": "The experience threshold triggers an upgrade selection."
    },
    {
      "label": "Offer",
      "detail": "Draw up to three distinct entries from the available pool."
    },
    {
      "label": "Apply",
      "detail": "Record the selection and notify gameplay listeners."
    },
    {
      "label": "Evolve",
      "detail": "Add dependent enhancements and remove maxed entries."
    }
  ],
  "implementationSummary": "AbilityUpgrade resources hold IDs, limits, labels, and descriptions. The manager separates pool management from the UI. The selection screen pauses gameplay; card animations provide hover, selection, and discard feedback before play resumes.",
  "iterations": [
    "The supplied implementation includes unlock-dependent additions and maximum-quantity removal in the upgrade manager.",
    "A controlled local invocation of the level-up handler produced the three-option screen shown here."
  ],
  "outcomes": [
    "The captured screen offers three different upgrade cards, using the real resources and UI scenes.",
    "This study documents pool rules and one exercised selection state. It does not claim statistical validation of the random distribution."
  ],
  "evidence": [
    {
      "id": "choice-screen",
      "title": "Three-option selection",
      "description": "Captured from the local upgrade manager and screen. The level-up event was triggered for this capture.",
      "image": {
        "src": "/media/snowballing/level-up.webp",
        "width": 640,
        "height": 360,
        "alt": "Three in-run upgrade cards: Ice Daggers, Sword Damage, and Sword Quickness.",
        "caption": "The real upgrade screen, triggered in a controlled local capture. The player chooses one of three options.",
        "credit": "Snowballing project material",
        "permission": "approved",
        "pixelArt": true
      },
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "breakdowns": [
    {
      "title": "From experience to a choice",
      "summary": "Offer a small set of distinct options, evolve the pool as abilities unlock, and remove upgrades when their limit is reached.",
      "details": "AbilityUpgrade resources hold IDs, limits, labels, and descriptions. The manager separates pool management from the UI. The selection screen pauses gameplay; card animations provide hover, selection, and discard feedback before play resumes.",
      "evidenceIds": [
        "choice-screen"
      ]
    }
  ]
}
---

The interesting part of a level-up is the choice it creates. This system connects experience, available upgrades, and a pause in the action without putting every responsibility in the same scene.
