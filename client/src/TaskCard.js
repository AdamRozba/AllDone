import Button from "react-bootstrap/esm/Button.js";
import { useNavigate } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiRename, mdiEyeOutline, mdiDelete } from "@mdi/js";

function TaskCard({ task, setShowTaskForm, setShowConfirmDeleteDialog }) {
  const navigate = useNavigate();

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      <h2>{task.name}</h2>
      <p>{task.category}</p>
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="success"
          onClick={() => navigate("/taskDetail?id=" + task.id)}
          size={"sm"}
        >
          <Icon path={mdiEyeOutline} size={0.7} />
        </Button>
        <Button
          onClick={() => setShowTaskForm(task)}
          variant="success"
          size={"sm"}
        >
          <Icon path={mdiRename} size={0.7} />
        </Button>
        <Button
          onClick={() => setShowConfirmDeleteDialog(task)}
          size={"sm"}
          variant="danger"
        >
          <Icon path={mdiDelete} size={0.7} />
        </Button>
      </div>
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    gridTemplateColumns: "max-content auto",
    columnGap: "8px",
    maxWidth: "100%",
    backgroundColor: "#F2CB05",
    color: "black",
    marginBottom: "20px",
    alignItems: "center",
  };
}

export default TaskCard;
