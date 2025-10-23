export default function sortTable(data, sortConfig) {
  if (!Array.isArray(data) || data.length === 0) return [];
  const { key, direction } = sortConfig;

  return [...data].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    if (key === "updated_at" || key === "created_at") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}
