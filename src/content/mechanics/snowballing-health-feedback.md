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
  "title": "Making health changes readable",
  "shortDescription": "Connecting damage and regeneration to the health bar, vignette, audio, and healing flash.",
  "discipline": "ui-vfx",
  "sortOrder": 3,
  "featured": true,
  "attribution": "I implemented health regeneration and its visual feedback, connected player health to the interface, and integrated damage and healing audio responses.",
  "cover": {
    "src": "/media/snowballing/arena.webp",
    "width": 640,
    "height": 360,
    "alt": "Enemies converge on Snowy as a red vignette signals incoming damage.",
    "caption": "Damage feedback in the running local build: a red screen-edge flash and the player’s health bar.",
    "credit": "Snowballing project material",
    "permission": "approved",
    "pixelArt": true
  },
  "gallery": [
    {
      "src": "/media/snowballing/before-healing.webp",
      "width": 640,
      "height": 360,
      "alt": "Snowy with a half-filled health bar and a dark purple vignette.",
      "caption": "Controlled regeneration test: the player starts at 5 of 10 health.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    },
    {
      "src": "/media/snowballing/healing.webp",
      "width": 640,
      "height": 360,
      "alt": "Snowy flashes green while the health bar increases after regeneration.",
      "caption": "The same test after invoking the real regeneration handler: 6 of 10 health and the green healing flash.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    },
    {
      "src": "/media/snowballing/arena.webp",
      "width": 640,
      "height": 360,
      "alt": "Enemies converge on Snowy as a red vignette signals incoming damage.",
      "caption": "Damage feedback in the running local build: a red screen-edge flash and the player’s health bar.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    }
  ],
  "problem": "Health changes during combat can be easy to miss if they are communicated only by a small bar above the character.",
  "intent": "Give damage and healing distinct feedback while keeping the health bar and screen response tied to the same player state.",
  "designSummary": "The health component clamps health to its valid range and emits health-change events. Player code updates the bar and broadcasts the health percentage. The vignette reacts to damage and remaining health; regeneration emits a separate event that drives the green shader flash.",
  "flow": [
    {
      "label": "State change",
      "detail": "Damage or regeneration updates the health component."
    },
    {
      "label": "Broadcast",
      "detail": "Signals distinguish health changes, damage, and healing."
    },
    {
      "label": "Respond",
      "detail": "The bar, vignette, flash, and audio update."
    }
  ],
  "implementationSummary": "The regeneration handler reads the owned persistent upgrade count and only heals when the player has the upgrade and is below maximum health. The flash component replaces an active tween before starting another, preventing overlapping healing tweens. The damage timer creates an interval between contact-damage ticks.",
  "iterations": [
    "The v0.3.0 public notes credit my health-regeneration and regeneration-flash work.",
    "The capture sets health to 5/10 and invokes the actual regeneration handler with one purchased level. The resulting frame shows 6/10 health and the green flash."
  ],
  "outcomes": [
    "The controlled run demonstrates a successful healing event with synchronized health and visual feedback. A separate frame shows contact damage and the red vignette.",
    "These captures document behaviour. They are not evidence of measured improvements in readability or playtest performance."
  ],
  "evidence": [
    {
      "id": "before",
      "title": "Before regeneration",
      "description": "Controlled starting health: 5/10.",
      "image": {
        "src": "/media/snowballing/before-healing.webp",
        "width": 640,
        "height": 360,
        "alt": "Snowy with a half-filled health bar and a dark purple vignette.",
        "caption": "Controlled regeneration test: the player starts at 5 of 10 health.",
        "credit": "Snowballing project material",
        "permission": "approved",
        "pixelArt": true
      },
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "after",
      "title": "After regeneration",
      "description": "The real handler heals one point and triggers the flash.",
      "image": {
        "src": "/media/snowballing/healing.webp",
        "width": 640,
        "height": 360,
        "alt": "Snowy flashes green while the health bar increases after regeneration.",
        "caption": "The same test after invoking the real regeneration handler: 6 of 10 health and the green healing flash.",
        "credit": "Snowballing project material",
        "permission": "approved",
        "pixelArt": true
      },
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "regeneration-log",
      "title": "Regeneration development notes",
      "description": "Public development record for the regeneration work.",
      "publicUrl": "https://fuenteki.itch.io/snowballing/devlog/811210/snowballing-v030-alpha",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    }
  ]
}
---

A small amount of health recovery needs a visible response. Here, the saved upgrade, the health component, and the feedback layer meet in one player-facing event.
