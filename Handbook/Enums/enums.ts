enum Z {
  FOO = 0,
  BAR
}

enum Direction {
  Down = '1',
  Left = 2,
  Right = 5,
  Up = getSomeValue(),
}

Direction.Up
Direction.Down
Direction.Left
Direction.Right

type ZType = keyof typeof Z

function getSomeValue(params: void) {
  return 1
}





enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG
}

/**
 * This is equivalent to:
 * 字符字面量类型：
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is: ", key);
    console.log("Log level value is: ", num);
    console.log("Log level message is: ", message);
  }
}
printImportant("ERROR", "This is a message");



// // 反转映射
// enum Enum {
//   A // 0
// }
// let a = Enum.A; // 0
// let nameOfA = Enum[a]; // Enum["0"] -> "A"


// // const枚举
// const enum Enum2 {
//   A = 1,
//   B = A * 2
// }
// let a = Enum2.A; // 1
// let b = Enum2.B; // 2

// 周围枚举
declare enum Enum {
  A = 1,
  B,
  C = 2 + 1
}

namespace Enum {
  
}

let aaa = Enum.A
let b = Enum.B