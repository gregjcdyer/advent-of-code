import path from 'path';
import fs from 'fs';

export const day3 = (): void => {
  // read in tuples from input.txt using node's fs module
  const inputPath = path.join(__dirname, 'input.txt');
  const input = fs.readFileSync(inputPath, 'utf8').split('\n');

  // Part 1
  // find all instances of mul(x,y) and sum all the x * y
  const mulRegex = /mul\((\d+),(\d+)\)/g;
  let sum = 0;
  for (const line of input) {
    let match;
    while ((match = mulRegex.exec(line)) !== null) {
      const x = Number(match[1]);
      const y = Number(match[2]);
      sum += x * y;
    }
  }

  console.log(`Part 1: ${sum}`);

  // Part 2
  // find mul(x,y) adding x * y until don't() occurs in the string, then stop until a do() is found
  const doRegex = /do\(\)/g;
  const dontRegex = /don't\(\)/g;
  let sum2 = 0;
  let processing = true;

  // Find all occurrences of do() and don't()
  const doOccurrences = [];
  const dontOccurrences = [];

  for (const line of input) {
    let match;
    while ((match = doRegex.exec(line)) !== null) {
      doOccurrences.push(match.index);
    }
    while ((match = dontRegex.exec(line)) !== null) {
      dontOccurrences.push(match.index);
    }

    let mulMatch;
    while ((mulMatch = mulRegex.exec(line)) !== null) {
      // Check if the current mulMatch is after any don't() occurrence
      if (dontOccurrences.length && mulMatch.index > dontOccurrences[0]) {
        processing = false;
        dontOccurrences.shift();
      }
      // Check if the current mulMatch is after any do() occurrence
      if (doOccurrences.length && mulMatch.index > doOccurrences[0]) {
        processing = true;
        doOccurrences.shift();
      }
      if (processing) {
        const x = Number(mulMatch[1]);
        const y = Number(mulMatch[2]);
        sum2 += x * y;
      }
    }
  }
  console.log(`Part 2: ${sum2}`);
};
