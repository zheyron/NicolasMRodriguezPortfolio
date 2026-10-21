---
{
  "parentProject": "pillarfall",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "systems",
  "title": "Destruction first, rendering second",
  "shortDescription": "Comparing two terrain renderers against one shared model of solid and empty space.",
  "sortOrder": 10,
  "roles": [
    "Producer",
    "Game Designer",
    "Programmer"
  ],
  "attribution": "My Pillarfall work spans game design and programming; this breakdown examines the terrain system in the current project.",
  "claims": [
    {
      "id": "implemented-system",
      "text": "OccupancyGrid records circular destruction and affected chunks; the terrain comparison presents the same geometry with mask/shader and marching-squares renderers.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/pillarfall/marching-terrain.webp",
    "width": 1280,
    "height": 576,
    "alt": "A layered purple terrain profile with arches and circular cuts.",
    "caption": "Marching-squares view of the terrain comparison scene.",
    "credit": "Project capture",
    "permission": "approved"
  },
  "evidence": [
    {
      "id": "system-capture",
      "title": "Destruction first, rendering second",
      "image": {
        "src": "/media/pillarfall/marching-terrain.webp",
        "width": 1280,
        "height": 576,
        "alt": "A layered purple terrain profile with arches and circular cuts.",
        "caption": "Marching-squares view of the terrain comparison scene.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Existing terrain comparison capture from the project. Its diagnostic overlay has been excluded from the portfolio image.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ],
  "gallery": [
    {
      "src": "/media/pillarfall/mask-terrain.webp",
      "width": 1280,
      "height": 576,
      "alt": "The same terrain profile drawn with a texture-mask renderer.",
      "caption": "Texture-mask view of the same terrain data.",
      "credit": "Project capture",
      "permission": "approved"
    }
  ],
  "problem": "Destructible terrain needs a consistent definition of solid space even while its visual presentation changes.",
  "intent": "A circular cut removes solid cells. Rendering follows the changed geometry, while switching the visual mode leaves that geometry intact.",
  "designSummary": "The terrain model stores solid and empty cells. A circular destruction operation visits the clipped candidate area, changes only solid cells inside the circle, and returns the actual changed bounds and unique affected chunks. A repeated cut over empty space produces no new changes.",
  "implementationSummary": "The comparison scene feeds one occupancy dataset to two renderers: a texture mask with a shader, and marching-squares geometry. Both receive the same changed chunks. Presentation controls switch the visible renderer or camera zoom without redefining the terrain model.",
  "alternatives": [
    "The implemented comparison includes a texture-mask/shader approach and a marching-squares mesh approach. The captures show both; they do not establish a measured performance winner."
  ],
  "flow": [
    {
      "label": "Define",
      "detail": "Store the terrain’s solid and empty cells."
    },
    {
      "label": "Cut",
      "detail": "Remove solid cells within the requested circle."
    },
    {
      "label": "Report",
      "detail": "Return actual changed bounds and chunks."
    },
    {
      "label": "Redraw",
      "detail": "Update the affected visual regions."
    }
  ],
  "breakdowns": [
    {
      "title": "Why record actual changes?",
      "summary": "A cut over already-empty space should not become new work.",
      "details": "The mutation result records only cells that changed from solid to empty. Affected chunks are deduplicated and ordered. If nothing changes, the result contains no dirty chunks, so the renderer can skip that update.",
      "evidenceIds": [
        "system-capture"
      ]
    }
  ],
  "constraints": [
    "The displayed scene is a terrain rendering study, not finished gameplay.",
    "No performance measurements or multiplayer results are claimed here."
  ],
  "iterations": [
    "Reviewed circular destruction, actual-change tracking, and the shared-data comparison scene.",
    "Compared the project’s existing captures of the mask and marching-squares views."
  ],
  "outcomes": [
    "Logical terrain and its visual representation remain separate, allowing two presentation approaches to display the same cuts."
  ]
}
---

## One definition of the terrain

The important boundary is between the terrain’s state and the way it is drawn. A different visual treatment should not change which cells are solid or what a destruction operation removes.
