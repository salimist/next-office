// tests 폴더의 *.test.js를 모두 실행하고 통과 수를 출력한다.
// 각 테스트 파일은 [{ name, run }] 배열을 내보낸다.
const fs = require('node:fs');
const path = require('node:path');

function listTestFiles() {
  return fs.readdirSync(__dirname)
    .filter((name) => name.endsWith('.test.js'))
    .sort()
    .map((name) => path.join(__dirname, name));
}

function runAllTests() {
  let passed = 0;
  let total = 0;

  for (const file of listTestFiles()) {
    const tests = require(file);
    for (const t of tests) {
      total += 1;
      try {
        t.run();
        passed += 1;
        console.log(`통과  ${t.name}`);
      } catch (error) {
        console.log(`실패  ${t.name}`);
        console.log(`      ${error.message.split('\n').join('\n      ')}`);
      }
    }
  }

  console.log(`\n통과 ${passed} / 전체 ${total}`);
  return passed === total;
}

process.exitCode = runAllTests() ? 0 : 1;
