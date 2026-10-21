---
{
  "parentProject": "gingaten",
  "published": true,
  "depth": "case-study",
  "reviewStatus": "approved",
  "discipline": "ai",
  "roles": [
    "Gameplay Programmer",
    "Game Designer"
  ],
  "accent": "rose",
  "title": "AI pilots, physical ships",
  "shortDescription": "Shared flight controls turn AI decisions into steering, distance control, and obstacle avoidance.",
  "sortOrder": 6,
  "attribution": "I implemented the connection between AI steering and the ship’s shared movement system, with tunable control and obstacle responses.",
  "claims": [
    {
      "id": "steering-system",
      "text": "AI steering produces FrameInput commands consumed by ShipMotorLocomotion; yaw, pitch, and distance use configurable PID controllers.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21",
      "reviewStatus": "approved"
    }
  ],
  "cover": {
    "src": "/media/gingaten/steering.webp",
    "width": 1280,
    "height": 720,
    "alt": "A spacecraft flying between the asteroids of Gingaten.",
    "caption": "AI ships use steering commands and physical locomotion.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "loop": {
    "src": "/media/gingaten/seeker.mp4",
    "poster": {
      "src": "/media/gingaten/steering.webp",
      "width": 1280,
      "height": 720,
      "alt": "A spacecraft flying between the asteroids of Gingaten.",
      "caption": "AI ships use steering commands and physical locomotion.",
      "credit": "Gingaten gameplay capture",
      "permission": "approved"
    },
    "label": "AI steering among asteroids",
    "caption": "A following-camera view of an AI ship navigating the asteroid field.",
    "credit": "Gingaten gameplay capture",
    "permission": "approved"
  },
  "problem": "Knowing where to go does not tell a physical spacecraft how to get there. AI needs to turn, accelerate, keep distance, and respond to obstacles through the same locomotion used by the player.",
  "intent": "The AI supplies pilot commands instead of directly moving a transform. Seek, Arrive, and Flee can share the same movement pipeline while requesting different targets and distances.",
  "designSummary": "The brain chooses a goal. Steering converts the goal into local direction and distance errors. PID controllers produce yaw, pitch, and forward input; collision probes modify those commands before the physics motor applies them.",
  "implementationSummary": "ShipSteeringController writes a normalized FrameInput to ShipMovementInput. ShipMotorLocomotion consumes that input and applies Rigidbody forces and relative torque. ShipAIDataSO holds tuning for pilot response; ShipDataSO holds physical ship settings. Human keyboard and mouse input enter the same motor without using the AI PID layer.",
  "flow": [
    {
      "label": "Goal",
      "detail": "A state chooses the target, steering mode, and desired distance."
    },
    {
      "label": "Control",
      "detail": "Local angle and distance errors become yaw, pitch, and throttle commands."
    },
    {
      "label": "Avoid",
      "detail": "Probes add lateral or vertical correction, reduce forward thrust, and suppress boost."
    },
    {
      "label": "Move",
      "detail": "The shared motor applies force and torque; physics determines the resulting motion."
    }
  ],
  "breakdowns": [
    {
      "title": "What PID does here",
      "summary": "It converts error into a bounded control input, rather than prescribing a position.",
      "details": "The proportional term responds to current error; the integral term accumulates persistent error within a limit; the derivative term responds to error change. The implementation clamps the final output. Changing the target or steering mode resets the controllers; changing the requested stand-off distance resets the distance controller. Actual behaviour depends on the configured gains, including whether the integral gain is zero.",
      "evidenceIds": [
        "steering-flight"
      ]
    },
    {
      "title": "Two distances, two obstacle responses",
      "summary": "Forward probes anticipate a collision; close probes handle immediate blockage.",
      "details": "Vertical probes use spherecasts and lateral probes use raycasts. Anticipatory avoidance adds strafe or lift, reduces forward input, and disables boost. Immediate avoidance can override lateral input and request reverse thrust if forward movement is blocked. Sensor refreshes are distributed across frames with a per-instance offset. This is local reactive avoidance, not a global path planner.",
      "evidenceIds": [
        "steering-flight"
      ]
    }
  ],
  "constraints": [
    "Local probes do not guarantee a route through every arrangement of obstacles.",
    "Control gains, sensor intervals, stand-off distances, and movement limits need to be tuned together. No performance benchmark or collision-free success rate is claimed."
  ],
  "iterations": [
    "Cross-checked the navigation document against ShipSteeringController, PidController, CollisionAvoidance, ShipMovementInput, and ShipMotorLocomotion.",
    "Recorded AI flight in the existing asteroid scene without replacing the ship’s behaviour or physical movement."
  ],
  "outcomes": [
    "Combat and resource-gathering AI can use the same pilot interface and physics motor, while separate data assets configure their handling."
  ],
  "evidence": [
    {
      "id": "steering-flight",
      "title": "Physical AI flight",
      "image": {
        "src": "/media/gingaten/steering.webp",
        "width": 1280,
        "height": 720,
        "alt": "A spacecraft flying between the asteroids of Gingaten.",
        "caption": "AI ships use steering commands and physical locomotion.",
        "credit": "Gingaten gameplay capture",
        "permission": "approved"
      },
      "description": "The clip shows a ship in the running scene. The shared input and physics architecture is verified in the steering, movement-input, and locomotion components.",
      "sourceType": "author",
      "lastVerifiedAt": "2026-10-21"
    }
  ]
}
---

## A decision is not a movement

Both the Seeker and the Scavenger need to pilot a spacecraft. I separated that task from their higher-level behaviour so that a change of goal does not require a different movement implementation.

For example, approaching an asteroid and escaping the player request different directions and distances, but both ultimately produce the same kinds of commands: throttle, yaw, pitch, strafe, lift, roll, and boost.
