import React from "react";
import "../style/AddDiv.css";

function AddTask(props) {
    return (
        <div>
            <textarea id="todo" rows="5"></textarea>
            <button
                onClick={() => {
                    props.onAdd(document.getElementById("todo").value);
                    document.getElementById("todo").value = "";
                }}
            >
                Add
            </button>
        </div>
    );
}

export default AddTask;
