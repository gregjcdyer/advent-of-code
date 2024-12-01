const part1Input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

// only 12 red cubes, 13 green cubes, and 14 blue cubes
const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

const result = part1Input.split('\n').reduce((acc, line) => {
  const [game, ...cubes] = line.split(':');
  console.log(cubes);

  let valid = true;
  for (let cube in cubes.toString().split(';')) {
    console.log(cube);
    const red = cube.split(',').reduce((acc, c) => {
      const [count, color] = c.trim().split(' ');
      acc[color] = parseInt(count);
      return acc;
    }, {});

    console.log(red);

    if (
      red.red > MAX_RED_CUBES ||
      red.green > MAX_GREEN_CUBES ||
      red.blue > MAX_BLUE_CUBES
    ) {
      valid = false;
      break;
    }
  }
  if (valid) {
    console.log(game);
    return acc + parseInt(game.split(' ')[1]);
  }
  return acc;
}, 0);

console.log(result);
