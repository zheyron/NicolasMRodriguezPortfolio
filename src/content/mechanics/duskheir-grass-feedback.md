---
{
  "parentProject": "duskheir",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "ui-vfx",
  "title": "Grass that remembers the cut",
  "shortDescription": "Tracing a weapon’s movement into foliage cuts and bounded particle feedback.",
  "sortOrder": 10,
  "roles": [
    "Producer",
    "Director",
    "Programmer"
  ],
  "attribution": "I implemented Duskheir’s grass-cutting system, grass particles, and many VFX.",
  "claims": [
    {
      "id": "implemented-system",
      "text": "Grass cutting samples cutter trajectories, stores cut stamps in a world-space mask, and routes aggregated debris requests to reusable particle bursts.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/duskheir/forest.webp",
    "width": 1280,
    "height": 720,
    "alt": "Duskheir’s player character in a forest clearing beside a house.",
    "caption": "Duskheir — the forest tutorial environment.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "system-capture",
      "title": "Grass that remembers the cut",
      "image": {
        "src": "/media/duskheir/forest.webp",
        "width": 1280,
        "height": 720,
        "alt": "Duskheir’s player character in a forest clearing beside a house.",
        "caption": "Duskheir — the forest tutorial environment.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Forest tutorial capture gives the environmental context. System details come from the cutter, mask-manager, and particle-spawner implementation.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "problem": "A broad combat hitbox is a poor match for the thin path of a moving blade. Environmental feedback needs its own representation of the cut.",
  "intent": "The foliage responds along a cutter’s trajectory and retains that cut during the active runtime. Particle debris marks newly affected grass.",
  "designSummary": "A cutter records consecutive tip positions while its cut window is active. It bridges those positions with segments and, when a blade root exists, also records the blade’s current span. A shared manager rasterizes the cuts into a texture mask consumed by the grass rendering.",
  "implementationSummary": "The cutter sleeps outside its active window, samples at a configured rate, ignores tiny repeated movements, and rejects implausibly long sweeps. The manager batches dirty texture uploads and aggregates debris requests. A pooled GPU-particle service turns those requests into bounded bursts.",
  "flow": [
    {
      "label": "Trace",
      "detail": "Sample the cutter during its active window."
    },
    {
      "label": "Connect",
      "detail": "Join successive points into thin cut segments."
    },
    {
      "label": "Remember",
      "detail": "Write the cut into the shared world-space mask."
    },
    {
      "label": "Respond",
      "detail": "Emit debris for newly affected grass."
    }
  ],
  "breakdowns": [
    {
      "title": "Why not use the combat hitbox?",
      "summary": "The blade’s path and the damage volume serve different purposes.",
      "details": "GrassCutterComponent performs no overlap queries. It samples the animated tip and optional root, then asks the grass manager to record a segment. Damage remains with the combat hitboxes; foliage feedback follows the visual source.",
      "evidenceIds": [
        "system-capture"
      ]
    },
    {
      "title": "What limits the repeated work?",
      "summary": "Sampling, texture uploads, and debris each have a boundary.",
      "details": "A minimum travel distance avoids duplicate samples. The mask is uploaded when dirty, and debris requests are aggregated rather than emitted for every blade sample. Existing cuts are checked before adding new debris feedback. Cut history resets when a new gameplay player or level becomes active.",
      "evidenceIds": [
        "system-capture"
      ]
    }
  ],
  "constraints": [
    "Cut history is runtime state, not a save-game persistence claim.",
    "The foliage image provides scene context; trajectory sampling and batching are established by the implementation review."
  ],
  "iterations": [
    "Traced the cutter, cut-mask manager, and debris-spawner code paths.",
    "Opened the forest tutorial to inspect the foliage in its gameplay environment."
  ],
  "outcomes": [
    "The foliage response follows cutter motion independently from combat damage, with a shared cut mask and bounded debris feedback."
  ]
}
---

## Feedback follows the blade

The system separates three jobs: record where a cut travels, remember its effect on the foliage, and show particles when new grass is affected. That keeps the visible response connected to the weapon’s movement.
