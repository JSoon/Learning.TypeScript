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

let myCloth;