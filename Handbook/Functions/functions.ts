interface Add {
  (baseValue: number, increment: number): number
}

let myAdd: Add = function(x, y) {
  return x + y
}