---
{
  "projectType": "game",
  "published": true,
  "sortOrder": 9,
  "featured": false,
  "title": "Pillarfall — Sixfold Ascension",
  "shortDescription": "A Godot game in development, with a focus on ballistics and destructible terrain.",
  "roles": [
    "Producer",
    "Game Designer",
    "Programmer"
  ],
  "technologies": [
    "Godot"
  ],
  "productStatus": "in_development",
  "accent": "rose",
  "attribution": "I work on production, game design, and programming.",
  "claims": [
    {
      "id": "personal-contribution",
      "text": "I work on production, game design, and programming.",
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
  "summary": "My production, design, and programming work includes the relationship between aiming, terrain changes, and readable presentation.",
  "contributions": [
    {
      "title": "Production & game design",
      "description": "I work on the project’s production and game design alongside its technical development."
    },
    {
      "title": "Ballistics & terrain",
      "description": "The current implementation separates projectile simulation and logical terrain from the visuals used to present them."
    }
  ],
  "evidence": [
    {
      "id": "terrain-study",
      "title": "Two views of one terrain",
      "image": {
        "src": "/media/pillarfall/marching-terrain.webp",
        "width": 1280,
        "height": 576,
        "alt": "A layered purple terrain profile with arches and circular cuts.",
        "caption": "Marching-squares view of the terrain comparison scene.",
        "credit": "Project capture",
        "permission": "approved"
      },
      "description": "Terrain comparison capture from the project, shown without its diagnostic overlay. This is a terrain study, not a finished gameplay scene.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ]
}
---

## Terrain as a system

Pillarfall is in development. This portfolio focuses on a concrete piece of the current work: a terrain model that can be changed by circular destruction and displayed through different renderers.

## From aiming to presentation

The trajectory preview obtains its points from the projectile solver. It visualizes a prediction over the configured simulation horizon; its last point is not automatically a confirmed impact. Terrain has a separate logical representation, so a visual change does not redefine which cells are solid.

The terrain breakdown compares two implemented presentation approaches using the same geometry. These images show a focused system study rather than final game art.
