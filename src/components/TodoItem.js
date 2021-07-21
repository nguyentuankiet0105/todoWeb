import * as React from 'react'
import '../Style/TodoItem.css'

const TodoItem = (props, { index }) => {

    return (
        <div id='task'>
            <p id='content'>{props.content}</p>

            <span id='status'>
                <button id='edit' onClick={props.handleEdit}>Edit</button> 
                {props.isDone ? <button id='isDone' onClick={props.handleIsDone} >isDone</button> : null}
                <button id='delete' onClick={() => {
                    const isDelete = window.confirm('Bạn có muốn xóa task này không ???');
                    if (isDelete) {
                        // alert('Bạn đã xóa task thành công.');
                        return (props.handleDelete(index));
                    }
                }}> Delete</button>


            </span>
        </div >
    );
}
export default TodoItem