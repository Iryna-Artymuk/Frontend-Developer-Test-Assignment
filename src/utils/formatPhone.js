export const formatPhone = string => {
  // Перевіряємо, чи починається рядок з +38
  if (string.startsWith('+38')) {
    // Якщо так, то повертаємо рядок без змін
    return string;
  } else {
    // Якщо ні, то додаємо +38 на початок рядка і повертаємо його
    return '+38' + string;
  }
};
