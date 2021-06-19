export const useDate = (value) => {
  const d = new Date(value);
  const getMonth = d.getMonth() + 1;
  const getYear = d.getFullYear();
  const getDay = d.getDate();

  const getDate = `${getYear}-${getMonth
    .toString()
    .padStart(2, "0")}-${getDay.toString().padStart(2, "0")}`;

  return getDate;
};

export const useTime = (value) => {
  const d = new Date(value);
  const getHours = d.getHours();
  const getMinutes = d.getMinutes();
  const getSeconds = d.getSeconds();

  const getTime = `${getHours
    .toString()
    .padStart(2, "0")}:${getMinutes
    .toString()
    .padStart(2, "0")}:${getSeconds.toString().padStart(2, "0")}`;

  return getTime;
};

export const useButton = (
  actionType,
  actionName,
  isLoading,
  assign,
  enable,
  disable,
  status
) => {
  let buttonName = "";
  if (actionType == actionName) {
    if (isLoading) {
      buttonName = "Loading";
    } else {
      buttonName = assign;
    }
  } else {
    if (isLoading) {
      buttonName = "Loading";
    } else {
      if (status == "1") {
        buttonName = disable;
      } else {
        buttonName = enable;
      }
    }
  }
  return buttonName;
};
