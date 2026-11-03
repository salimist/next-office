// CSV 글을 행 배열로 읽는다. 각 행은 칸 문자열의 배열이다.
// 따옴표 안의 쉼표·줄바꿈은 칸을 나누지 않고, 겹따옴표("")는 따옴표 하나로 읽는다.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }

  // 마지막 줄 뒤에 줄바꿈이 없을 때 남은 행을 넣는다.
  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

if (typeof module !== 'undefined') {
  module.exports = { parseCsv };
}
