export const formatDateString = (date) => {
  if (!date) return "ไม่มีข้อมูลวันที่จอง";

  // ถ้าใช้ "th-TH" → จะได้เป็น 15/08/2568 (พ.ศ.)
  const formattedDate = new Date(date).toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export const formatDateTHStyle = (date) => {
  if (!date) return "ไม่มีวันที่";
  const result = new Date(date).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return result;
};
