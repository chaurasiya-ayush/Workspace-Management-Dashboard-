export const workspaceData = [
  /* ================= SECURITY TEAM ================= */
  {
    teamId: "team-security",
    teamName: "Security & Compliance",
    projects: [
      {
        projectId: "sec-1",
        projectName: "Q1 Pentest Remediation",
        tasks: [
          {
            id: 201,
            title: "Fix SQL injection vulnerability",
            status: "In Progress",
            priority: "Critical",
            assignee: "Sarah Chen",
            dueDate: "2024-05-15",
            estimatedHours: 12,
          },
          {
            id: 202,
            title: "Rotate production SSL certificates",
            status: "Done",
            priority: "High",
            assignee: "Marcus Thorne",
            dueDate: "2024-05-01",
            estimatedHours: 4,
          },
        ],
      },
      {
        projectId: "sec-2",
        projectName: "ISO 27001 Audit",
        tasks: [
          {
            id: 203,
            title: "Document access control policies",
            status: "Todo",
            priority: "Medium",
            assignee: "Sarah Chen",
            dueDate: "2024-06-20",
            estimatedHours: 20,
          },
        ],
      },
    ],
  },

  /* ================= MARKETING TEAM ================= */
  {
    teamId: "team-marketing",
    teamName: "Marketing & Growth",
    projects: [
      {
        projectId: "mkt-1",
        projectName: "Summer Campaign 2024",
        tasks: [
          {
            id: 301,
            title: "Social media ad copy",
            status: "Done",
            priority: "Medium",
            assignee: "Elena Rodriguez",
            dueDate: "2024-05-10",
            estimatedHours: 8,
          },
          {
            id: 302,
            title: "Influencer outreach",
            status: "In Progress",
            priority: "High",
            assignee: "Jordan Smith",
            dueDate: "2024-05-25",
            estimatedHours: 15,
          },
        ],
      },
    ],
  },

  /* ================= DYNAMIC TEAMS (SCALE TESTING) ================= */
  ...Array.from({ length: 30 }).map((_, i) => {
    const categories = [
      "Ops",
      "HR",
      "Sales",
      "Legal",
      "Finance",
      "Product",
      "R&D",
    ];
    const statuses = ["Todo", "In Progress", "Done", "Backlog", "Blocked"];
    const priorities = ["Low", "Medium", "High", "Critical"];
    const names = [
      "Alice",
      "Bob",
      "Charlie",
      "Diana",
      "Edward",
      "Fiona",
      "George",
      "Hannah",
    ];

    const category = categories[i % categories.length];

    // 🔥 RANDOM PROJECT COUNT (10 → 20)
    const projectCount = Math.floor(Math.random() * 11) + 10;

    return {
      teamId: `team-gen-${i + 1}`,
      teamName: `${category} Team ${Math.floor(i / categories.length) + 1}`,

      projects: Array.from({ length: projectCount }).map((__, j) => {
        // 🔥 RANDOM TASK COUNT PER PROJECT (5 → 20)
        const taskCount = Math.floor(Math.random() * 16) + 5;

        return {
          projectId: `proj-${i}-${j}`,
          projectName: `${category} Initiative ${String.fromCharCode(
            65 + (j % 26)
          )}`,

          tasks: Array.from({ length: taskCount }).map((___, k) => ({
            id: 1000 + i * 10000 + j * 100 + k,

            title: `${category} Task - ${
              ["Audit", "Review", "Meeting", "Deployment", "Analysis"][k % 5]
            } ${k + 1}`,

            status: statuses[Math.floor(Math.random() * statuses.length)],
            priority:
              priorities[Math.floor(Math.random() * priorities.length)],
            assignee: names[Math.floor(Math.random() * names.length)],

            dueDate: `2024-${String(
              Math.floor(Math.random() * 6) + 5
            ).padStart(2, "0")}-${String(
              Math.floor(Math.random() * 28) + 1
            ).padStart(2, "0")}`,

            estimatedHours: Math.floor(Math.random() * 40) + 1,
          })),
        };
      }),
    };
  }),
];
