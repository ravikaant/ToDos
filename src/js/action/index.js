export function addTask(task) {
    return { type: 'ADD', payload: task }
}

export function deleteTask(taskId) {
    return { type: 'DELETE', payload: taskId }
}

export function toggleTaskStatus(taskId) {
    return { type: "TOGGLE", payload: taskId }
}

export function changeFilter(filter) {
    return { type: 'FILTER', payload: filter }
}
