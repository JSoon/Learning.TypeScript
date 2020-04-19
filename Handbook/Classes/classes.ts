class Greeter {
  static hehe: string = 'hehe'
  greeting?: string;
  greet() {
      return "Hello, " + this.greeting;
  }
}

let myGreeter: typeof Greeter = Greeter
Greeter.hehe = 'haha'

console.log(myGreeter === Greeter)
