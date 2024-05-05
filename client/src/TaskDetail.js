function TaskDetail({ task }) {
  return (
    <div style={componentStyle()}>
      <div style={textStyle("25px")}>{task.name}</div>
      <div style={textStyle("20px")}>{task.category}</div>
      <div style={textStyle("16px")}>{task.content}</div>
    </div>
  );
}

function componentStyle() {
  return {
    padding: "8px",
    maxWidth: "100%",
    backgroundColor: "#F2CB05",
    color: "black",
    marginBottom: "20px",
    textAlign: "center",
  };
}

function textStyle(fontSize) {
  return {
    fontSize: fontSize,
    margin: "10px 0",
  };
}

export default TaskDetail;
