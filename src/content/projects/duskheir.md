---
{
  "projectType": "game",
  "published": true,
  "sortOrder": 8,
  "featured": false,
  "title": "Duskheir",
  "shortDescription": "Production, combat architecture, player systems, and a world that responds to every action.",
  "roles": [
    "Producer",
    "Director",
    "Technical Designer",
    "Programmer"
  ],
  "technologies": [
    "Godot"
  ],
  "accent": "lilac",
  "attribution": "I designed the player architecture and backend, data-driven combo resources, input mapping and buffering, GameplayRuntime, and object pools. My work also covers the options menu, cheat console, combat design, cameras, terrain, state-aware objects, grass cutting and particles, alongside project management, design revisions, narrative, and worldbuilding.",
  "claims": [
    {
      "id": "personal-contribution",
      "text": "I designed the player architecture and backend, data-driven combo resources, input mapping and buffering, GameplayRuntime, and object pools. My work also covers the options menu, cheat console, combat design, cameras, terrain, state-aware objects, grass cutting and particles, alongside project management, design revisions, narrative, and worldbuilding.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22",
      "reviewStatus": "approved"
    },
    {
      "id": "combat-design",
      "text": "I designed combos, movement interruptions, animation cancels, and attacks that keep the player airborne. I built the initial player presentation; the final animation and presentation architecture evolved through team iteration.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22",
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
      "src": "/media/duskheir/grass-particles.webp",
      "width": 1280,
      "height": 720,
      "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
      "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
      "credit": "Duskheir gameplay capture",
      "permission": "approved"
    },
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
  "summary": "I connect direction and production with hands-on technical design: the player’s combat rules, the architecture that runs them, and the feedback that makes actions readable.",
  "contributions": [
    {
      "title": "Direction & production",
      "description": "I managed the project, revised the initial game design to address implementation constraints, and wrote narrative and worldbuilding material."
    },
    {
      "title": "Player architecture & inputs",
      "description": "I designed and built the player backend: input mapping, dynamic device changes and glyphs, the mapping-to-command-buffer pipeline, and the player input buffer."
    },
    {
      "title": "Data-driven combat design",
      "description": "I built the combo resource system and designed the combos, movement interruptions, animation cancels, and attacks that suspend the player in the air."
    },
    {
      "title": "GameplayRuntime & object pools",
      "description": "I designed GameplayRuntime from the ground up and built the object-pooling systems that support shared gameplay services."
    },
    {
      "title": "Options & development tools",
      "description": "I built the full options-menu system and the cheat console, connecting player-facing settings with tools for inspecting and exercising gameplay."
    },
    {
      "title": "Cameras, terrain & feedback",
      "description": "I built camera systems, terrain systems, player-state changes, state-aware objects, grass cutting and grass particles, and many of the VFX."
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
    },
    {
      "id": "grass-cutting",
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
    }
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
  }
}
---

## From player intent to combat rules

I designed the player architecture and backend so that input, combat rules, and presentation have distinct responsibilities. Remapped actions enter a command buffer; combat consumes those commands and decides what the current action permits. Device changes and input glyphs stay connected to the active controls.

I built the resource system for data-driven combos. Each step can describe its execution, timing, chaining window, movement rules, and cancellation policy. This is where my combat design meets implementation: deciding when an attack commits the player, when another action can interrupt it, and when a hit can keep the character airborne.

My work includes the initial player presentation. The final animation and presentation architecture evolved through team iteration.

## Shared services, useful tools

I designed GameplayRuntime from scratch as the home for shared gameplay services, with explicit access to the active player and the systems around it. I also built the object pools, the full options-menu system, and the cheat console.

The options menu handles audio, display, and remappable controls. The console provides access to gameplay and level tools while keeping console input separate from player actions.

## A world that responds

State-aware objects connect a world-state change to something the player can see and use. A bridge can be present in Sun, absent in Moon, and available again in Dusk. Particle cues keep the inactive object’s location visible.

Grass cutting provides a different kind of response: a trajectory leaves a mark in the foliage and triggers debris. The breakdowns below examine these environmental systems separately.
