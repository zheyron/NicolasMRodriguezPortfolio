---
{
  "title": "Combat that builds a puzzle",
  "shortDescription": "How attacks, puzzle pieces, and healing connect inside one arena.",
  "parentProject": "jigsaw-jab",
  "published": true,
  "sortOrder": 4,
  "featured": true,
  "depth": "overview",
  "reviewStatus": "approved",
  "discipline": "combat",
  "roles": [
    "Game Director",
    "Game Designer"
  ],
  "attribution": "I direct Jigsaw Jab and contribute to its game design, alongside production, programming, and VFX.",
  "claims": [
    {
      "id": "personal-contribution",
      "text": "I direct and produce the project, with contributions to game design, programming, and VFX.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/jigsaw-jab/gameplay.webp",
    "width": 1280,
    "height": 720,
    "alt": "The hand, enemies, and puzzle pieces share the Jigsaw Jab arena.",
    "caption": "Combat and puzzle assembly share the same board.",
    "credit": "Jigsaw Jab / Fuenteki — official Steam screenshot",
    "permission": "approved"
  },
  "gallery": [
    {
      "src": "/media/jigsaw-jab/gameplay.webp",
      "width": 1280,
      "height": 720,
      "alt": "The hand, enemies, and puzzle pieces share the Jigsaw Jab arena.",
      "caption": "Combat and puzzle assembly share the same board.",
      "credit": "Jigsaw Jab / Fuenteki — official Steam screenshot",
      "permission": "approved"
    }
  ],
  "loop": {
    "src": "/media/jigsaw-jab/gameplay.mp4",
    "poster": {
      "src": "/media/jigsaw-jab/gameplay-poster.webp",
      "width": 960,
      "height": 540,
      "alt": "Jigsaw Jab gameplay with the hand above the puzzle board.",
      "caption": "Combat and placement in Jigsaw Jab.",
      "credit": "Jigsaw Jab / Fuenteki — Steam trailer",
      "permission": "approved"
    },
    "label": "Jigsaw Jab gameplay",
    "caption": "Combat, pieces, and puzzle placement. Excerpt from the official Steam trailer.",
    "credit": "Jigsaw Jab / Fuenteki",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "steam",
      "title": "Jigsaw Jab on Steam",
      "description": "The official store describes the combat-and-puzzle loop and lists the demo.",
      "publicUrl": "https://store.steampowered.com/app/4107020/Jigsaw_Jab/",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    },
    {
      "id": "gameplay",
      "title": "Combat and puzzle assembly",
      "description": "Official gameplay imagery shows the hand, puzzle board, enemies, and HUD together.",
      "image": {
        "src": "/media/jigsaw-jab/gameplay.webp",
        "width": 1280,
        "height": 720,
        "alt": "The hand, enemies, and puzzle pieces share the Jigsaw Jab arena.",
        "caption": "Combat and puzzle assembly share the same board.",
        "credit": "Jigsaw Jab / Fuenteki — official Steam screenshot",
        "permission": "approved"
      },
      "publicUrl": "https://store.steampowered.com/app/4107020/Jigsaw_Jab/",
      "sourceType": "public",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "problem": "The same mouse-controlled hand attacks enemies and handles puzzle pieces. The design has to support both precise placement and quick responses to danger.",
  "intent": "Connect the immediate action of fighting with the spatial task of completing a puzzle.",
  "designSummary": "Enemies become puzzle pieces. The player alternates between attacks and grabbing, rotating, and placing those pieces; correct fits reward healing and puzzle progress.",
  "flow": [
    {
      "label": "Fight",
      "detail": "Poke individual threats or slam groups."
    },
    {
      "label": "Collect",
      "detail": "Defeated enemies become puzzle pieces."
    },
    {
      "label": "Fit",
      "detail": "Grab, rotate, and place pieces on the board."
    },
    {
      "label": "Recover",
      "detail": "Correct placement restores health and advances the puzzle."
    }
  ],
  "breakdowns": [
    {
      "title": "One hand, two kinds of attention",
      "summary": "Fighting creates the pieces the player needs to complete the puzzle.",
      "details": "Precise pokes and crowd-control slams handle threats. Grabbing, rotating, and placing pieces moves the puzzle forward. Both activities occupy the same arena, so the player switches between immediate threats and the next useful placement.",
      "evidenceIds": [
        "steam",
        "gameplay"
      ]
    },
    {
      "title": "Placement feeds back into survival",
      "summary": "A correct fit rewards more than progress on the board.",
      "details": "Correct placements restore health and advance the puzzle. That gives assembly a direct place in the combat loop: the pieces left by enemies become a resource the player must handle, not just collect.",
      "evidenceIds": [
        "steam",
        "gameplay"
      ]
    }
  ]
}
---

The puzzle is part of survival. A defeated enemy leaves a piece with a shape and a destination; converting it into progress requires another action from the player.
