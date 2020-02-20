import React from "react";
import "../style/tasks.css";

function Tasks(props) {
    let displayTasks = [];

    if (props.view === "ALL") {
        displayTasks = [...props.tasks];
    } else if (props.view === "COMPLETE") {
        displayTasks = props.tasks.filter(task => task.status === "COMPLETE");
    } else {
        displayTasks = props.tasks.filter(task => task.status === "INCOMPLETE");
    }

    return (
        <React.Fragment>
            <ul id="todoList">
                {displayTasks.map(task => (
                    <li
                        key={task.id}
                        className={
                            task.status === "INCOMPLETE"
                                ? "incompleteTodoItem"
                                : "completedTodoItem"
                        }
                        onClick={() => props.toggleTask(task)}
                    >
                        <div className="todoContainer">{task.name}</div>

                        <button
                            className="delTodo"
                            onClick={ev => props.onDelete(task.id, ev)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </React.Fragment>
    );
}

export default Tasks;
