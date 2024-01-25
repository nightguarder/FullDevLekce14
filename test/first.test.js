import { expect, test } from "vitest";
class CommandAdd {
  run(a, b) {
    return a + b;
  }
}

//Class to add two numbers together.
class Calculator {
  constructor(commandAdd) {
    this.commandAdd = commandAdd;
  }

  add(a, b) {
    return this.commandAdd.run(a, b);
  }
}

test("adds 1 + 2 to equal 3", () => {
  expect(CommandAdd(1, 2)).toBe(3);
});
