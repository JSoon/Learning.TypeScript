interface SquareConfig {
  color ? : string;
  width ? : number;
}

function createSquare(config: SquareConfig): {
  area: number;
  foo ? : string
} {
  let newSquare = {
    color: "white",
    area: 6
  };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({
  color: 'red'
});

interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = {
  x: 10,
  y: 20
};
p1.x = 5; // error!

let noChange: ReadonlyArray<number> = [1, 2, 3, 4, 5]
let copyNoChange: Array<number> = noChange.push(3)