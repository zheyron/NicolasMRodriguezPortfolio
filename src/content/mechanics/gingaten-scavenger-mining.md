---
{
  "parentProject": "gingaten",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "ai",
  "roles": [
    "Gameplay Programmer",
    "Game Designer"
  ],
  "accent": "rose",
  "title": "Scavenger AI: resources under pressure",
  "shortDescription": "Search, approach, mine, or flee: an AI work cycle that changes the resources left for the player.",
  "sortOrder": 5,
  "attribution": "I connected the Scavenger’s decision tree and states with movement, mining progress, visual feedback, and asteroid loot.",
  "claims": [
    {
      "id": "scavenger-system",
      "text": "ScavengerBrain prioritizes death and player threat over searching, approaching, and mining; asteroid depletion changes subsequent loot rolls.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/gingaten/scavenger.webp",
    "width": 1280,
    "height": 720,
    "alt": "A yellow-shielded Scavenger navigating among asteroids.",
    "caption": "Scavenger — resource gathering and threat response.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "loop": {
    "src": "/media/gingaten/scavenger.mp4",
    "poster": {
      "src": "/media/gingaten/scavenger.webp",
      "width": 1280,
      "height": 720,
      "alt": "A yellow-shielded Scavenger navigating among asteroids.",
      "caption": "Scavenger — resource gathering and threat response.",
      "credit": "Gingaten gameplay capture",
      "permission": "approved"
    },
    "label": "Scavenger AI in the asteroid field",
    "caption": "Follow a Scavenger through the asteroid field. Its decisions and movement run through the game’s AI.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "problem": "A resource-gathering ship needs a complete work cycle, but it must also respond to the player. Its activity should have an effect beyond moving between rocks.",
  "intent": "Scavengers seek usable asteroids, approach a mining position, and deplete resources over time. A nearby player interrupts that work with a flee response.",
  "designSummary": "The decision tree prioritizes death, then threat, then work. The work branch searches when no target exists, approaches a stable offset point, and maintains mining until completion. A short memory discourages revisiting recent targets; fully depleted asteroids are excluded.",
  "implementationSummary": "ScavengerBrain uses a timed Physics.OverlapSphereNonAlloc scan and a reusable collider buffer. Search, MoveToAsteroid, MineAsteroid, and FleePlayer are separate FSM states. Mining progress is stored on the asteroid in quarter steps; the visible scan cone follows the mining target. OreDropTable reads that per-asteroid state when the asteroid breaks.",
  "flow": [
    {
      "label": "Find",
      "detail": "Scan nearby asteroids. Prefer the nearest usable target outside recent memory."
    },
    {
      "label": "Approach",
      "detail": "Arrive at a fixed offset from the asteroid rather than steering into its centre."
    },
    {
      "label": "Mine",
      "detail": "Advance depletion, show the scan cone, and preserve completed quarter steps."
    },
    {
      "label": "Respond",
      "detail": "Flee when the player is near. Resume work when the threat condition no longer applies."
    }
  ],
  "breakdowns": [
    {
      "title": "AI activity changes the reward",
      "summary": "Mining removes guaranteed drops and changes the relative weights of later loot rolls.",
      "details": "BeginScavengerMining marks the asteroid as mined, so guaranteed drops are no longer included. Partial depletion reduces configured extractable-resource weights, with a stronger reduction for the most valuable ore. At full depletion, the basic resource receives the dominant weight while other options retain a minimum. These are relative weights, not fixed percentage chances, and the shared ScriptableObject table is not modified.",
      "evidenceIds": [
        "scavenger-flight"
      ]
    },
    {
      "title": "Why approach an offset point?",
      "summary": "A ship needs a place to stop, not just an object to chase.",
      "details": "UpdateMiningAnchor fixes an approach point at MiningDistance from the asteroid, using the direction from which the ship arrived. During mining, steering looks toward the asteroid while retaining a stand-off distance. The anchor stays stable for that target, avoiding a goal that shifts with every movement of the ship.",
      "evidenceIds": [
        "scavenger-flight"
      ]
    },
    {
      "title": "What survives an interruption?",
      "summary": "The ship cancels its active timer; the asteroid retains completed depletion steps.",
      "details": "Entering the flee state cancels the mining timer, stops active mining, and hides the scan cone. When mining begins again, its duration is calculated from the asteroid’s remaining depletion. Progress is quantized in quarters, so an incomplete quarter is not preserved. Threat is checked against PlayerThreatRange; SafeDistance controls flee steering, not a second state-exit threshold.",
      "evidenceIds": [
        "scavenger-flight"
      ]
    }
  ],
  "constraints": [
    "The scan uses a fixed-size buffer: target selection considers the returned colliders, not an unlimited search of the entire field.",
    "Threat detection is distance-based. The Scavenger does not use the Seeker’s visual-memory rule."
  ],
  "iterations": [
    "Source review followed search and target selection, state transitions, mining cancellation, and the depletion context passed into OreDropTable.",
    "Runtime observation confirmed approach, flee, and mining states, including the scan cone and quarter-step depletion in the running scene."
  ],
  "outcomes": [
    "Resource gathering and threat response share one state-driven loop. The asteroid retains its own depletion state, connecting AI activity to the loot the player can receive."
  ],
  "evidence": [
    {
      "id": "scavenger-flight",
      "title": "Scavenger in the asteroid field",
      "image": {
        "src": "/media/gingaten/scavenger.webp",
        "width": 1280,
        "height": 720,
        "alt": "A yellow-shielded Scavenger navigating among asteroids.",
        "caption": "Scavenger — resource gathering and threat response.",
        "credit": "Gingaten gameplay capture",
        "permission": "approved"
      },
      "description": "Gameplay capture accompanies the implementation review of ScavengerBrain, its FSM states, Asteroid, and OreDropTable. The image shows the ship and environment; the reward rules are established by the code path.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ]
}
---

## More than a moving target

The Scavenger has a different purpose from the Seeker: it works on resources and reacts to danger. That gives its presence a consequence for the player. An asteroid that has already been mined no longer produces the same loot distribution as an untouched one.

The system connects **behaviour, resource state, and feedback**. The mining cone makes the active task visible, while the asteroid keeps the depletion that matters later.
