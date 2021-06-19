import FormTextarea from "./FormTextarea";

const FormSelect = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <select
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.change}
        disabled={props.readOnly && "readOnly"}
      >
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export const FormSelectWithoutLabel = (props) => {
  return (
    <div className="form-group">
      <select
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.change}
        disabled={props.readOnly && "readOnly"}
      >
        {props.options.map((option, index) => {
          return (
            <option key={index} value={option.toLowerCase()}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
