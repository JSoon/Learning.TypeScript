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

let noChange: ReadonlyArray < number > = [1, 2, 3, 4, 5]
// let copyNoChange: Array<number> = noChange.push(3)
let canChange: number[] = noChange as number[]
canChange.push(6)



class Animal {
  name: string;

  constructor(theName: string) {
    this.name = theName
  }
}
class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    super(name)
    this.breed = breed
  }
}


// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}
let myAnimal = new Animal('my animal')
let myDog = new Dog('dog', 'husky')
console.log(myDog);
let dogs: NotOkay;
dogs = [myAnimal, myDog]



interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, the type of 'name' is not a subtype of the indexer
}

interface ReadonlyStringArray {
  readonly[index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!





interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface
}

interface ClockInterface {
  nation: string
  tick(): void
}

class Clock implements ClockInterface {
  constructor(
    public h: number,
    public m: number
  ) {}

  nation = '中国制造'

  tick() {
    console.log('滴，答，滴，答', this.nation)
  }
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

const myClock = createClock(Clock, 12, 0)
myClock.tick()
