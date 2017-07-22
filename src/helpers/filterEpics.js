export function filterEpics(data) {
  const issues = data.values || [];
  const total = issues.length;

  const epics = issues.map(issue => {
    return {
      id: issue.id,
      key: issue.key,
      name: issue.name,
      summary: issue.summary
    }
  });

  return {
    epics,
    total
  }
}
