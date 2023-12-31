export const formatPhone = string => {
  console.log('string: ', string);
  // Видаляємо всі символи, крім цифр і + з рядка
  const formatString = string.replace(/[^\d]/g, '');
  console.log('formatString : ', formatString);

  // Перевіряємо, чи починається рядок з +38
  if (formatString.startsWith('38')) {
    // console.log('string : ', string);
    // Якщо так, то повертаємо рядок без змін
    return '+' + formatString;
  } else {
    // Якщо ні, то додаємо +38 на початок рядка і повертаємо його
    return '+38' + formatString;
  }
};
