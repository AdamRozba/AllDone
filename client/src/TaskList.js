import { useContext, useState } from "react";
import { TaskListContext } from "./TaskListContext.js";

import Button from "react-bootstrap/esm/Button.js";

import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm.js";
import Container from "react-bootstrap/esm/Container.js";

import Icon from "@mdi/react";
import { mdiFileDocumentPlusOutline } from "@mdi/js";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog.js";

function TaskList() {
  const { taskList } = useContext(TaskListContext);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <Button variant="success" onClick={() => setShowTaskForm({})}>
          <Icon
            path={mdiFileDocumentPlusOutline}
            size={1}
            color={"white"}
            style={{ verticalAlign: "middle" }}
          />{" "}
          Nový úkol
        </Button>
      </div>
      {!!showTaskForm ? (
        <TaskForm task={showTaskForm} setShowTaskForm={setShowTaskForm} />
      ) : null}

      {!!showConfirmDeleteDialog ? (
        <ConfirmDeleteDialog
          task={showConfirmDeleteDialog}
          setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
        />
      ) : null}
      {taskList.map((task) => {
        return (
          <TaskCard
            key={task.id}
            task={task}
            setShowTaskForm={setShowTaskForm}
            setShowConfirmDeleteDialog={setShowConfirmDeleteDialog}
          />
        );
      })}
    </Container>
  );
}

export default TaskList;
