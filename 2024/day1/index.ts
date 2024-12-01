import fs from 'fs';
import path from 'path';

export const day1 = (): void => {
  // read in tuples from input.txt using node's fs module
  const inputPath = path.join(__dirname, 'input.txt');
  const input = fs
    .readFileSync(inputPath, 'utf8')
    .split('\n')
    .map((value) => value.split('   ').map(Number));

  // break input into two separate arrays of numbers
  const a = input.map((value) => value[0]);
  const b = input.map((value) => value[1]);

  const aSorted = a.sort((a, b) => a - b);
  const bSorted = b.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < aSorted.length; i++) {
    sum += Math.abs(aSorted[i] - bSorted[i]);
  }

  console.log(`Part 1: ${sum}`);

  // Part 2
  // for each number in a, find the number of times it occurs in b
  // mulitply the number in a by the number of times it occurs in b
  // sum the results
  let sum2 = 0;
  for (const num of aSorted) {
    sum2 += num * bSorted.filter((value) => value === num).length;
  }
  console.log(`Part 2: ${sum2}`);
};
