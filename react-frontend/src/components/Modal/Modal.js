import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ModalOverlay = (props) => {
  return (
    <Modal
      show={props.onShow}
      onHide={props.onHide}
      backdrop="static"
      size={props.size}
    >
      <Form onSubmit={props.onActionHandler}>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={props.onCLick}>
            {props.actionName}
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
const Modals = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay
          onShow={props.onShow}
          onHide={props.onHideHandler}
          onActionHandler={props.onActionHandler}
          heading={props.heading}
          actionName={props.actionName}
          onCLick={props.onCLick}
          size={props.size}
        >
          {props.children}
        </ModalOverlay>,
        document.getElementById("modal-root")
      )}
    </React.Fragment>
  );
};
export default Modals;
