

export interface IButtonIcon {
  title: string,
  icon: string
}

export interface IButtonAction {
  title: string,
  onClick: () => void,
  disabled?: boolean,
  icon: string,
}

export interface ITask {
  description: string,
  id?: number
}

export interface TaskResponse {
    message: string;
    data:    Data;
    errors:  null;
}

export interface Data {
    tasks: ITask[];
}

export interface ICreateTaskProps {
  task? : ITask | undefined;
  createTask?: (task: ITask) => void;
}
