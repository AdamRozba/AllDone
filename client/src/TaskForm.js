import { useContext, useState } from "react";
import { TaskListContext } from "./TaskListContext.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import Icon from "@mdi/react";
import { mdiLoading, mdiShapeOutline, mdiRename, mdiTextBox } from "@mdi/js";

function TaskForm({ setShowTaskForm, task }) {
  const { state, handlerMap } = useContext(TaskListContext);
  const [showAlert, setShowAlert] = useState(null);
  const isPending = state === "pending";

  return (
    <Modal show={true} onHide={() => setShowTaskForm(false)}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          var formData = Object.fromEntries(new FormData(e.target));
          try {
            if (task.id) {
              formData.id = task.id;
              await handlerMap.handleUpdate(formData);
            } else {
              await handlerMap.handleCreate(formData);
            }

            setShowTaskForm(false);
          } catch (e) {
            console.error(e);
            setShowAlert(e.message);
          }
        }}
      >
        <Modal.Header>
          <Modal.Title>{`${
            task.id ? "Upravit" : "Vytvořit"
          } poznámku`}</Modal.Title>
          <CloseButton onClick={() => setShowTaskForm(false)} />
        </Modal.Header>
        <Modal.Body style={{ position: "relative" }}>
          <Alert
            show={!!showAlert}
            variant="danger"
            dismissible
            onClose={() => setShowAlert(null)}
          >
            <Alert.Heading>Nepodařilo se vytvořit úkol</Alert.Heading>
            <pre>{showAlert}</pre>
          </Alert>

          {isPending ? (
            <div style={pendingStyle()}>
              <Icon path={mdiLoading} size={2} spin />
            </div>
          ) : null}

          <Form.Group className="mb-3" controlId="formCategory">
            <Icon path={mdiShapeOutline} size={1} />
            <Form.Label>Název kategorie</Form.Label>
            <Form.Control
              type="text"
              name="category"
              required
              defaultValue={task.category}
              maxLength={25}
            />
            <Form.Text className="text-muted">Maximum 25 characters.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Icon path={mdiRename} size={1} />
            <Form.Label>Název úkolu </Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              defaultValue={task.name}
              maxLength={25}
            />
            <Form.Text className="text-muted">Maximum 25 characters.</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formContent">
            <Icon path={mdiTextBox} size={1} />
            <Form.Label>Text úkolu</Form.Label>
            <Form.Control
              as="textarea" // Change this line
              rows={5} // Add this line
              type="text"
              name="content"
              required
              defaultValue={task.content}
              maxLength={100000}
            />
            <Form.Text className="text-muted">
              Maximum 100 000 characters.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTaskForm(false)}
            disabled={isPending}
          >
            Zavřít
          </Button>
          <Button type="submit" variant="primary" disabled={isPending}>
            {task.id ? "Upravit" : "Vytvořit"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function pendingStyle() {
  return {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    opacity: "0.5",
  };
}

export default TaskForm;
