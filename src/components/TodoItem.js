import * as React from 'react'
import moment from 'moment';

import '../Style/TodoItem.css'

const TodoItem = (props, { index }) => {

    return (
        <div id='task'>
            <span id='content'>
                <h3 >{props.title}</h3>
                <h4>{props.description}</h4>
                <div className='infor'>Deadline: {moment(props.deadline).format('DD/MM/YYYY')}</div>
                <div className='infor'>Status: {props.status}</div>
            </span>
            <div id='status'>
                <button id='edit' onClick={props.handleEditStatus}>Edit</button> 
                <button id='delete' onClick={props.handleDelete}> Delete</button>
            </div>
        </div >
    );
}
export default TodoItem