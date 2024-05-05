import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { TaskContext } from "./TaskContext.js";

function TaskProvider({ children }) {
  const [taskLoadObject, setTaskLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });
  const location = useLocation();

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/Task/get?id=${new URLSearchParams(
        location.search
      ).get("id")}`,
      {
        method: "GET",
      }
    );
    const responseJson = await response.json();
    if (response.status < 400) {
      setTaskLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setTaskLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  const value = {
    task: taskLoadObject.data,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskProvider;
