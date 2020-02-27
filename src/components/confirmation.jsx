import React, { Component } from "react";

class ConfirmationBox extends Component {
    constructor() {
        super();
        this.state = { show: true };
    }
    render() {
        return (
            this.state.show === true && (
                <div className="confirmContainer">
                    <div className="confirmBox">
                        <h1>Do you really want to {this.props.message}</h1>
                        <button
                            onClick={() => {
                                this.props.action(this.props.task);
                                this.setState({ show: false });
                            }}
                        >
                            Yes
                        </button>
                        <button onClick={() => this.setState({ show: false })}>
                            No
                        </button>
                    </div>
                </div>
            )
        );
    }
}

export default ConfirmationBox;
