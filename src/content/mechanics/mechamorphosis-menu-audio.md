---
{
  "parentProject": "the-mechamorphosis",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "ui-vfx",
  "title": "Menus, music, and transitions",
  "shortDescription": "Connecting the title screen, audio controls, and scene changes around a visual novel.",
  "sortOrder": 10,
  "roles": [
    "Producer",
    "Narrative & Game Designer",
    "Art Direction",
    "Programmer"
  ],
  "attribution": "I implemented the audio system, menus, and some VFX in The Mechamorphosis.",
  "claims": [
    {
      "id": "implemented-system",
      "text": "The main menu starts menu music, opens a separate options scene, and uses a transition midpoint to switch the visible interface.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/the-mechamorphosis/options.webp",
    "width": 1280,
    "height": 720,
    "alt": "Music and sound-effect sliders in The Mechamorphosis options menu.",
    "caption": "Separate music and SFX controls inside the game’s interface.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "system-capture",
      "title": "Menus, music, and transitions",
      "image": {
        "src": "/media/the-mechamorphosis/options.webp",
        "width": 1280,
        "height": 720,
        "alt": "Music and sound-effect sliders in The Mechamorphosis options menu.",
        "caption": "Separate music and SFX controls inside the game’s interface.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Actual options-panel capture, supported by the menu, transition, and audio-bus implementation.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "gallery": [
    {
      "src": "/media/the-mechamorphosis/menu.webp",
      "width": 1280,
      "height": 720,
      "alt": "The Mechamorphosis title menu over its futuristic city.",
      "caption": "The main menu — visual identity, navigation, and music.",
      "credit": "Project capture",
      "permission": "approved"
    }
  ],
  "problem": "A visual novel needs an entry point and settings that feel connected to its world while keeping reading and navigation straightforward.",
  "intent": "The title menu establishes the setting. Options let the player control music and sound effects separately, and return to the same menu.",
  "designSummary": "The menu starts its music when it enters the scene. Opening Options plays a screen transition and waits for its midpoint before hiding the menu panel and adding the options scene. The Back action removes that scene and restores the panel.",
  "implementationSummary": "I connected menu signals, the options CanvasLayer, and the shared music player. Sliders convert between linear values and audio-bus decibels. The music player also supports a sequential fade-out, stream replacement, and fade-in for track transitions.",
  "flow": [
    {
      "label": "Enter",
      "detail": "Start the menu music and show the title interface."
    },
    {
      "label": "Transition",
      "detail": "Wait for the transition midpoint before changing panels."
    },
    {
      "label": "Adjust",
      "detail": "Control music and sound effects through separate buses."
    },
    {
      "label": "Return",
      "detail": "Remove Options and restore the menu panel."
    }
  ],
  "breakdowns": [
    {
      "title": "What does the transition coordinate?",
      "summary": "The visual midpoint gives the menu a moment to change panels.",
      "details": "The options action starts the fast transition and awaits transitioned_halfway. Only then does it hide the main margin container and instantiate Options. This keeps the panel change tied to the visual transition instead of an unrelated delay.",
      "evidenceIds": [
        "system-capture"
      ]
    },
    {
      "title": "Why separate audio controls?",
      "summary": "Music and sound effects are different parts of the reading experience.",
      "details": "Each slider is bound to its own audio bus. The menu reads the existing bus level when displaying Options, and converts the slider’s linear value to decibels on change. The inspected menu initializes both bus levels when it opens; this case does not claim persistent settings across launches.",
      "evidenceIds": [
        "system-capture"
      ]
    }
  ],
  "constraints": [
    "The demo is in Spanish.",
    "The track-transition method fades one stream out before starting the next; it is not a simultaneous two-track crossfade."
  ],
  "iterations": [
    "Opened the original main menu and its Options panel in the running project.",
    "Traced the button signals, transition midpoint, and music/SFX bus bindings in the implementation."
  ],
  "outcomes": [
    "A complete menu-to-options flow connects visual presentation, navigation, and audio control."
  ]
}
---

## Presentation around the story

My implementation work supports the experience before and between reading: the title screen, sound controls, and the visual hand-off when the interface changes.
