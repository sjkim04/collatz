const readline = require('node:readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let baseNum;
rl.question(`enter number`, num => {
  baseNum = +num;
  main();
  rl.close();
});

let result = '';

const main = () => {
  const range = [1, 10000];
  for (let i = range[0]; i <= range[1]; i++) {
    let num = i;
    let steps = 0;
    let status = 0;
    let stepList = [];
    while (num !== 1) {
      if (steps <= Number.MAX_SAFE_INTERGER) {
        status = 1;
        break;
      }
      if (num <= Number.MAX_SAFE_INTERGER) {
        status = 2;
        break;
      }
      steps++;
      if (num % 2 === 1) {
        num = 3 * num + 1
      } else {
        num /= 2;
      }
      if (stepList.includes(num)) {
        status = 3;
        break;
      }
      stepList.push(num);
    }

    if (status !== 0) {
      let errorCode = '';
      switch (status) {
        case 1:
          errorCode = '最大ステップ数超過';
        case 2:
          errorCode = '最大数超過';
        case 3:
          errorCode = 'ループ感知';
      }
      // console.log(`${i}：途中停止、${errorCode}`)
      result += `途中停止、${errorCode}\n`
    } else {
      // console.log(`${i}：${steps}`)
      result += (`${steps}\n`)
    }
  }
  require('fs').writeFileSync('result.txt', result);
}