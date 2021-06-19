const FormTextarea = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.labelName}</label>
      <textarea
        className="form-control"
        id={props.id}
        readOnly={props.readOnly && "readOnly"}
        onChange={props.change}
        value={props.value}
        rows={props.rows}
        value={props.value}
       
      >
        {props.children}
      </textarea>
    </div>
  );
};
export default FormTextarea;
