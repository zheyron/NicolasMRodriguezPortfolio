---
{
  "projectType": "game",
  "published": true,
  "sortOrder": 7,
  "featured": false,
  "title": "Gingaten",
  "shortDescription": "A space-flight prototype with combat pilots, resource-gathering AI, and shared physical ship controls.",
  "roles": [
    "Gameplay Programmer",
    "Game Designer"
  ],
  "technologies": [
    "Unity",
    "C#"
  ],
  "accent": "rose",
  "attribution": "I was the main gameplay programmer and game designer. My work connects enemy decision-making, physical flight, and resource systems.",
  "claims": [
    {
      "id": "personal-contribution",
      "text": "Main gameplay programmer and game designer on Gingaten.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    },
    {
      "id": "implemented-ai",
      "text": "The project implements Seeker perception and state-driven combat, Scavenger mining and threat response, and shared PID steering with local obstacle avoidance.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/gingaten/cockpit.webp",
    "width": 1280,
    "height": 720,
    "alt": "The spacecraft cockpit overlooking an asteroid field in Gingaten.",
    "caption": "Gingaten — cockpit view and asteroid field.",
    "credit": "Gingaten project capture",
    "permission": "approved"
  },
  "productStatus": "prototype",
  "tagline": "Combat, resources, and the AI that connects them.",
  "summary": "The focus here is the relationship between systems: what a ship perceives, which action it chooses, how it flies, and what its actions leave behind for the player.",
  "contributions": [
    {
      "title": "Combat AI",
      "description": "Perception, pursuit memory, patrol recovery, and firing conditions through a decision tree and finite-state machine."
    },
    {
      "title": "Resource-gathering AI",
      "description": "Search, approach, mining, and fleeing connected to persistent asteroid depletion and weighted loot."
    },
    {
      "title": "Flight architecture",
      "description": "Shared movement input and physical locomotion, with AI steering, PID control, obstacle probes, and tunable data assets."
    }
  ],
  "loop": {
    "src": "/media/gingaten/cockpit.mp4",
    "poster": {
      "src": "/media/gingaten/cockpit-gameplay.webp",
      "width": 1280,
      "height": 720,
      "alt": "The spacecraft cockpit overlooking an asteroid field.",
      "caption": "Gingaten — cockpit view and asteroid field.",
      "credit": "Gingaten gameplay capture",
      "permission": "approved"
    },
    "label": "Gingaten cockpit gameplay",
    "caption": "The cockpit view in Gingaten’s asteroid field, with AI ships active around the player.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "gallery": [
    {
      "src": "/media/gingaten/scavenger.webp",
      "width": 1280,
      "height": 720,
      "alt": "A yellow-shielded Scavenger navigating among asteroids.",
      "caption": "Scavenger — resource gathering and threat response.",
      "credit": "Gingaten gameplay capture",
      "permission": "approved"
    },
    {
      "src": "/media/gingaten/seeker.webp",
      "width": 1280,
      "height": 720,
      "alt": "A Seeker spacecraft inside its red hexagonal shield.",
      "caption": "Seeker — a combat pilot in the asteroid field.",
      "credit": "Gingaten gameplay capture",
      "permission": "approved"
    }
  ],
  "challenges": [
    "AI ships need to react to a changing environment while obeying the physical movement system.",
    "Resource gathering must remain interruptible without erasing the depletion already stored on an asteroid."
  ]
}
---

## The game

Gingaten is a Unity practice project built around spacecraft, an asteroid field, and AI with different priorities. Seekers pursue the player; Scavengers work on resources and flee from nearby danger. Asteroids can be destroyed for loot, and prior mining changes what they can yield.

## What I wanted to explore

The project gave me a way to connect game design with implementation: distinct behaviours, readable state changes, physical movement, and consequences for resources. The case studies above explain those connections through the implemented systems and gameplay captures.

## Reading the captures

The cockpit clip shows the player’s view. The AI case studies use following cameras to make the ships’ movement easier to inspect. The explanations distinguish visible behaviour from rules established by reviewing the implementation.
