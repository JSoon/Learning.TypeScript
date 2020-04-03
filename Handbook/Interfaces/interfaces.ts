interface SquareConfig {
  color ? : string;
  width ? : number;
  // [propName: string]: any;
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

let squareOptions = {
  colour: "red"
}

let mySquare = createSquare(squareOptions);

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
// let copyNoChange: Array<number> = noChange.push(3)
let canChange: number[] = noChange as number[]
canChange.push(6)