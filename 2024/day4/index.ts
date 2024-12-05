import path from 'path';
import fs from 'fs';

export const day4 = (): void => {
  console.log('Day 4');
  const inputPath = path.join(__dirname, 'input.txt');
  const input = fs
    .readFileSync(inputPath, 'utf8')
    .split('\n')
    .map((line) => line.split(''));

  const word = 'XMAS';
  const wordLength = word.length;
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1], // right, down, down-right, down-left
    [0, -1],
    [-1, 0],
    [-1, -1],
    [-1, 1], // left, up, up-left, up-right
  ];

  let count = 0;

  const isValid = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < input.length && y < input[0].length;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === word[0]) {
        for (const [dx, dy] of directions) {
          let k;
          for (k = 0; k < wordLength; k++) {
            const ni = i + k * dx;
            const nj = j + k * dy;
            if (!isValid(ni, nj) || input[ni][nj] !== word[k]) {
              break;
            }
          }
          if (k === wordLength) {
            count++;
          }
        }
      }
    }
  }
  console.log(`Part 1: ${count}`);

  // Part 2
  // find all the M A S in an X
  const directions2 = [
    [1, 1],
    [1, -1], // down-right, down-left
    [-1, -1],
    [-1, 1], // up-left, up-right
  ];
  let count2 = 0;

  for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
      if (input[i][j] === 'A') {
        let found = true;
        for (const [dx, dy] of directions2) {
          const ni1 = i + dx;
          const nj1 = j + dy;
          const ni2 = i - dx;
          const nj2 = j - dy;
          if (
            !isValid(ni1, nj1) ||
            !isValid(ni2, nj2) ||
            ((input[ni1][nj1] !== 'M' || input[ni2][nj2] !== 'S') &&
              (input[ni1][nj1] !== 'S' || input[ni2][nj2] !== 'M'))
          ) {
            found = false;
            break;
          }
        }
        if (found) {
          count2++;
        }
      }
    }
  }
  console.log(`Part 2: ${count2}`);
};
