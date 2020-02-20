import React from "react";

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
            <ul className="tasklist" id="todoList">
                {displayTasks.map(task => (
                    <li
                        className="task"
                        key={task.id}
                        className={
                            task.status === "INCOMPLETE"
                                ? "task incomplete"
                                : "task complete"
                        }
                        onClick={() => props.toggleTask(task)}
                    >
                        <div className="todoContainer">{task.name}</div>

                        <button
                            className="delete"
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
