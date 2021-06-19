const FormCheckout = (props) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={props.id}
        onChange={props.change}
        value={props.value}
        checked={props.checked}
        style={{
          width: "1.1rem",
          height: "1.1rem",
        }}
      />
      <label className="form-check-label" htmlFor={props.id}></label>
    </div>
  );
};
export default FormCheckout;
