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
  "title": "Progression between runs",
  "shortDescription": "Turning collected currency into persistent upgrades, with clear purchase states.",
  "discipline": "progression",
  "sortOrder": 1,
  "featured": true,
  "attribution": "I designed and implemented the persistent progression, saved upgrade state, and purchase interface.",
  "cover": {
    "src": "/media/snowballing/upgrades-available.webp",
    "width": 640,
    "height": 360,
    "alt": "Two persistent upgrade cards with purchase buttons and a balance of 175.",
    "caption": "Before purchase: a controlled test balance of 175 makes both upgrades available.",
    "credit": "Snowballing project material",
    "permission": "approved",
    "pixelArt": true
  },
  "gallery": [
    {
      "src": "/media/snowballing/upgrades-available.webp",
      "width": 640,
      "height": 360,
      "alt": "Two persistent upgrade cards with purchase buttons and a balance of 175.",
      "caption": "Before purchase: a controlled test balance of 175 makes both upgrades available.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    },
    {
      "src": "/media/snowballing/upgrades-purchased.webp",
      "width": 640,
      "height": 360,
      "alt": "Health Regen at level one; the balance is now 25 and purchase buttons are disabled.",
      "caption": "After buying Health Regen for 150: one level owned, 25 remaining, and both purchase buttons disabled.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    }
  ],
  "problem": "A run ends, but the player needs a way to carry progress into the next attempt. The purchase screen also needs to communicate what is affordable and what has reached its limit.",
  "intent": "Connect earned currency to persistent upgrades, and make the cost, owned level, and availability visible before the player buys.",
  "designSummary": "Upgrade resources define identity, cost, description, and maximum quantity. Saved data stores the currency balance and owned quantities. Cards use that state to display progress and enable or disable purchasing.",
  "flow": [
    {
      "label": "Collect",
      "detail": "Experience events add to the persistent currency balance."
    },
    {
      "label": "Choose",
      "detail": "Each card shows cost, current balance, and owned quantity."
    },
    {
      "label": "Purchase",
      "detail": "Buying increments the upgrade, deducts its cost, and saves."
    },
    {
      "label": "Refresh",
      "detail": "All cards refresh affordability and maximum-level states."
    }
  ],
  "implementationSummary": "The progression autoload owns the save dictionary and file access. The purchase card reads the resource and saved quantity, disables unavailable or maxed purchases, then updates every card after a purchase. Experience-drop chance and player regeneration read the saved upgrade counts during play.",
  "iterations": [
    "The v0.2.0 public development notes document meta-progression and save/load work.",
    "The v0.3.0 notes record regeneration and interface work.",
    "The local capture exercises the current purchase handler with a controlled balance of 175. Buying Health Regen for 150 leaves 25 and refreshes the cards."
  ],
  "outcomes": [
    "The captured interface shows the complete before/after purchase state, including the owned level and disabled buttons.",
    "The inspection confirms file-backed persistence and consumers of the saved upgrades. It does not measure player retention or long-term balance."
  ],
  "evidence": [
    {
      "id": "purchase-before",
      "title": "Before purchase",
      "description": "Both options are affordable in this controlled state.",
      "image": {
        "src": "/media/snowballing/upgrades-available.webp",
        "width": 640,
        "height": 360,
        "alt": "Two persistent upgrade cards with purchase buttons and a balance of 175.",
        "caption": "Before purchase: a controlled test balance of 175 makes both upgrades available.",
        "credit": "Snowballing project material",
        "permission": "approved",
        "pixelArt": true
      },
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "purchase-after",
      "title": "After purchase",
      "description": "The actual purchase handler updates quantity, balance, and availability.",
      "image": {
        "src": "/media/snowballing/upgrades-purchased.webp",
        "width": 640,
        "height": 360,
        "alt": "Health Regen at level one; the balance is now 25 and purchase buttons are disabled.",
        "caption": "After buying Health Regen for 150: one level owned, 25 remaining, and both purchase buttons disabled.",
        "credit": "Snowballing project material",
        "permission": "approved",
        "pixelArt": true
      },
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "release-history",
      "title": "Public progression notes",
      "description": "Historical evidence of progression and saving work.",
      "publicUrl": "https://fuenteki.itch.io/snowballing/devlog/744129/snowballing-v020-alpha",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "breakdowns": [
    {
      "title": "Following one purchase",
      "summary": "Connect earned currency to persistent upgrades, and make the cost, owned level, and availability visible before the player buys.",
      "details": "The progression autoload owns the save dictionary and file access. The purchase card reads the resource and saved quantity, disables unavailable or maxed purchases, then updates every card after a purchase. Experience-drop chance and player regeneration read the saved upgrade counts during play.",
      "evidenceIds": [
        "purchase-before"
      ]
    }
  ]
}
---

A permanent upgrade is both a gameplay rule and a user-interface contract: what it costs, what the player owns, and what changes after buying it.
