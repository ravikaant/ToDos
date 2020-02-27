import React from "react";
import { connect } from "react-redux";
import { addTask } from "../js/action/index";

function mapDispatchToProps(dispatch) {
    return { addTask: task => dispatch(addTask(task)) };
}

function AddTask(props) {
    const myRef = React.createRef();
    return (
        <div className="taskinput">
            <textarea
                id="todo"
                className="input"
                rows="5"
                ref={myRef}
            ></textarea>
            <button
                className="submit"
                onClick={() => {
                    props.addTask(myRef.current.value);
                    myRef.current.value = "";
                }}
            >
                Add
            </button>
        </div>
    );
}

const AddTaskPage = connect(null, mapDispatchToProps)(AddTask);

export default AddTaskPage;
