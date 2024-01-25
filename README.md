# FullDevLekce14
Unit Test for my application
## Domácí úkol 14

- Deadline: 25.1.2024 23:59
- Počet bodů: 5

__Cílem tohoto úkolu je napsat test__

- napiš unit test na libovolnou funkci
- vykoušej si mockování
- pokud nevíš na čem, zkus použít následující třídy:

```js
class CommandAdd {
    run(a, b) {
        return a + b
    }
}

class Calculator {
    constructor(commandAdd) {
        this.commandAdd = commandAdd
    }

    add(a, b) {
        return this.commandAdd.run(a, b)
    }
}
```

- napiš unit test na `CommandAdd.run`
- třída `Calculator` používá pro sčítání externí závislost ve formě třídy `CommandAdd`
- namockuj třídu `CommandAdd` a její metodu `run` a pak otestuj že `Calculator.add` funguje správně
