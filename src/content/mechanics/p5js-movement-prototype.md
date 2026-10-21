---
{
  "parentProject": "p5js-physics",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "physics",
  "title": "Jump, glide, fall",
  "shortDescription": "A small set of controls gives the player different ways to manage airtime.",
  "sortOrder": 10,
  "roles": [
    "Game Designer",
    "Prototype Developer"
  ],
  "attribution": "I designed the game and built its original p5.js prototype. This case focuses on movement design and the playable behaviour.",
  "claims": [
    {
      "id": "implemented-system",
      "text": "The playable sketch supports jumping from the ground, gliding in the air, ending the glide on release, and a fast-fall input.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/p5js-physics/glide.webp",
    "width": 800,
    "height": 400,
    "alt": "A square player with yellow wings glides above red obstacles.",
    "caption": "Gliding changes the player’s descent while obstacles approach.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "system-capture",
      "title": "Jump, glide, fall",
      "image": {
        "src": "/media/p5js-physics/glide.webp",
        "width": 800,
        "height": 400,
        "alt": "A square player with yellow wings glides above red obstacles.",
        "caption": "Gliding changes the player’s descent while obstacles approach.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Capture of the playable sketch. The recording uses the game’s controls rather than an animation made for the portfolio.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "loop": {
    "src": "/media/p5js-physics/movement.mp4",
    "poster": {
      "src": "/media/p5js-physics/glide.webp",
      "width": 800,
      "height": 400,
      "alt": "A square player with yellow wings glides above red obstacles.",
      "caption": "Gliding changes the player’s descent while obstacles approach.",
      "credit": "Project capture",
      "permission": "approved"
    },
    "label": "p5.js jump and glide",
    "caption": "Jumping, gliding, and returning to the ground in the playable sketch.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "problem": "A runner can offer more than a single jump timing: the player can also control how long to remain in the air and when to descend.",
  "intent": "Space jumps from the ground and starts a glide when pressed in the air. Releasing it ends the glide. Control provides a faster descent.",
  "designSummary": "Jumping gives an upward impulse. Gliding uses a lower downward acceleration and shows wings on the player. Ending the glide restores the normal fall behaviour. Fast fall immediately changes downward velocity.",
  "implementationSummary": "The original prototype combines velocity-based vertical movement, a grounded check, and explicit glide state. The visible wings communicate that state. The public sketch provides a playable reference for the controls.",
  "flow": [
    {
      "label": "Jump",
      "detail": "Press Space while grounded to begin the arc."
    },
    {
      "label": "Glide",
      "detail": "Press Space again in the air to slow descent."
    },
    {
      "label": "Release",
      "detail": "Let go to end the glide."
    },
    {
      "label": "Fall",
      "detail": "Use Control to descend faster."
    }
  ],
  "breakdowns": [
    {
      "title": "How does the player read the active mode?",
      "summary": "The glide changes both motion and silhouette.",
      "details": "Wings appear while the glide state is active. This gives the player a visible confirmation of the lower-gravity movement mode without adding a separate interface indicator.",
      "evidenceIds": [
        "system-capture"
      ]
    }
  ],
  "constraints": [
    "This is an early prototype with geometric characters.",
    "The capture demonstrates movement controls; it does not establish balance or playtest outcomes."
  ],
  "iterations": [
    "Compared the movement controls in the original prototype source and the playable sketch.",
    "Recorded jump, glide, release, and fast-fall inputs in the running sketch."
  ],
  "outcomes": [
    "A compact input set supports different airtime choices, with immediate visual feedback for gliding."
  ]
}
---

## Control over airtime

The design centres on changing the shape of a jump after take-off. Jump, glide, and fast fall give the player a small movement vocabulary while obstacles continue to approach.
