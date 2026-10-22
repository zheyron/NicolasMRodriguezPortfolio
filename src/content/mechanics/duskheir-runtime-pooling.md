---
{
  "parentProject": "duskheir",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "systems",
  "title": "Shared systems, reusable objects",
  "shortDescription": "GameplayRuntime connects shared services; explicit ownership and pool lifecycles govern reusable gameplay objects.",
  "sortOrder": 9,
  "roles": [
    "Technical Designer",
    "Gameplay Programmer"
  ],
  "attribution": "I designed GameplayRuntime from the ground up and built Duskheir’s object-pooling architecture, defining how shared services and reusable gameplay objects connect.",
  "claims": [
    {
      "id": "runtime-pooling",
      "text": "GameplayRuntime hosts shared services behind typed accessors. Feedback and player projectile spawners use ObjectPool, while an ID-based PoolManager creates and deactivates objects through BaseFactory. These paths have distinct ownership and reset policies.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/duskheir/grass-particles.webp",
    "width": 1280,
    "height": 720,
    "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
    "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
    "credit": "Duskheir gameplay capture",
    "permission": "approved"
  },
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
    "label": "Projectiles and grass debris in Duskheir",
    "caption": "Projectiles cut grass and trigger debris. These visible systems use separate pools; the diagrams below explain their ownership and reuse.",
    "credit": "Duskheir gameplay capture",
    "permission": "approved"
  },
  "diagrams": [
    {
      "src": "/media/duskheir/runtime-service-map.svg",
      "width": 1200,
      "height": 1140,
      "alt": "GameplayRuntime owns shared input, combat, feedback and ID-based pool services. Player projectile pools, the audio adapter, SceneManager and GlobalState have separate owners.",
      "caption": "Ownership map. Input-device context feeds glyphs, cursor behaviour and haptics. The combat registry serves camera framing and an external music adapter. Feedback spawners own their ObjectPools; PoolManager uses a separate factory and ID registry.",
      "credit": "Architecture diagram based on Duskheir source and scene wiring",
      "permission": "approved"
    },
    {
      "src": "/media/duskheir/object-pool-lifecycle.svg",
      "width": 1200,
      "height": 1035,
      "alt": "ObjectPool lifecycle: prewarm, available, acquire, active, pending release, and return. A returned instance becomes available again; growth depends on the pool policy.",
      "caption": "Reuse flow. Acquisition transfers a node to its active parent. Deferred release returns it to the pool, hides it and disables processing. release_all provides a synchronous reset path. The separate ID-based manager clears factory objects on a transition request.",
      "credit": "Lifecycle diagram based on ObjectPool and PoolManager",
      "permission": "approved"
    }
  ],
  "evidence": [
    {
      "id": "runtime-connections",
      "title": "Runtime ownership and service connections",
      "image": {
        "src": "/media/duskheir/runtime-service-map.svg",
        "width": 1200,
        "height": 1140,
        "alt": "GameplayRuntime owns shared input, combat, feedback and ID-based pool services. Player projectile pools, the audio adapter, SceneManager and GlobalState have separate owners.",
        "caption": "Ownership map. Input-device context feeds glyphs, cursor behaviour and haptics. The combat registry serves camera framing and an external music adapter. Feedback spawners own their ObjectPools; PoolManager uses a separate factory and ID registry.",
        "credit": "Architecture diagram based on Duskheir source and scene wiring",
        "permission": "approved"
      },
      "description": "Traced the Autoload scene, serialized child references, typed getters, input-device connections, combat-registry consumers, and the grass-debris signal. An engine probe verified the main service connections and the fixed debris pool.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    },
    {
      "id": "pool-lifecycle",
      "title": "Acquisition, reuse and cleanup",
      "image": {
        "src": "/media/duskheir/object-pool-lifecycle.svg",
        "width": 1200,
        "height": 1035,
        "alt": "ObjectPool lifecycle: prewarm, available, acquire, active, pending release, and return. A returned instance becomes available again; growth depends on the pool policy.",
        "caption": "Reuse flow. Acquisition transfers a node to its active parent. Deferred release returns it to the pool, hides it and disables processing. release_all provides a synchronous reset path. The separate ID-based manager clears factory objects on a transition request.",
        "credit": "Lifecycle diagram based on ObjectPool and PoolManager",
        "permission": "approved"
      },
      "description": "Executed 24 checks against the runtime and pool implementations. Coverage included instance reuse, growth limits, duplicate deferred releases, synchronous reclamation before parent destruction, and ID-pool creation and clearing.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    },
    {
      "id": "feedback-in-play",
      "title": "A visible consumer: grass debris",
      "image": {
        "src": "/media/duskheir/grass-particles.webp",
        "width": 1280,
        "height": 720,
        "alt": "Blue Moon projectiles pass through the grass while small green-grey fragments scatter around the player.",
        "caption": "During the cut — the blue projectiles cross the foliage; the small green-grey fragments are grass debris.",
        "credit": "Duskheir gameplay capture",
        "permission": "approved"
      },
      "description": "The gameplay clip shows projectiles triggering grass-cut feedback. The debris spawner receives aggregated cut requests and plays reusable GPU-particle emitters. The footage illustrates the effect; the source review and engine checks establish the pooling behaviour.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-22"
    }
  ],
  "problem": "Cameras, input prompts and combat feedback need shared context, while levels and players have shorter lifetimes. Reusable objects add another boundary: an inactive object must be ready for reuse without carrying stale gameplay state or being destroyed with its former parent.",
  "intent": "Give gameplay code a clear route to shared services, keep ownership explicit, and reuse short-lived objects through defined acquisition, activation and return steps.",
  "flow": [
    {
      "label": "Resolve",
      "detail": "A gameplay consumer obtains a shared service through GameplayRuntime’s typed accessors."
    },
    {
      "label": "Request",
      "detail": "A spawner selects an effect or projectile scene and asks its pool for an instance."
    },
    {
      "label": "Activate",
      "detail": "The pool enables the node; the caller supplies position, attack data or effect parameters."
    },
    {
      "label": "Return",
      "detail": "The object returns after use. Reset and transition paths apply their own cleanup policies."
    }
  ],
  "designSummary": "GameplayRuntime is a persistent service host, with references serialized in its scene and a one-time startup fallback lookup. It exposes the active player and shared services through typed accessors. ObjectPool handles reusable-node bookkeeping, while spawners decide what to create and configure. PoolManager provides a separate ID-based registry backed by BaseFactory.",
  "implementationSummary": "I established the runtime host and pooling architecture around ownership and lifecycle boundaries. ObjectPool tracks available, active and pending-release nodes. Acquisition enables a node under an active parent; return parks it under the pool, hidden and inactive. Magic projectiles also receive dedicated acquire/release hooks to reset their combat and visual state. Other effects use their spawner and component APIs for setup and completion.",
  "breakdowns": [
    {
      "title": "How do shared systems stay in agreement?",
      "summary": "Consumers reuse authoritative context rather than independently rediscovering it.",
      "details": "InputDeviceService supplies the current device context to glyph resolution and haptics; GameplayRuntime also connects device changes to cursor visibility. The combat registry feeds CameraDirector3D, and a separate CombatMusicDirector under the audio system consumes its combat-state signal. Registering a player updates the camera target and resets grass-cut history when that player changes.",
      "evidenceIds": [
        "runtime-connections"
      ]
    },
    {
      "title": "What belongs to the pool, and what belongs to the caller?",
      "summary": "The pool owns reuse bookkeeping. The caller owns the meaning of the object.",
      "details": "ObjectPool stores available nodes, tracks active instance IDs, and deduplicates pending release requests. A spawner acquires a node and configures it for use. Projectile hooks reset movement, hit and particle state; grass bursts bind their pool, set their particle amount ratio, and return when the GPU emitter finishes. A free slot is not, by itself, a fully configured attack or effect.",
      "evidenceIds": [
        "pool-lifecycle",
        "feedback-in-play"
      ]
    },
    {
      "title": "Why do capacity policies differ?",
      "summary": "Prewarming sets the starting supply; it does not always define a hard limit.",
      "details": "Damage numbers, telegraphs and impacts prewarm on the first load-finished event and permit further growth without a hard cap. Grass debris instead creates 32 emitters at startup, disables growth, and skips a burst if none is available. Player projectile pools have their own configurable initial size, maximum and growth policy. These are different resource policies, not a single global pool size.",
      "evidenceIds": [
        "pool-lifecycle"
      ]
    },
    {
      "title": "What happens at a lifecycle boundary?",
      "summary": "Runtime reset and a level-transition request are different events.",
      "details": "Feedback spawners listen to GlobalState.runtime_reset and call release_all. The player death path emits that reset before requesting a reload. release_all returns active nodes synchronously, including nodes already pending release, so a later parent disposal can leave the returned instances intact. PoolManager listens to transition_requested and queues its factory objects for deletion, then clears its ID registry. Its signal is emitted before route validation; it should not be described as cleanup only after a successful transition.",
      "evidenceIds": [
        "runtime-connections",
        "pool-lifecycle"
      ]
    }
  ],
  "constraints": [
    "Pool reuse requires object-specific state cleanup as well as visibility and processing changes.",
    "Pools configured without a hard cap can still allocate during a burst. This review does not claim zero allocations or a measured frame-time improvement.",
    "Returning active objects before their parent is destroyed is an ordering requirement. The isolated lifecycle check verifies that sequence; it is not coverage of every scene-transition path."
  ],
  "iterations": [
    "Traced scene ownership and signal connections before drawing the runtime map, including the player-owned projectile pools and the separate ID-based factory path.",
    "Ran 24 engine checks covering service wiring, fixed-capacity prewarm, acquisition, growth limits, same-instance reuse, pending releases, parent disposal and ID-pool clearing. All passed."
  ],
  "outcomes": [
    "The service map makes the dependency paths explicit: input context, combat state and environmental feedback each have a shared source and identifiable consumers.",
    "The engine checks confirmed reuse of the same object instance and synchronous recovery of active objects before their temporary parent was freed.",
    "The two pooling paths are documented with their actual policies, including where growth is permitted and where objects are cleared rather than retained."
  ],
  "learnings": [
    "Ownership, capacity and reset order are separate design decisions. Making all three explicit gives each new gameplay system a concrete integration contract."
  ]
}
---

## Shared context across changing scenes

I designed GameplayRuntime as the home for services that need to remain available while gameplay scenes change. It gives the player, enemies and UI explicit access to the systems around them without putting every responsibility inside the player.

The runtime is a host for services, rather than the owner of every object in the game. Its camera, input and feedback services have different consumers. Player projectile pools belong to the player’s spawner; the combat-music adapter belongs to the audio system.

## Two pooling paths

| Path | Responsibility | Return / reset |
| --- | --- | --- |
| ObjectPool | Reusable nodes for feedback and player projectiles | Deferred return; synchronous release-all when requested |
| PoolManager + BaseFactory | Objects looked up by pool ID, used by enemy services | Object-specific deactivation; factory objects cleared on transition request |

**Prewarming** creates a starting supply before requests need it. **Acquisition** borrows an available instance. **Release** returns it for another use. Whether a pool may grow, and how much state must be reset, depends on the caller.

The gameplay above provides a concrete example: a projectile traces a cut, the grass manager aggregates debris requests, and a dedicated spawner borrows a reusable particle emitter. The visual effect and the ownership diagram describe different parts of that same path.
