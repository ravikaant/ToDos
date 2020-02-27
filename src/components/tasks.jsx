import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { addTask, deleteTask, toggleTaskStatus } from "../js/action/index.js";
//import Confirmation from "./confirmation";

function mapStateToProps(state) {
    return { tasks: state.tasks, view: state.view };
}
function mapDispatchToProps(dispatch) {
    return {
        addTask: task => dispatch(addTask(task)),
        deleteTask: task => dispatch(deleteTask(task)),
        toggleTaskStatus: task => dispatch(toggleTaskStatus(task))
    };
}

class Tasks extends Component {
    selectRef = React.createRef();

    handlePageClick = number => event => {
        this.setState({ currentPage: number });
    };

    constructor() {
        super();
        this.state = {
            currentPage: 1,
            MAX_RECORDS_PER_PAGE: 4
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.view !== this.props.view ||
            prevState.MAX_RECORDS_PER_PAGE !==
                this.state.MAX_RECORDS_PER_PAGE ||
            (prevProps.tasks.length === 0 && this.props.tasks.length !== 0)
        ) {
            this.setState({ currentPage: 1 });
        } else if (
            this.props.tasks.length <=
            (this.state.currentPage - 1) * this.state.MAX_RECORDS_PER_PAGE
        ) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    }

    getFilteredTasks() {
        switch (this.props.view) {
            case "COMPLETE":
                return this.props.tasks.filter(v => v.status === "COMPLETE");
            case "INCOMPLETE":
                return this.props.tasks.filter(v => v.status === "INCOMPLETE");
            default:
                return this.props.tasks;
        }
    }

    getTasksForPage(filteredTasks, pagno) {
        const indexOfLastTask =
            this.state.currentPage * this.state.MAX_RECORDS_PER_PAGE;
        const indexOfFirstTask =
            indexOfLastTask - this.state.MAX_RECORDS_PER_PAGE;
        return filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    }

    renderTasks = tasks => {
        return (
            <ul className="tasklist" id="todoList">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={
                            task.status === "INCOMPLETE" && this.state
                                ? "task incomplete"
                                : "task complete"
                        }
                    >
                        <div className="todoContainer">{task.name}</div>
                        <div className="taskOptions">
                            <button
                                className="toggleStatus"
                                onClick={ev => {
                                    ev.stopPropagation();
                                    this.props.toggleTaskStatus(task.id);
                                }}
                            >
                                {task.status === "INCOMPLETE"
                                    ? "Done"
                                    : "Not Done"}
                            </button>
                            <button
                                className="delete"
                                onClick={ev => {
                                    ev.stopPropagation();
                                    window.confirm("Do you want to delete") &&
                                        this.props.deleteTask(task.id);
                                }}
                            >
                                X
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    renderPages = totalPages => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className="page-numbers">
                <li
                    className={
                        this.state.currentPage === 1
                            ? "disabled pages"
                            : "pages"
                    }
                    onClick={ev => {
                        ev.target.className !== "disabled pages" &&
                            this.setState({
                                currentPage: this.state.currentPage - 1
                            });
                    }}
                >
                    Prev
                </li>
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        id={number}
                        className={
                            number === this.state.currentPage
                                ? "pages active"
                                : "pages"
                        }
                        onClick={this.handlePageClick(number)}
                    >
                        {number}
                    </li>
                ))}
                <li
                    className={
                        this.state.currentPage === totalPages ||
                        this.getFilteredTasks().length === 0
                            ? "disabled pages"
                            : "pages"
                    }
                    onClick={ev => {
                        ev.target.className !== "disabled pages" &&
                            this.setState({
                                currentPage: this.state.currentPage + 1
                            });
                    }}
                >
                    Next
                </li>
            </ul>
        );
    };

    render() {
        const filteredTasks = this.getFilteredTasks();
        const totalPages = Math.ceil(
            filteredTasks.length / this.state.MAX_RECORDS_PER_PAGE
        );
        let dropDownItems = [];
        for (let i = 4; i <= 12; i++) {
            dropDownItems.push(i);
        }
        return (
            <React.Fragment>
                <h3>{"Tasks to display per page"}</h3>
                <select
                    name="dropDown"
                    id="dropDown"
                    ref={this.selectRef}
                    value={this.state.MAX_RECORDS_PER_PAGE}
                    onChange={e => {
                        this.setState({
                            MAX_RECORDS_PER_PAGE: e.target.value
                        });
                    }}
                >
                    {dropDownItems.map(item => {
                        return (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        );
                    })}
                </select>

                {this.renderPages(totalPages)}
                {this.renderTasks(
                    this.getTasksForPage(filteredTasks, this.state.currentPage)
                )}
            </React.Fragment>
        );
    }
}

const TaskPage = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default TaskPage;

/* 
confirmationCutDialog = ev => {
    console.log("called1");
    this.setState({ showConfirmation: "cut" });
    this.state.showConfirmation === "cut"
        ? this.setState({ showConfirmation: "0" })
        : this.setState({ showConfirmation: "cut" });
    ev.stopPropagation();
};

<button
    className="delete"
    onClick={ev => {
        
            this.confirmationCutDialog(ev);
        }}
    >
        X
    </button>
    {this.state.showConfirmation === "cut" && (
        <Confirmation
            message={"delete it?"}
            task={task.id}
            action={this.props.onDelete}
        />
    )}

 */
