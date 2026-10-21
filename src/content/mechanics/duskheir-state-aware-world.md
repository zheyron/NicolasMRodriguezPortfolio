---
{
  "parentProject": "duskheir",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "systems",
  "title": "One world, changing states",
  "shortDescription": "Sun, Moon, and Dusk connect world-state changes to visible objects and particle cues.",
  "sortOrder": 10,
  "roles": [
    "Producer",
    "Director",
    "Programmer"
  ],
  "attribution": "I implemented player-state changes and state-aware objects in Duskheir.",
  "claims": [
    {
      "id": "implemented-system",
      "text": "State-aware bridge instances listen for the global state-change signal, reveal their children in the matching state, and show particle cues when hidden.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/duskheir/sun-bridges.webp",
    "width": 1280,
    "height": 720,
    "alt": "The Sun bridge is visible while blue particles mark the Moon bridge.",
    "caption": "Sun state — the Sun bridge is revealed; particles mark the inactive Moon object.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "system-capture",
      "title": "One world, changing states",
      "image": {
        "src": "/media/duskheir/sun-bridges.webp",
        "width": 1280,
        "height": 720,
        "alt": "The Sun bridge is visible while blue particles mark the Moon bridge.",
        "caption": "Sun state — the Sun bridge is revealed; particles mark the inactive Moon object.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Runtime capture of original bridge scenes. Their visibility was checked in all three demonstrated states.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "loop": {
    "src": "/media/duskheir/state-bridges.mp4",
    "poster": {
      "src": "/media/duskheir/sun-bridges.webp",
      "width": 1280,
      "height": 720,
      "alt": "The Sun bridge is visible while blue particles mark the Moon bridge.",
      "caption": "Sun state — the Sun bridge is revealed; particles mark the inactive Moon object.",
      "credit": "Project capture",
      "permission": "approved"
    },
    "label": "Duskheir state-aware bridges",
    "caption": "Component demonstration: Sun, Moon, then Dusk. The original bridge scenes respond to the game’s state-change signal.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "gallery": [
    {
      "src": "/media/duskheir/moon-bridges.webp",
      "width": 1280,
      "height": 720,
      "alt": "The Moon bridge is visible while red particles mark the Sun bridge.",
      "caption": "Moon state — the same two objects exchange visibility.",
      "credit": "Project capture",
      "permission": "approved"
    },
    {
      "src": "/media/duskheir/dusk-bridges.webp",
      "width": 1280,
      "height": 720,
      "alt": "Both the Sun and Moon bridges are visible.",
      "caption": "Dusk state — both bridge instances are revealed.",
      "credit": "Project capture",
      "permission": "approved"
    }
  ],
  "problem": "When a world state changes, the environment needs to communicate both what is available now and where an inactive object belongs.",
  "intent": "Objects reveal in their configured state. Inactive objects leave coloured particle cues; objects configured to reveal in Dusk can appear together.",
  "designSummary": "The demonstrated StateAware component has a reveal state and a reveal-in-Dusk option. It subscribes to the shared state-change signal and applies the current state immediately. Revealing enables its children and stops the cue particles. Hiding disables child processing and starts the particles.",
  "implementationSummary": "I connected the shared state signal to reusable scene components. The Sun and Moon bridge scenes each configure the same StateAware script and their own materials. The current project also contains StateProp3D, which expresses visibility and collision as separate state masks and applies runtime collision changes deferred.",
  "flow": [
    {
      "label": "Change state",
      "detail": "The world broadcasts the new Sun, Moon, or Dusk state."
    },
    {
      "label": "Evaluate",
      "detail": "Each object checks its reveal rule."
    },
    {
      "label": "Reveal",
      "detail": "Matching children become visible and resume processing."
    },
    {
      "label": "Leave a cue",
      "detail": "Inactive objects are marked by particles."
    }
  ],
  "breakdowns": [
    {
      "title": "What changes in the demonstration?",
      "summary": "The same two bridge instances respond to three states.",
      "details": "In Sun, the Sun bridge is visible and the Moon bridge is represented by blue particles. Moon reverses that relationship. Dusk reveals both. The clip uses the original bridge scenes in an isolated component demonstration, so the state response can be seen without surrounding level geometry.",
      "evidenceIds": [
        "system-capture"
      ]
    }
  ],
  "constraints": [
    "Visibility and collision are separate concerns: the StateProp3D implementation has independent masks for each.",
    "The clip demonstrates object-state responses, not completion of a level or a player test result."
  ],
  "iterations": [
    "Ran the original bridge scenes through Sun, Moon, and Dusk. Runtime checks confirmed visible/hidden, hidden/visible, and visible/visible respectively.",
    "Reviewed the signal subscription, reveal rules, and separate visibility/collision rules in the current components."
  ],
  "outcomes": [
    "One state signal drives reusable environment responses, while particle cues retain the location of inactive objects."
  ]
}
---

## Making a state change spatial

The mechanic connects a change of state with a change in the world. The object itself communicates the rule: present in one state, a particle cue in another, and revealed alongside its counterpart in Dusk.
