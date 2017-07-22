export function filterIssues(data) {
  const issues = data.issues || [];
  const total = data.total;

  const badges = issues.map(issue => {
    const fields = issue.fields || {};
    const status = fields.status || {};

    return {
      id: issue.id,
      key: issue.key,
      name: fields.summary,
      status: status.name
    }
  });

  return {
    badges,
    total
  }
}
