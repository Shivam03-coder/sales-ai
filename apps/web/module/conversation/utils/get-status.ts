function getStatusColor(status: string) {
  switch (status) {
    case "escalated":
      return "text-yellow-400";
    case "resolved":
      return "text-green-400";
    case "unresolved":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export default getStatusColor;
