import { useState } from "react";
const useInut = (value) => {
  const [enteredInput, setEnteredInput] = useState(value);

  const onInputChangeHandler = (event) => {
    //  alert(event.target.value);
    setEnteredInput(event.target.value);
  };
  const reset = (value) => {
    setEnteredInput(value);
  };

  return {
    enteredInput,
    setEnteredInput,
    onInputChangeHandler,
    reset,
  };
};

export default useInut;
