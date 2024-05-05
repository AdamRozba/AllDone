import { useContext } from "react";
import { TaskContext } from "./TaskContext";

import TaskDetail from "./TaskDetail";

function TaskRoute() {
  const { task } = useContext(TaskContext);

  return (
    <div className="card border-0 shadow rounded" style={componentStyle()}>
      {task ? (
        <>
          <TaskDetail task={task} />
          <div
            style={{
              display: "grid",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
}

function componentStyle() {
  return {
    margin: "12px auto",
    padding: "8px",
    columnGap: "20px",
    maxWidth: "100%",
    backgroundColor: "#F2CB05",
    color: "white",
    marginBottom: "20px",
    gridTemplateColumns: "max-content auto 32px",
    textAlign: "center",
  };
}

export default TaskRoute;
