export default function getNameOfUser(user) {
  if (!user) return "";
  const first = user.firstName || "";
  const last = user.lastName || "";
  const fullName = `${first} ${last}`.trim();
  return fullName || user.username || "";
}
