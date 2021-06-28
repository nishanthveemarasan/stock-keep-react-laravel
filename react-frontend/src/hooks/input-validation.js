import React, { useState } from "react";
const useFormValidate = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const inputChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setInputIsTouched(true);
  };

  const reset = () => {
    setInputValue("");
    setInputIsTouched(false);
  };

  return {
    inputValue,
    inputIsTouched,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useFormValidate;
