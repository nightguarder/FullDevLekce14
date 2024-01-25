import { CommandAdd, Calculator } from "./calculator.js";
import { test, expect } from "vitest";

// Unit test pro Commandtest
test("CommandAdd.run() adds two numbers correctly", () => {
  const commandAdd = new CommandAdd();
  const result = commandAdd.run(1, 2);
  //Vysledek unit test bude passed nebo failed.
  expect(result).toBe(3);
});

// Mockovaní
class MockCommandAdd {
  run(a, b) {
    return a + b;
  }
}

//Unit test pro Calculator
test("Calculator.add() adds two numbers correctly", () => {
  const mockCommandAdd = new MockCommandAdd();
  const calculator = new Calculator(mockCommandAdd);
  const result = calculator.add(1, 2);
  expect(result).toBe(3);
});
