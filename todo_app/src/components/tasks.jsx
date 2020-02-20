import React, { Component } from "react";
import "../style/tasks.css";

function Tasks(props) {
    return (
        <React.Fragment>
            <ul id="todoList">
                {props.tasks.map(task => (
                    <li
                        key={task.id}
                        className={
                            task.status == 0
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
