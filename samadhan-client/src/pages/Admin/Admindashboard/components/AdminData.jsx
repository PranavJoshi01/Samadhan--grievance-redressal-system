// GLOBAL MAP (shared between all admin pages)
export const issuesMap = new Map([
  [1, { id: 1, title: "Street light not working", department: "Electricity Dept", status: "Pending", date: "2025-11-20" }],
  [2, { id: 2, title: "Garbage not collected", department: "Sanitation", status: "In Progress", date: "2025-11-21" }],
  [3, { id: 3, title: "Pothole in main road", department: "Road Dept", status: "Resolved", date: "2025-11-22" }],
]);

// UPDATE FUNCTION
export const updateIssue = (issue) => {
  issuesMap.set(issue.id, issue);
};
