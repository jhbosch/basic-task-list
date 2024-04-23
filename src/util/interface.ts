

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
  value: string,
  id: number
}
