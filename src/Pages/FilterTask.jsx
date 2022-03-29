import ToDoTask from "../Components/ToDoTask";

function FilterTask(props){
    return(
        <ToDoTask 
        tasks = {props.tasks}
        alterTaskChange = {props.alterTaskChange}
        deleteTask = {props.deleteTask}
        setTaskDone = {props.setTaskDone}
        onTaskChange = {props.onTaskChange}
        onKeyUp = {props.onKeyUp}
        onMouseEnter = {props.onMouseEnter}
        onMouseLeave = {props.onMouseLeave}
        />
    );
}

export default FilterTask;