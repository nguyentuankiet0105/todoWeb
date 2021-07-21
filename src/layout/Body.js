import * as React from 'react'
import { Radio, Button, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import TodoItem from '../components/TodoItem'
import '../Style/Body.css'

const LIST_TASK = 'listTask';
const Body = () => {
    const [valueInput, setValueInput] = React.useState('');
    const [listTask, setListTask] = React.useState([]);
    const [isDone, setIsDone] = React.useState(true);
    const [indexEditing, setIndexEditing] = React.useState(null);


    React.useEffect(() => {
        console.log(LIST_TASK)
        const list = localStorage.getItem(LIST_TASK);
        if (list) {
            setListTask(JSON.parse(list));
        }
    }, []);
    React.useEffect(() => {
        localStorage.setItem(LIST_TASK, JSON.stringify(listTask));
    }, [listTask]);


    const addTask = () => {
        return setListTask([
            {
                content: valueInput,
                isDone: true,
            },
            ...listTask
        ],
            setValueInput('')
        );
    }
    const handleIsDone = () => {
        return setIsDone(false);
    }

    const handleDelete = (index) => {
        const newlist = [...listTask];
        newlist.splice(index, 1);
        setListTask(newlist);
    }
    const handleSaveTask = () => {
        if (valueInput.trim()) {
            const list = listTask;
            list.splice(indexEditing, 1,
                {
                    content: valueInput,
                    isDone: listTask[indexEditing].isDone,
                });
            localStorage.setItem(LIST_TASK, JSON.stringify(list));
            setListTask(list, setValueInput(''))
        } else {
            setIndexEditing(null)
        }
    }
    return (
        <div>
            <div>
                <Input
                    id='input'
                    placeholder={indexEditing ? listTask[indexEditing].content : 'Add new tasks in here'}
                    onChange={(e) => { setValueInput(e.target.value) }}
                    value={valueInput} />

                {indexEditing ? (
                    <>
                        <Button type="ghost" onClick={handleSaveTask}>Save</Button>
                        <Button type="dashed" onClick={() => setIndexEditing(null)}>Cancel</Button>
                    </>
                ) : <Button
                    type="primary"
                    disabled={!valueInput}
                    icon={<DownloadOutlined />}
                    onClick={addTask}
                    id='add'
                />
                }


            </div>

            {listTask.length ?
                listTask.map((item, index) => {
                    if (indexEditing === index) return null
                        return <TodoItem
                            id={index}
                            key={index}
                            content={item.content}
                            isDone={isDone}
                            handleIsDone={handleIsDone}
                            handleDelete={handleDelete}
                            handleEdit={() => setIndexEditing(index)}
                        />
                }) : (<p id='notask'>No Task</p>)
            }
            <div>
            </div>
        </div>
    )
}
export default Body