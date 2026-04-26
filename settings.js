// Edit this file to customize the website without touching the main code.
const SITE_SETTINGS = {
  title: "HPL — Humanly Possible List",
  subtitle: "Geometry Dash Rankings",
  description: "A ranked list of verified and unverified Geometry Dash levels believed to be humanly possible.",
  discord: "https://discord.gg/hCStMPdW2z",
  footer: "HPL — Humanly Possible List • Built for clean rankings and easy updates",

  // Style options: "slate", "blue", "gold", "minimal"
  theme: "slate",

  // Controls list display without editing every entry.
  showIDs: true,
  showNotes: true,
  showPoints: true,
  compactCards: false,

  normalRules: [
    ["Humanly Possible Requirement", "Levels must be technically possible for a human to complete. The amount of time required to verify does not matter, as long as a human could potentially beat it."],
    ["Verified & Unverified Levels Allowed", "Both verified and unverified levels may qualify for placement on the list."],
    ["Verification Not Required for Placement", "A level does not need to be verified to appear on the list, provided there is no fake verification or false claims involved."],
    ["Rankings Can Change", "Placements may be adjusted over time based on new progress, stronger opinions, improved analysis, or better evidence."],
    ["World Record Proof Required", "Any claimed world record or major progress must include clear visible video proof."]
  ],

  submissionRules: [
    ["Decoration Standards", "Decoration is not the main priority, but levels should not be obvious layouts or object spam. A well-made level is strongly encouraged."],
    ["Creator Ownership Not Required", "You may submit a level even if you did not create it. However, it must still meet all list standards."],
    ["Playtesting Process", "When a level is submitted in the Discord, it may be playtested and reviewed to determine if it is worthy of placement."],
    ["Difficulty Requirement", "Submitted levels must be harder than a Geometry Dash Extreme Demon and must also follow the Humanly Possible Requirement."],
    ["Showcase Note", "You can showcase the level, but if you do not, someone else may showcase it."]
  ],

  submitFormat: [
    "Showcase video",
    "ID/GMD",
    "Your opinion of placement",
    "Creators",
    "Extra information"
  ]
};
