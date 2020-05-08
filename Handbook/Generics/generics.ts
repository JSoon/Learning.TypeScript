// function identity<T>(arg: T[]): T[] {
// }

// const myPassword = identity([12345])



interface GenericIdentityFn<T> {
  (arg: T): T;
}

function genericIdentity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<string> = genericIdentity;
myIdentity('string')


function identity<T>(arg: T): T {
  return arg;
}

let myIdentity2: { <T>(arg: T): T } = identity;



class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) {
  return x + y;
};



class BeeKeeper {
  hasMask!: boolean;
}

class ZooKeeper {
  nametag!: string;
}

class Animal2 {
  numLegs!: number;
}

class Bee extends Animal2 {
  keeper!: BeeKeeper;
}

class Lion extends Animal2 {
  keeper!: ZooKeeper;
}

function createInstance<A extends Animal2>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag; // typechecks!
createInstance(Bee).keeper.hasMask; // typechecks!





interface Options {
  color: string;
  volume: number;
}

let options = {} as Options;
options.color = "red";
options.volume = 11;
options.vol1ume = 11;

let myCloth: any;

myCloth.color // OK
myCloth.destroy() // OK
myCloth = { // OK
  color: "red",
  size: "L"
}

let helloStrict: number[] = [1, 2, 3]

class Point2 {
  constructor(public x: number, public y: number) {}
  getDistance(p: Point) {
    let dx = p.x - this.x;
    let dy = p.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
// ...

// Reopen the interface.
interface Point2 {
  distanceFromOrigin(): number;
}
Point2.prototype.distanceFromOrigin = function() {
  return this.getDistance({ x: 0, y: 0 });
};