import path from 'path';
import fs from 'fs';

export const day2 = (): void => {
  const inputPath = path.join(__dirname, 'input.txt');
  console.log(inputPath);
  const input = fs
    .readFileSync(inputPath, 'utf8')
    .split('\n')
    .map((value) => value.split(' ').map(Number));

  let safe = 0;
  for (const row of input) {
    // safe if ALL values are increasing or decreasing
    let increasing = row.every((value, index, array) => {
      if (index === 0) {
        return true;
      }
      return value >= array[index - 1];
    });
    let decreasing = row.every((value, index, array) => {
      if (index === 0) {
        return true;
      }
      return value <= array[index - 1];
    });

    // the distance between adjacent values is at least 1 and at most 3
    for (let i = 0; i < row.length - 1; i++) {
      const diff = Math.abs(row[i] - row[i + 1]);

      if (diff > 3 || diff === 0) {
        increasing = false;
        decreasing = false;
      }
    }

    if ((increasing && !decreasing) || (decreasing && !increasing)) {
      safe++;
    }
  }

  // Part 1
  const ans = safe;

  console.log(`Part 1: ${ans}`);

  // Part 2
  // if only a single value is removed that would make the row safe, then that row is safe
  let safe2 = 0;
  for (const row of input) {
    for (let i = 0; i < row.length; i++) {
      const copy = row.slice();
      copy.splice(i, 1);

      let increasing = copy.every((value, index, array) => {
        if (index === 0) {
          return true;
        }
        return value >= array[index - 1];
      });
      let decreasing = copy.every((value, index, array) => {
        if (index === 0) {
          return true;
        }
        return value <= array[index - 1];
      });

      for (let j = 0; j < copy.length - 1; j++) {
        const diff = Math.abs(copy[j] - copy[j + 1]);

        if (diff > 3 || diff === 0) {
          increasing = false;
          decreasing = false;
        }
      }

      if ((increasing && !decreasing) || (decreasing && !increasing)) {
        safe2++;
        break;
      }
    }
  }
  console.log(`Part 2: ${safe2}`);
};
