import * as React from 'react';
import { Radio, Button, Input, Form, DatePicker, PageHeader, Breadcrumb } from 'antd';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
import moment from 'moment';

import TodoItem from '../components/TodoItem';
import '../Style/Body.css';

const LIST_TASK = 'listTask';

const ROUTES = [
  {
    path: '/new',
    breadcrumbName: 'NEW',
  },
  {
    path: '/inprogress',
    breadcrumbName: 'INPROGRESS',
  },
  {
    path: '/done',
    breadcrumbName: 'DONE',
  },
];

const Body = () => {
  const [form] = Form.useForm();
  const [titleInput, setTitleInput] = React.useState('');
  const [descriptionInput, setDescriptionInput] = React.useState('');
  const [deadline, setDeadline] = React.useState(new Date());
  // const [formValue, setFormValue] = React.useState({
  //   title: ' ',
  //   description: ' ',
  //   deadline: new Date(),
  // });
  const [listTask, setListTask] = React.useState([]);
  const [indexEditing, setIndexEditing] = React.useState(null);

  React.useEffect(() => {
    console.log(LIST_TASK);
    const list = localStorage.getItem(LIST_TASK);
    if (list) {
      setListTask(JSON.parse(list));
    }
  }, []);
  React.useEffect(() => {
    localStorage.setItem(LIST_TASK, JSON.stringify(listTask));
  }, [listTask]);

  const addTask = () => {
    return setListTask(
      [
        {
          title: titleInput,
          description: descriptionInput,
          deadline: deadline,
          status: 'new',
        },
        ...listTask,
      ],
      setTitleInput(''),
      setDescriptionInput(''),

    );
  };

  const handleSaveTask = () => {
    if (listTask.trim()) {
      const list = [
        ...listTask,
        {
          title: titleInput,
          description: descriptionInput,
          deadline: deadline,
          status: 'new',
        },
      ];
      localStorage.setItem(LIST_TASK, JSON.stringify(list));
      setListTask(list);
    } else {
      setIndexEditing(null);
    }
  };

  const handleEditStatus = (index) => {
    const list = listTask;
    list.splice(index, 1, {
      ...list[index],
      status: list[index].status === 'new' ? 'inprogress' : 'done',
    });
    localStorage.setItem(LIST_TASK, JSON.stringify(list));
    setListTask([...list]);
  };

  const itemRender = (route) => {
    return <Link to={route.path}>{route.breadcrumbName}</Link>;
  };

  const renderByStatus = (status) => {
    return listTask.map((item, index) => {
      if (item.status !== status) return null;
      return (
        <TodoItem
          key={index}
          {...item}
          handleEditStatus={() => handleEditStatus(index)}
          handleDelete={() => {
            const isDelete = window.confirm('Bạn có muốn xóa task này không ?');
            if (isDelete) {
              const list = listTask;
              list.splice(index, 1);
              localStorage.setItem(LIST_TASK, JSON.stringify(list));
              setListTask([...list]);
            }
          }}
        />
      );
    });
  };
  return (
    <div>
      <Breadcrumb itemRender={itemRender} routes={ROUTES} />

      <Form layout={'vertical'} form={form} onValuesChange={(e) => console.log(e)}>
        <Form.Item label="Title">
          <Input
            name="title"
            id="input"
            placeholder={
              indexEditing ? listTask[indexEditing].title : 'Add title new tasks in here'
            }
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
            value={titleInput}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="description"
            id="input"
            placeholder={
              indexEditing ? listTask[indexEditing].title : '(Option) Add description tasks in here'
            }
            onChange={(e) => {
              setDescriptionInput(e.target.value);
            }}
            value={descriptionInput}
          />
        </Form.Item>
        <Form.Item label="Deadline">
          <DatePicker
            value={moment(deadline, 'DD/MM/YYYY')}
            format={'DD/MM/YYYY'}
            onChange={(date) => {
              setDeadline(date);
              console.log('date', date);
            }}
            disabledDate={(current) => current && current < moment().endOf('day')}
          />
        </Form.Item>
        <Form.Item>
          {indexEditing ? (
            <>
              <Button type="ghost" onClick={handleSaveTask}>
                Save
              </Button>
              <Button type="dashed" onClick={() => setIndexEditing(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              disabled={!titleInput}
              icon={<DownloadOutlined />}
              onClick={addTask}
              id="add"
            />
          )}
        </Form.Item>
      </Form>
      <Switch>
        <Route path="/new">{renderByStatus('new')}</Route>
        <Route path="/inprogress">{renderByStatus('inprogress')}</Route>
        <Route path="/done">{renderByStatus('done')}</Route>
      </Switch>
    </div> 
  );
};
export default Body;
