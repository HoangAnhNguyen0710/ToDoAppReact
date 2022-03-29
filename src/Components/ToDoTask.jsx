import React from "react";

function ToDoTask(props) {
  const DoneStyle = {
    textDecoration: "line-through",
    opacity: "0.6",
  };
  const DefStyle = {
    color: "black",
  };

  return (
    <React.Fragment>
      {props.tasks.map((task) => (
        <li key={task.id} className="list-group-item">
          {task.isInput ? (
            <input
              type="text"
              className="border-1 bg-white col-11"
              value={task.content}
              onChange={(e) => props.onTaskChange(task.id, e)}
              onKeyUp={(e) => props.onKeyUp(task.id, e)}
            ></input>
          ) : (
            <div
              className="d-flex align-items-center row"
              onMouseEnter={() => props.onMouseEnter(task.id)}
              onMouseLeave={() => props.onMouseLeave(task.id)}
            >
              <div className="me-1 col-1">
                <input
                  className="form-check-input col-1"
                  type="checkbox"
                  value={task.hasDone}
                  checked={task.hasDone}
                  aria-label="..."
                  onChange={() => props.setTaskDone(task.id)}
                ></input>
              </div>
              <div
                className="col-9 text-muted"
                onDoubleClick={() => props.alterTaskChange(task.id)}
                style={task.hasDone ? DoneStyle : DefStyle}
              >
                {task.content}
              </div>
              {task.isShow ? (
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => props.deleteTask(task.id)}
                ></button>
              ) : (
                ""
              )}
            </div>
          )}
        </li>
      ))}
    </React.Fragment>
  );
}

export default ToDoTask;
