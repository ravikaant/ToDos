import React from "react";
import { Component } from "react";

const MAX_RECORDS_PER_PAGE = 4;
class Tasks extends Component {
    handleClick = number => event => {
        this.setState({ currentPage: number });
    };

    constructor() {
        super();
        this.state = { currentPage: 1 };
    }
    componentDidUpdate(prev) {
        if (prev.view !== this.props.view) {
            this.setState({ currentPage: 1 });
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
        const indexOfLastTask = this.state.currentPage * MAX_RECORDS_PER_PAGE;
        const indexOfFirstTask = indexOfLastTask - MAX_RECORDS_PER_PAGE;
        return filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
    }

    renderTasks = tasks => {
        return (
            <ul className="tasklist" id="todoList">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={
                            task.status === "INCOMPLETE"
                                ? "task incomplete"
                                : "task complete"
                        }
                        onClick={() => this.props.toggleTask(task)}
                    >
                        <div className="todoContainer">{task.name}</div>

                        <button
                            className="delete"
                            onClick={ev => this.props.onDelete(task.id, ev)}
                        >
                            X
                        </button>
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
                        onClick={this.handleClick(number)}
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
            filteredTasks.length / MAX_RECORDS_PER_PAGE
        );

        return (
            <React.Fragment>
                {this.renderTasks(
                    this.getTasksForPage(filteredTasks, this.state.currentPage)
                )}
                {this.renderPages(totalPages)}
            </React.Fragment>
        );
    }
}

export default Tasks;
