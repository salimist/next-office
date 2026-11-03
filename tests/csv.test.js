// CSV 읽기 테스트 (SPEC R1~R4). fixtures/sample.csv는 읽기만 한다.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const SAMPLE_PATH = path.join(__dirname, '..', 'fixtures', 'sample.csv');

function readSampleRows() {
  const { parseCsv } = require('../csv.js');
  return parseCsv(fs.readFileSync(SAMPLE_PATH, 'utf8'));
}

module.exports = [
  {
    name: 'parse: sample.csv는 5행 6열', // R1
    run() {
      const rows = readSampleRows();
      assert.equal(rows.length, 5);
      rows.forEach((row, i) => assert.equal(row.length, 6, `${i}번 행 칸 수`));
      assert.deepEqual(rows[0], ['날짜', '거래처', '품목', '수량', '단가', '메모']);
      assert.equal(rows[1][5], '');
      assert.equal(rows[4][5], '');
    },
  },
  {
    name: 'parse: 따옴표 안 쉼표는 칸을 나누지 않는다', // R2
    run() {
      const rows = readSampleRows();
      assert.equal(rows[1].length, 6);
      assert.equal(rows[1][1], '한빛상사, 본점');
    },
  },
  {
    name: 'parse: 겹따옴표는 따옴표 하나', // R3
    run() {
      const rows = readSampleRows();
      assert.equal(rows[2][2], '볼펜 "0.5mm"');
    },
  },
  {
    name: 'parse: 따옴표 안 줄바꿈은 같은 칸', // R4
    run() {
      const rows = readSampleRows();
      assert.equal(rows[3][5], '앞면 컬러\n뒷면 흑백');
      assert.equal(rows[4][0], '2026-11-04');
    },
  },
];
