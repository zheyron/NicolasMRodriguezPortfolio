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
  "title": "Seeker AI: detect, pursue, engage",
  "shortDescription": "Vision, last-known-position memory, and state transitions connect patrol to combat.",
  "sortOrder": 4,
  "attribution": "My work on Gingaten includes the combat AI: perception, decision logic, state behaviour, and its connection to steering and weapons.",
  "claims": [
    {
      "id": "seeker-system",
      "text": "The Seeker combines a binary decision tree, an FSM, a line-of-sight sensor, steering, and externally controlled weapon input.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/gingaten/seeker.webp",
    "width": 1280,
    "height": 720,
    "alt": "A Seeker spacecraft inside its red hexagonal shield.",
    "caption": "Seeker — a combat pilot in the asteroid field.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "loop": {
    "src": "/media/gingaten/seeker.mp4",
    "poster": {
      "src": "/media/gingaten/seeker.webp",
      "width": 1280,
      "height": 720,
      "alt": "A Seeker spacecraft inside its red hexagonal shield.",
      "caption": "Seeker — a combat pilot in the asteroid field.",
      "credit": "Gingaten gameplay capture",
      "permission": "approved"
    },
    "label": "Seeker AI in flight",
    "caption": "Follow a Seeker in the running game. The camera tracks the ship so its movement is easier to read.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "problem": "An enemy needs to notice the player, commit to a pursuit, and know when to stop. Simply aiming at the player every frame would bypass visibility, obstacles, and the return to patrol.",
  "intent": "The Seeker can acquire the player through its field of view, pursue a remembered position after losing sight, and fire only when its attack checks pass.",
  "designSummary": "Perception supplies facts. A binary decision tree chooses a state. The finite-state machine runs that behaviour. Death has priority; a detected target leads to chase or attack; otherwise a patrol-enabled ship returns to its interruption point and resumes its route. A ship without patrol uses wandering.",
  "implementationSummary": "LineOfSightSensor checks range, a dot-product field of view, and raycast occlusion. EnemySeekerController evaluates QuestionTree and ActionTree nodes, then updates its FSM. Chase and Attack supply a target to ShipSteeringController; Attack sends a primary-fire request through ShipWeaponInput and clears that request on exit.",
  "flow": [
    {
      "label": "Sense",
      "detail": "Check view range, field of view, and occlusion. Save the last position actually seen."
    },
    {
      "label": "Decide",
      "detail": "Prioritize death, then pursuit and attack eligibility, then return or patrol."
    },
    {
      "label": "Act",
      "detail": "The active state supplies a steering target and controls whether weapons may fire."
    },
    {
      "label": "Recover",
      "detail": "After pursuit memory expires, return to the saved patrol position and continue the route."
    }
  ],
  "constraints": [
    "Attack eligibility combines distance, forward alignment, and visibility or an allowed shootable blocker. Entering attack range alone is insufficient.",
    "The current memory rule uses target distance even without visibility. It is a practical pursuit rule, not a fully perception-only model."
  ],
  "breakdowns": [
    {
      "title": "Losing sight does not mean forgetting",
      "summary": "Occlusion changes the pursuit target to the last visible position.",
      "details": "RegisterVisibleTarget stores LastKnownPosition. GetPursuitTarget returns that saved target while vision is blocked. Detection memory clears only after the player remains outside the configured lose-target range for the configured delay. The timer resets inside that range, so this is not a simple countdown that starts whenever sight is lost.",
      "evidenceIds": [
        "seeker-flight"
      ]
    },
    {
      "title": "A shot has three conditions",
      "summary": "Distance, aim, and a permitted firing line must agree.",
      "details": "InAttackRange checks the distance threshold and a forward dot-product threshold before asking the sensor for firing permission. A previously detected target may remain eligible when a blocker belongs to a shootable layer. This layer-based rule does not mean every obstacle is destructible. AttackState also stops firing when it exits.",
      "evidenceIds": [
        "seeker-flight"
      ]
    }
  ],
  "iterations": [
    "Source review traced sensor refresh → decision-tree execution → FSM update, including the weapon reset on Attack exit.",
    "Runtime observation confirmed target visibility, changing attack eligibility, and obstacle-response activation. Patrol recovery and loss-of-sight memory were traced in the implementation, rather than demonstrated by this short clip."
  ],
  "outcomes": [
    "The implementation separates acquiring a target, choosing an action, and executing movement. Each can be inspected without folding the whole enemy into one update loop."
  ],
  "evidence": [
    {
      "id": "seeker-flight",
      "title": "Seeker in the game scene",
      "image": {
        "src": "/media/gingaten/seeker.webp",
        "width": 1280,
        "height": 720,
        "alt": "A Seeker spacecraft inside its red hexagonal shield.",
        "caption": "Seeker — a combat pilot in the asteroid field.",
        "credit": "Gingaten gameplay capture",
        "permission": "approved"
      },
      "description": "The capture shows the Seeker in flight. The behaviour breakdown is grounded in EnemySeekerController, LineOfSightSensor, PatrolState, ChaseState, and AttackState; a single image does not establish every transition.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ]
}
---

## From patrol to combat

The Seeker is the combat-focused AI in Gingaten. Its behaviour depends on what it can see and what it remembers, while its movement still goes through the ship’s physical flight system.

The important distinction is between **choosing an action** and **piloting the ship**. The decision tree answers “what should I do now?”; the state machine carries out that action over successive frames.
