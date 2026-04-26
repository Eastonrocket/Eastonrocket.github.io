const HPL_DATA = {
  site: {
    title: "The Hardest Humanly Possible Levels List",
    shortTitle: "HPL",
    subtitle: "Verified and unverified Geometry Dash levels considered humanly possible.",
    discord: "https://discord.gg/hCStMPdW2z",
    theme: "neon", // neon, clean, terminal
    maxMainList: 75
  },

  levels: [
    {
      rank: 1,
      name: "Aeternus",
      id: "102647436",
      creator: "Riot",
      creatorUrl: "https://www.youtube.com/@dewbbsGD",
      wr: "20%",
      wrPlayer: "dewbbsGD",
      wrUrl: "https://www.youtube.com/watch?v=hMh2waoolfQ",
      showcaseUrl: "https://www.youtube.com/watch?v=hMh2waoolfQ",
      points: 100,
      notes: "Current Top 1 example"
    },
    {
      rank: 2,
      name: "Heliopolis",
      id: "136530685",
      creator: "MindCap",
      creatorUrl: "https://www.youtube.com/@garbag",
      wr: "47%",
      wrPlayer: "garbag",
      wrUrl: "https://www.youtube.com/watch?v=4u5aQmb7Ofw",
      showcaseUrl: "https://www.youtube.com/watch?v=4u5aQmb7Ofw",
      points: 95,
      notes: "High-progress unverified level"
    },
    {
      rank: 3,
      name: "Grief",
      id: "Unreleased",
      creator: "IcedCave",
      creatorUrl: "https://www.youtube.com/@DoggieDasher",
      wr: "83%, 25-100%",
      wrPlayer: "Doggie",
      wrUrl: "https://www.youtube.com/watch?v=mp8TSHLoW8Q",
      showcaseUrl: "https://www.youtube.com/watch?v=mp8TSHLoW8Q",
      points: 90,
      notes: "WR and run listed"
    },
    {
      rank: 4,
      name: "Thinking Space II",
      id: "136530685",
      creator: "CairoX",
      creatorUrl: "https://www.youtube.com/@Zoink",
      wr: "100%",
      wrPlayer: "Zoink",
      wrUrl: "https://www.youtube.com/watch?v=CELNmHwln_c",
      showcaseUrl: "https://www.youtube.com/watch?v=CELNmHwln_c",
      points: 85,
      notes: "Completed / verified"
    }
  ],

  creators: [
    // Manual creator rankings. Add only chosen creators here.
    // { name: "CreatorName", url: "https://www.youtube.com/@Creator", totalLevels: 3, notes: "Made accepted HPL levels" }
  ],

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
    ["Showcase Note", "You can showcase, but if you do not, someone else may. Mostly staff."]
  ],

  changelog: [
    "Created neon-inspired HPL website layout.",
    "Added main list, records, player points, manual creator points, and rules tabs.",
    "v4: Reduced glow/animation and added local editor.html."
  ]
};
