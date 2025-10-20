export default function formatDate(date) {
  if (!date) return "";

  const dateStr = date.toString().split("T")[0];
  return dateStr;
}
