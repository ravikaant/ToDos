import React from "react";

function AddTask(props) {
    return (
        <div className="taskinput">
            <textarea id="todo" className="input" rows="5"></textarea>
            <button
                className="submit"
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
