import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import TaskList from "./TaskList";
import TaskListProvider from "./TaskListProvider";
import TaskProvider from "./TaskProvider";
import TaskRoute from "./TaskRoute";

function App() {
  return (
    <div style={componentStyle()}>
      <TaskListProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TaskList />} />
              <Route
                path="taskDetail"
                element={
                  <TaskProvider>
                    <TaskRoute />
                  </TaskProvider>
                }
              />
              <Route path="*" element={"not found"} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskListProvider>
    </div>
  );
}

function componentStyle() {
  return {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundColor: "#0B2559",
  };
}

export default App;
