---
{
  "projectType": "game",
  "published": true,
  "sortOrder": 2,
  "featured": true,
  "title": "Snowballing",
  "shortDescription": "Guide a snowball golem through a five-minute survival run, then grow stronger between attempts.",
  "roles": [
    "Game Designer",
    "Gameplay Programmer",
    "Producer"
  ],
  "technologies": [
    "Godot"
  ],
  "productStatus": "prototype",
  "accent": "ice",
  "featuredOrder": 2,
  "attribution": "I developed most of Snowballing from the ground up, spanning game design, core gameplay programming, and production. My work connects the moment-to-moment game with upgrades, persistent progression, interfaces, audio, and feedback. I also designed the Diovus boss encounter.",
  "links": [
    {
      "label": "Play the prototype",
      "url": "https://fuenteki.itch.io/snowballing"
    }
  ],
  "evidence": [
    {
      "id": "prototype",
      "title": "Play Snowballing",
      "description": "The public prototype describes automatic abilities, a five-minute survival objective, and purchases between runs.",
      "publicUrl": "https://fuenteki.itch.io/snowballing",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "release-02",
      "title": "Progression development notes",
      "description": "Published notes on meta-progression and save/load.",
      "publicUrl": "https://fuenteki.itch.io/snowballing/devlog/744129/snowballing-v020-alpha",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "release-03",
      "title": "Regeneration & interface development notes",
      "description": "Published notes credit my health-regeneration, interface, and balancing work.",
      "publicUrl": "https://fuenteki.itch.io/snowballing/devlog/811210/snowballing-v030-alpha",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "claims": [
    {
      "id": "personal-contribution",
      "text": "I developed most of Snowballing from the ground up, spanning game design, core gameplay programming, and production. My work connects the moment-to-moment game with upgrades, persistent progression, interfaces, audio, and feedback. I also designed the Diovus boss encounter.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    },
    {
      "id": "implementation-review",
      "text": "Upgrade selection, progression, timed difficulty, health, UI and music integration were inspected in the supplied local project.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    },
    {
      "id": "status",
      "text": "The public build is labelled Prototype.",
      "sourceType": "public",
      "sourceUrl": "https://fuenteki.itch.io/snowballing",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    },
    {
      "id": "progression",
      "text": "Public release notes document meta-progression, saving and health regeneration.",
      "sourceType": "public",
      "sourceUrl": "https://fuenteki.itch.io/snowballing/devlog/811210/snowballing-v030-alpha",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "credits": [],
  "tagline": "Survive the run. Build the next one.",
  "summary": "Snowy is a small snowball golem in a world invaded by void creatures. Move through the arena while abilities fire automatically, choose upgrades during the run, and spend collected currency on permanent improvements.",
  "cover": {
    "src": "/media/snowballing/key-art.webp",
    "width": 2800,
    "height": 1600,
    "alt": "Snowballing splash artwork: a white-haired character holds Snowy against a dark, starry background.",
    "caption": "Snowballing splash artwork selected for this portfolio.",
    "credit": "Snowballing project material",
    "permission": "approved",
    "pixelArt": true
  },
  "context": "indie",
  "contributions": [
    {
      "title": "Run & encounter systems",
      "description": "Experience collection, level progression, timed difficulty changes, enemy composition, spawning, and the transition into the boss encounter."
    },
    {
      "title": "Upgrades & persistence",
      "description": "In-run upgrade selection, unlock-dependent options, upgrade limits, between-run purchases, currency, and save/load."
    },
    {
      "title": "Player feedback",
      "description": "Health and regeneration, damage feedback, health-driven vignette, healing flash, and the interface that communicates player state."
    },
    {
      "title": "Menus & audio integration",
      "description": "Main, pause, options, and upgrade screens; screen transitions; music changes across menu, gameplay, boss, victory, and defeat states."
    },
    {
      "title": "Game design & production",
      "description": "Overall game design and project production, including the design of Diovus and the integration of the game’s systems."
    }
  ],
  "gallery": [
    {
      "src": "/media/snowballing/gameplay.webp",
      "width": 640,
      "height": 360,
      "alt": "Snowy at the centre of a snowy arena with the run timer and experience bar.",
      "caption": "A local development build: Snowy, run timer, health bar, and experience display.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    },
    {
      "src": "/media/snowballing/level-up.webp",
      "width": 640,
      "height": 360,
      "alt": "Three in-run upgrade cards: Ice Daggers, Sword Damage, and Sword Quickness.",
      "caption": "The real upgrade screen, triggered in a controlled local capture. The player chooses one of three options.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    },
    {
      "src": "/media/snowballing/menu.webp",
      "width": 640,
      "height": 360,
      "alt": "Snowballing main menu in front of a luminous portal.",
      "caption": "Main menu captured from the local Godot project.",
      "credit": "Snowballing project material",
      "permission": "approved",
      "pixelArt": true
    }
  ]
}
---

## One game, two layers of progression

Inside a run, experience creates moments to choose an upgrade. Between runs, accumulated currency can buy permanent improvements. I implemented the systems connecting those two layers, including the interfaces and saved state.

## Building the pressure of a run

The arena timer drives difficulty changes. The enemy manager adjusts its weighted enemy pool, spawn interval, and batch size as the run progresses. Spawn candidates are checked against terrain before enemies enter the arena. At the end of the timer, the game transitions to the boss encounter.

I designed Diovus as part of the game’s overall encounter design. This page focuses on my gameplay systems and design work.

## Making state visible

Health changes feed the health bar, screen vignette, damage response, and healing flash. Menus, upgrade cards, and audio transitions connect those systems to what the player sees and hears.

The three studies follow these systems from their rules to the running interface. Captures come from the supplied local development build; controlled test states are identified in their captions.
