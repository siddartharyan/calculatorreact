/**
 * @ValuesArray stores all the buttons required for the calculator
 * except the clear and '='
 * @UseState is used to make necessary changes in the
 * virtual DOM whenever there is a change in the state.
 * @calculatorState stores the current state of the box on screen
 * @newState is used to reflect the changes made to calculatorState
 * @lastinExpression is used to store the last element of
 * @calculatorState and if it is an operator and element on which
 * user has clicked is also an operator then it should return without making
 * any changes as it doesn't make any sense
 *
 */

import React from "react";
import { evaluate } from "mathjs";
export default function Buttons() {
  const ValuesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/"];
  let [calculatorState, newState] = React.useState("");
  const handleClick = (event) => {
    let len = calculatorState.length - 1;
    let lastinExpression = calculatorState[len];
    let operator = event.target.innerHTML;
    if (
      lastinExpression === "+" ||
      lastinExpression === "-" ||
      lastinExpression === "*" ||
      lastinExpression === "/"
    ) {
      if (
        operator === "+" ||
        operator === "-" ||
        operator === "*" ||
        operator === "/"
      ) {
        return;
      }
    }
    if (calculatorState.length === 0) {
      if (
        operator === "+" ||
        operator === "-" ||
        operator === "*" ||
        operator === "/"
      ) {
        return;
      }
    }
    calculatorState = calculatorState + event.target.innerHTML;
    newState(calculatorState);
  };

  /**
   * @Calculate will evaluate the expression
   * if the last element of calculatorstate is an
   * operator then return without evaluating it as it doesn't make
   * anysense.
   */
  const Calculate = () => {
    let len = calculatorState.length;
    let operator = calculatorState[len - 1];
    if (
      operator === "+" ||
      operator === "-" ||
      operator === "*" ||
      operator === "/"
    ) {
      return;
    }
    calculatorState = evaluate(calculatorState);
    newState(calculatorState);
  };

  /**
   * @Clear is used to clear the CalculatorState that is
   * empty the output;
   */

  const Clear = () => {
    calculatorState = "";
    newState(calculatorState);
  };
  /**
   * return the JSX to where the Component is used.
   */
  return (
    <>
      <div className="box">{calculatorState}</div>
      <div className="calc">
        {ValuesArray.map((element) => (
          <button key={element} onClick={handleClick}>
            {element}
          </button>
        ))}
      </div>
      <div className="clc">
        <button onClick={Calculate}>=</button>
        <button onClick={Clear}>Clear</button>
      </div>
    </>
  );
}
