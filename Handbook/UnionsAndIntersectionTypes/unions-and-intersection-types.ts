function padLeft(value: string, padding: any) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

interface Size {
  width: number;
  height: number;
}

console.log(padLeft("Hello world", 4)); // returns "    Hello world"
console.log(padLeft('hello world', 'two'))

let mySize: Size = {
  width: 1,
  height: 1
}
console.log(padLeft("Hello world", mySize))
