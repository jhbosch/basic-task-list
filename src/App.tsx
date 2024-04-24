import { useEffect, useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask/CreateTask'
import { ITask, TaskResponse } from './util/interface'
import { api } from './util/api';


function App() {
  const [tasks, setTask] = useState<ITask[]>([]);

  const loadTasks = () => {
    api.get<TaskResponse>("/tasks").then((response) => {
      if(response.data.message != undefined && response.data.message == "task_search_all_success") {
        const tasksResponse = response.data.data;
        setTask(tasksResponse.tasks);
      }
    });
  }

  const createTask = (newTask : ITask) => {
    api.post<TaskResponse>("/tasks", newTask).then((response) => {
      if(response.data.message != undefined && response.data.message == "task_create_success") {
        loadTasks();
      }
    });
  }

  useEffect(()=>{
    loadTasks();
  },[])


  return (
    <div className='content'>
      <CreateTask createTask={createTask} />
      {
        tasks.map(task =>
          <CreateTask
            key={task.id}
            task={task}
            createTask={createTask}
          />
        )
      }
    </div>
  )
}

export default App
