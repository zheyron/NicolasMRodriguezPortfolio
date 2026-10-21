---
{
  "projectType": "game",
  "published": true,
  "sortOrder": 8,
  "featured": false,
  "title": "Duskheir",
  "shortDescription": "World states, responsive environments, and hands-on production in a Godot action project.",
  "roles": [
    "Producer",
    "Director",
    "Programmer"
  ],
  "technologies": [
    "Godot"
  ],
  "accent": "lilac",
  "attribution": "I managed the project and contributed game design revisions, narrative and worldbuilding, camera and terrain systems, the initial player implementation, player-state changes, state-aware objects, grass cutting, grass particles, and many of the VFX.",
  "claims": [
    {
      "id": "personal-contribution",
      "text": "I managed the project and contributed game design revisions, narrative and worldbuilding, camera and terrain systems, the initial player implementation, player-state changes, state-aware objects, grass cutting, grass particles, and many of the VFX.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "credits": [],
  "cover": {
    "src": "/media/duskheir/forest.webp",
    "width": 1280,
    "height": 720,
    "alt": "Duskheir’s player character in a forest clearing beside a house.",
    "caption": "Duskheir — the forest tutorial environment.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "gallery": [
    {
      "src": "/media/duskheir/sun-bridges.webp",
      "width": 1280,
      "height": 720,
      "alt": "The Sun bridge is visible while blue particles mark the Moon bridge.",
      "caption": "Sun state — the Sun bridge is revealed; particles mark the inactive Moon object.",
      "credit": "Project capture",
      "permission": "approved"
    },
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
  "summary": "My work connects production and design with the player’s interaction with the world: cameras, terrain, changing states, and environmental feedback.",
  "contributions": [
    {
      "title": "Direction & production",
      "description": "I managed the project, revised the initial game design to address implementation constraints, and wrote narrative and worldbuilding material."
    },
    {
      "title": "Player & camera foundations",
      "description": "I implemented the initial player logic and presentation, player-state changes, and camera systems."
    },
    {
      "title": "A responsive environment",
      "description": "I built state-aware objects, worked on terrain systems, and implemented grass cutting, grass particles, and many VFX."
    }
  ],
  "evidence": [
    {
      "id": "state-bridges",
      "title": "State-aware bridge demonstration",
      "image": {
        "src": "/media/duskheir/sun-bridges.webp",
        "width": 1280,
        "height": 720,
        "alt": "The Sun bridge is visible while blue particles mark the Moon bridge.",
        "caption": "Sun state — the Sun bridge is revealed; particles mark the inactive Moon object.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "The original Sun and Moon bridge scenes were run through Sun, Moon, and Dusk states. Visibility changes were checked at runtime.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "forest",
      "title": "Forest environment",
      "image": {
        "src": "/media/duskheir/forest.webp",
        "width": 1280,
        "height": 720,
        "alt": "Duskheir’s player character in a forest clearing beside a house.",
        "caption": "Duskheir — the forest tutorial environment.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Capture of the forest tutorial with the player, terrain, and foliage.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ]
}
---

## Connecting design and implementation

My involvement in Duskheir spans project management, design revisions, narrative and worldbuilding, and systems development. I worked on the initial player implementation and the cameras and environment systems around it.

## A world that responds

State-aware objects connect a world-state change to something the player can see and use. A bridge can be present in Sun, absent in Moon, and available again in Dusk. Particle cues keep the inactive object’s location visible.

Grass cutting provides a different kind of response: a trajectory leaves a mark in the foliage and triggers debris. The two breakdowns below examine these systems separately, with their own visual evidence.
