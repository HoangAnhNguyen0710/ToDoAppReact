function ToDoInput (props){
    return (
        <form onSubmit={props.handleSubmit} >
            <div className = 'input-group'>
                <button className="input-group-text bg-white">
                    <i className=' fa fa-angle-down' onClick={props.selectAll}></i>
                </button>
                <input 
                    type="text"
                    placeholder = 'What needs to be done?'
                    className = 'form-control fs-4'
                    onChange={e => props.handleChange(e.target.value)}
                    value = {props.inputContent}
                />
            </div>
        </form>
    );
}

export default ToDoInput;