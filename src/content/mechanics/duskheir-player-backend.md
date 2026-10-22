---
{
  "parentProject": "duskheir",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "combat",
  "title": "Player inputs, combos & cancels",
  "shortDescription": "From remapped controls to combat decisions: command snapshots, temporal buffers, data-driven combos, and cancel windows.",
  "sortOrder": 9,
  "roles": [
    "Technical Designer",
    "Gameplay Programmer"
  ],
  "attribution": "I designed the player backend architecture, input mapping and buffers, combo resources, and the rules for interruptions and animation cancels.",
  "claims": [
    {
      "id": "player-backend",
      "text": "The player backend separates input routing, command storage, action states, and combo resources. Current attack states accept frame inputs through animation-driven windows; timestamped buffer helpers are implemented separately.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/duskheir/player-combo.webp",
    "width": 1280,
    "height": 720,
    "alt": "The player launches three blue Moon projectiles in a spreading fan.",
    "caption": "The third Moon step releases a three-projectile fan. The preceding steps use one projectile and a pair.",
    "credit": "Duskheir gameplay capture",
    "permission": "approved"
  },
  "loop": {
    "src": "/media/duskheir/player-backend.mp4",
    "poster": {
      "src": "/media/duskheir/player-combo.webp",
      "width": 1280,
      "height": 720,
      "alt": "The player launches three blue Moon projectiles in a spreading fan.",
      "caption": "The third Moon step releases a three-projectile fan. The preceding steps use one projectile and a pair.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    },
    "label": "Moon combo and movement cancel",
    "caption": "First: single projectile, paired waves, then a three-projectile fan. Next: another attack, followed by movement as its cancel window opens.",
    "credit": "Duskheir gameplay capture",
    "permission": "approved"
  },
  "gallery": [
    {
      "src": "/media/duskheir/player-combo.webp",
      "width": 1280,
      "height": 720,
      "alt": "The player launches three blue Moon projectiles in a spreading fan.",
      "caption": "The third Moon step releases a three-projectile fan. The preceding steps use one projectile and a pair.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    },
    {
      "src": "/media/duskheir/player-cancel.webp",
      "width": 1280,
      "height": 720,
      "alt": "The player moves across the clearing after leaving the Moon attack state.",
      "caption": "Movement resumes after the cancel window opens. Leaving the attack restores locomotion and exits the attacking presentation.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    }
  ],
  "diagrams": [
    {
      "src": "/media/duskheir/player-input-flow.svg",
      "width": 1200,
      "height": 865,
      "alt": "InputMap feeds PlayerInputRouter, a command snapshot, the active action state, combo data, and animation playback. Animation events open state windows. Timestamped storage is a separate branch.",
      "caption": "Execution flow: remapped actions become a frame snapshot; the current state decides what can run. Animation events open chain, movement-cancel, and dash windows. Timestamped presses are also stored, but the current attack states use frame flags.",
      "credit": "Architecture diagram based on the Duskheir implementation",
      "permission": "approved"
    },
    {
      "src": "/media/duskheir/player-combat-classes.svg",
      "width": 1200,
      "height": 1010,
      "alt": "The action state machine owns the active state. PlayerBasicAttackState extends PlayerAttackState, selects a catalog combo, and reads its ordered step resources.",
      "caption": "Class and resource relationships: the state machine manages transitions; the basic-attack state selects a combo from the Sun, Moon, or Dusk catalog. Each combo contains ordered step definitions. The active state reads animation and projectile data from those steps.",
      "credit": "Architecture diagram based on the Duskheir implementation",
      "permission": "approved"
    }
  ],
  "evidence": [
    {
      "id": "combat-sequence",
      "title": "Moon combo and movement cancel",
      "image": {
        "src": "/media/duskheir/player-combo.webp",
        "width": 1280,
        "height": 720,
        "alt": "The player launches three blue Moon projectiles in a spreading fan.",
        "caption": "The third Moon step releases a three-projectile fan. The preceding steps use one projectile and a pair.",
        "credit": "Duskheir gameplay capture",
        "permission": "approved"
      },
      "description": "The five-second gameplay sequence shows all three Moon steps and a later attack interrupted by movement. Runtime state transitions confirm that movement starts after the cancel window opens.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    },
    {
      "id": "backend-flow",
      "title": "Input-to-action architecture",
      "image": {
        "src": "/media/duskheir/player-input-flow.svg",
        "width": 1200,
        "height": 865,
        "alt": "InputMap feeds PlayerInputRouter, a command snapshot, the active action state, combo data, and animation playback. Animation events open state windows. Timestamped storage is a separate branch.",
        "caption": "Execution flow: remapped actions become a frame snapshot; the current state decides what can run. Animation events open chain, movement-cancel, and dash windows. Timestamped presses are also stored, but the current attack states use frame flags.",
        "credit": "Architecture diagram based on the Duskheir implementation",
        "permission": "approved"
      },
      "description": "The flow was traced through the input router, command buffer, active attack states, and animation controller. The timestamped-buffer API was checked separately with 18 passing assertions.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    },
    {
      "id": "combo-resources",
      "title": "Combat classes and resource relationships",
      "image": {
        "src": "/media/duskheir/player-combat-classes.svg",
        "width": 1200,
        "height": 1010,
        "alt": "The action state machine owns the active state. PlayerBasicAttackState extends PlayerAttackState, selects a catalog combo, and reads its ordered step resources.",
        "caption": "Class and resource relationships: the state machine manages transitions; the basic-attack state selects a combo from the Sun, Moon, or Dusk catalog. Each combo contains ordered step definitions. The active state reads animation and projectile data from those steps.",
        "credit": "Architecture diagram based on the Duskheir implementation",
        "permission": "approved"
      },
      "description": "The active basic-attack state selects ordered combo resources and reads each step’s animation key and projectile configuration. The diagram separates that runtime path from other available authoring fields.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    }
  ],
  "problem": "An attack needs commitment without leaving the player feeling locked out. The backend must separate what the player requests from what the current action permits, while keeping individual combo steps editable as data.",
  "intent": "Translate remapped controls into gameplay intent, select the appropriate Sun, Moon, or Dusk combo, and accept follow-up actions only when their windows are open.",
  "flow": [
    {
      "label": "Map",
      "detail": "InputMap bindings become named actions; the router samples movement and attack intent."
    },
    {
      "label": "Store",
      "detail": "The command buffer holds the frame snapshot and records timestamped presses separately."
    },
    {
      "label": "Decide",
      "detail": "The active state checks chain, movement-cancel, and dash windows."
    },
    {
      "label": "Execute",
      "detail": "A combo step supplies its animation and projectile data; animation events open the next windows."
    }
  ],
  "designSummary": "The combo catalog selects Sun, Moon, or Dusk. Each combo is an ordered array of step resources. Repeating the same attack type advances the current combo; switching attack type selects the other combo and starts its sequence again. Separate gates control chaining, movement cancellation, and dashing.",
  "implementationSummary": "I built the routing and command-storage layer, the player architecture, and the combo resource model. The attack state disables normal locomotion on entry. On exit it resets its windows, restores locomotion, and requests the non-attacking presentation. Animation and presentation have continued to evolve through team iteration.",
  "constraints": [
    "The active attack states read current-frame pressed flags. They do not currently consume the timestamped attack-buffer API.",
    "Current action windows are opened by animation events. Numerical timing and cancel-policy fields in step resources are not all consumed by this active execution path."
  ],
  "breakdowns": [
    {
      "title": "How do input mapping and glyphs stay separate from combat?",
      "summary": "Combat receives actions rather than physical keys or controller buttons.",
      "details": "The input router reads remappable action names and produces movement, aim, and attack intent. Settings changes update bindings, while device changes update controller context and input glyph resolution. The router also respects UI and console input capture; disabling gameplay input resets its commands.",
      "evidenceIds": [
        "backend-flow"
      ]
    },
    {
      "title": "What is actually buffered?",
      "summary": "A frame snapshot and timestamped presses live in the same command buffer, with different lifetimes.",
      "details": "Movement and pressed flags describe the current frame. Timestamped storage supports checking an age window, consuming a press once, and resetting stored intent. A new Sun or Moon press replaces the opposing basic-attack intent. These helpers pass isolated tests, but the active attack states currently read the frame flags. The clip demonstrates chaining inside open windows, not early-input buffering.",
      "evidenceIds": [
        "backend-flow",
        "combat-sequence"
      ]
    },
    {
      "title": "What makes an animation cancel valid?",
      "summary": "A state-owned window grants permission; changing state performs the cleanup.",
      "details": "The chain window permits follow-up attacks or skills, the dash window permits a dash, and the cancel window permits movement. In the recorded movement example, a direction is held while the attack is still locked. The state changes to movement only after its cancel window opens. Damage interruption has a separate cancel-action flag, while death enters its own state; those paths are not demonstrated in this clip.",
      "evidenceIds": [
        "combat-sequence",
        "combo-resources"
      ]
    }
  ],
  "iterations": [
    "Reviewed the active input-to-state path and the combo resources, distinguishing fields that are consumed at runtime from fields present in the authoring model.",
    "Ran 18 assertions against the timestamped-buffer API: age-window checks, one-time consumption, resets, and Sun/Moon intent replacement all passed.",
    "Recorded the three Moon steps and a movement cancel. The state trace confirms that held movement takes effect after the cancel window opens."
  ],
  "outcomes": [
    "The Moon sequence shows how three resource-defined steps produce distinct projectile patterns through the same attack-state path.",
    "The movement example makes the cancellation boundary visible: the attack commits first, then releases control when its window permits it."
  ],
  "learnings": [
    "A useful technical review follows the active consumer as well as the data model. A field or helper being available does not mean every gameplay state uses it; keeping that distinction explicit makes the architecture easier to maintain."
  ]
}
---

## One request, several decisions

The player does not directly turn a button press into an animation. Input routing produces intent, the current action state decides whether to accept it, and a combo resource supplies the selected attack’s data.

The clip follows a complete Moon chain, then shows movement cancelling a later attack. The two diagrams below connect that visible behaviour to the classes and resources behind it.

## Three steps, one execution path

| Moon step | Projectile pattern | Animation key |
| --- | --- | --- |
| 1 | Single projectile | `projectile_1` |
| 2 | Paired waves | `projectile_1` |
| 3 | Three-projectile fan | `projectile_2` |

The basic-attack state reads the step’s projectile count and configuration, then requests the corresponding animation. The sequence changes through resources rather than a separate state for each Moon attack.

## Two meanings of “buffer”

The command buffer stores both a **current-frame snapshot** and **timestamped presses**. Its temporal API supports expiry and one-time consumption. The active attack states currently read frame flags, so the recorded combo requires presses during open chain windows. It does not demonstrate a press queued before the window.
