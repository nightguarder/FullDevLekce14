export class CommandAdd {
  run(a, b) {
    return a + b;
  }
}

//Class to add two numbers together.
export class Calculator {
  constructor(commandAdd) {
    this.commandAdd = commandAdd;
  }

  add(a, b) {
    return this.commandAdd.run(a, b);
  }
}
