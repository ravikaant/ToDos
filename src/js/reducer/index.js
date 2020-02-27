const initialState = {
    tasks: [
        {
            id: '1',
            name: 'Completed Task',
            status: 'COMPLETE',
        },
        {
            id: '2',
            name: 'Incomplete Task',
            status: 'INCOMPLETE',
        },
    ],
    lastIndex: 2,
    view: 'ALL'
};

function toggleTask(taskId, state) {
    const tasks = state.tasks.map(task => {
        if (task.id === taskId) {
            let status;
            if (task.status === 'COMPLETE') {
                status = 'INCOMPLETE';
            }
            else {
                status = 'COMPLETE';
            }
            return { ...task, status };
        }
        return task;
    })
    state = { ...state, tasks };
    return state;
}
function addTask(task, state) {
    if (task === '') {
        alert('Empty Task');
        return;
    }
    const lastIndex = state.lastIndex + 1;
    const tasks = [...state.tasks, {
        id: "" + lastIndex,
        name: task,
        status: TodoStatus.INCOMPLETE,
    }];
    state = { ...state, tasks, lastIndex };
    return state;
}

function deleteTask(taskId, state) {
    const tasks = state.tasks.filter(task => task.id !== taskId);
    state = { ...state, tasks };
    return state;
}
const TodoStatus = {
    ALL: "ALL",
    COMPLETE: "COMPLETE",
    INCOMPLETE: "INCOMPLETE"
}
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE':
            state = { ...toggleTask(action.payload, state) };
            return state;

        case 'ADD':
            state = { ...addTask(action.payload, state) };
            return state;;

        case 'DELETE':
            state = { ...deleteTask(action.payload, state) };
            return state;;

        case 'FILTER':
            switch (action.payload) {
                case TodoStatus.ALL:
                    state = { ...state, view: TodoStatus.ALL };
                    return state;;

                case TodoStatus.INCOMPLETE:
                    state = { ...state, view: TodoStatus.INCOMPLETE };
                    return state;;
                case TodoStatus.COMPLETE:
                    state = { ...state, view: TodoStatus.COMPLETE };
                    return state;;
                default:
                    return state;
            }
        default:
            return state;
    }
}

export default reducer;