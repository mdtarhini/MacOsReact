export const formatDate = (strDate) => {
  const date = new Date(strDate);
  const now = new Date();

  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else {
    return date.toLocaleDateString([], {
      month: "short",
      year: "numeric",
      day: "numeric",
    });
  }
};

export const ellipseAText = (text, numberOfChars) => {
  return `${text.slice(0, numberOfChars)}${
    text.length > numberOfChars ? "..." : ""
  }`;
};
