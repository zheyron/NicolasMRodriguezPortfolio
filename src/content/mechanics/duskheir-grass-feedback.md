---
{
  "parentProject": "duskheir",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "ui-vfx",
  "title": "Grass that remembers the cut",
  "shortDescription": "Projectile paths cut the foliage, scatter grass fragments, and leave a lasting trace during play.",
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
      "lastVerifiedAt": "2026-10-22",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/duskheir/grass-particles.webp",
    "width": 1280,
    "height": 720,
    "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
    "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
    "credit": "Duskheir gameplay capture",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "system-capture",
      "title": "Projectile-driven grass cutting",
      "image": {
        "src": "/media/duskheir/grass-particles.webp",
        "width": 1280,
        "height": 720,
        "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
        "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
        "credit": "Duskheir gameplay capture",
        "permission": "approved"
      },
      "description": "Moon attacks from the player activate the projectile cutter in the forest tutorial. The six-second sequence shows the projectiles, emitted grass fragments, and retained cuts from one fixed observation camera.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    },
    {
      "id": "retained-cut",
      "title": "The cut remains after the burst",
      "image": {
        "src": "/media/duskheir/grass-after.webp",
        "width": 1280,
        "height": 720,
        "alt": "The player stands beside shortened, flat-topped grass after the projectile attacks.",
        "caption": "After the attacks — shortened grass remains after the projectiles and most debris have disappeared.",
        "credit": "Duskheir gameplay capture",
        "permission": "approved"
      },
      "description": "A later frame from the same sequence shows shortened grass after the projectile has passed. The source implementation stores these cuts in a runtime mask.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    }
  ],
  "problem": "An attack should leave readable feedback in the environment. A brief particle flash alone disappears too quickly; a cut also needs to follow the moving attack and remain visible after it passes.",
  "intent": "Let players read their action in the world: a projectile crosses the foliage, grass fragments scatter, and the shortened patch remains during play.",
  "designSummary": "A shared cutter samples consecutive positions and connects them into cut segments. Projectiles carry this component as they travel. The grass manager records the path in a world-space mask, while newly affected terrain contributes to a debris burst.",
  "implementationSummary": "The cutter runs only during its active window, samples at a configured rate, skips tiny repeated movements, and rejects implausibly long segments. The manager batches mask updates and aggregates debris requests. A fixed pool of prewarmed GPU-particle emitters supplies the grass fragments.",
  "flow": [
    {
      "label": "Attack",
      "detail": "The player fires a Moon projectile through the foliage."
    },
    {
      "label": "Trace",
      "detail": "The moving projectile submits consecutive cut segments."
    },
    {
      "label": "Cut",
      "detail": "The shared mask shortens grass along that path."
    },
    {
      "label": "Scatter",
      "detail": "Pooled particles mark newly affected grass, then fade."
    }
  ],
  "breakdowns": [
    {
      "title": "What should I look for in the clip?",
      "summary": "The projectile, the fragments, and the remaining cut are three separate effects.",
      "details": "The bright blue shapes are the Moon attacks. The smaller green-grey pieces scattered around them are grass debris. After both move away, flat-topped, shortened grass marks the affected patch. The stills below isolate those stages.",
      "evidenceIds": [
        "system-capture",
        "retained-cut"
      ]
    },
    {
      "title": "Why trace a path instead of using the damage volume?",
      "summary": "Environmental feedback has different needs from combat damage.",
      "details": "GrassCutterComponent performs no overlap queries: it connects consecutive positions into segments. The projectile drives those samples through its movement. The same component supports an optional root-to-tip span for blade-shaped cutters; the gameplay shown here demonstrates the projectile path.",
      "evidenceIds": [
        "system-capture"
      ]
    },
    {
      "title": "How does the system limit repeated work?",
      "summary": "Sampling, mask uploads, and debris each have a boundary.",
      "details": "A minimum travel distance avoids duplicate samples. The mask uploads when dirty; existing cuts are checked before accumulating new debris. The particle service uses prewarmed emitters with a fixed capacity and a bounded particle count per burst. Cut history resets when a new gameplay player or level becomes active.",
      "evidenceIds": [
        "system-capture",
        "retained-cut"
      ]
    }
  ],
  "constraints": [
    "Cut history lasts for the active runtime and resets when a new gameplay player or level becomes active.",
    "Debris follows the terrain’s grass-placement rules, including texture and slope filters."
  ],
  "iterations": [
    "Successive Moon attacks cross overlapping parts of the patch; the grass stays shortened between attacks.",
    "The later frames show the retained cut after the projectiles have passed and the debris has dispersed."
  ],
  "outcomes": [
    "The recorded attacks produce visible grass debris and leave shortened foliage after the projectiles pass.",
    "The cut mask and transient particle feedback express two different parts of the same action: where it travelled and when it reached new grass."
  ],
  "loop": {
    "src": "/media/duskheir/grass-cutting.mp4",
    "poster": {
      "src": "/media/duskheir/grass-particles.webp",
      "width": 1280,
      "height": 720,
      "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
      "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    },
    "label": "Moon attacks cut grass and scatter debris",
    "caption": "Moon attacks pass through the grass, scatter fragments, and leave a cut that remains after the particles fade.",
    "credit": "Duskheir gameplay capture",
    "permission": "approved"
  },
  "gallery": [
    {
      "src": "/media/duskheir/grass-before.webp",
      "width": 1280,
      "height": 720,
      "alt": "The player winds up a Moon attack beside a patch of tall, intact grass.",
      "caption": "Before the projectile — tall grass fills the patch beside the player.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    },
    {
      "src": "/media/duskheir/grass-particles.webp",
      "width": 1280,
      "height": 720,
      "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
      "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    },
    {
      "src": "/media/duskheir/grass-after.webp",
      "width": 1280,
      "height": 720,
      "alt": "The player stands beside shortened, flat-topped grass after the projectile attacks.",
      "caption": "After the attacks — shortened grass remains after the projectiles and most debris have disappeared.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    }
  ]
}
---

## An action leaves a trace

I built the grass-cutting and particle systems to connect an attack with the surrounding foliage. In this sequence, the player fires Moon projectiles through a patch of grass. Small fragments scatter at the cut, then fade while the shortened grass stays visible.

The implementation separates trajectory sampling, the retained cut mask, and transient debris. That lets the visual response follow a moving projectile without making environmental feedback responsible for combat damage.
