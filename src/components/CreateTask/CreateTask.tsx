import { SetStateAction, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import './CreateTask.css'
import checkIfExistLastPattern from "../../util/checkIfExistLastPattern"
import processTest from "../../util/processText"
import FeatherIcon from "feather-icons-react"
import { ButtonActionResponseDelete, ButtonActionResponsePrimary, ButtonIconResponse } from "../Button/Button"
import { IButtonAction, IButtonIcon, ICreateTaskProps, ITask } from "../../util/interface"
import Avatar from "@mui/material/Avatar"
import Checkbox from "@mui/material/Checkbox"


const buttonsBar: IButtonIcon[] = [
  {
    title: "Open",
    icon: "maximize-2"
  },
  {
    title: "Today",
    icon: "calendar"
  },
  {
    title: "Public",
    icon: "unlock"
  },
  {
    title: "Normal",
    icon: "sun"
  },
  {
    title: "Estimation",
    icon: "disc"
  },
]


const CreateTask = ({task, createTask} : ICreateTaskProps) => {
  const [showButtonBar, setShowButtonBar] = useState(false)
  const [originValue, setOriginValue] = useState(task ? task.description : '')
  const [taskInicial] = useState(task)

  const placeHolder: string = '<span contenteditable="false" class="custom-place-holder">Type to add new task</span>'

  const inputRef: React.RefObject<HTMLDivElement> = useRef(null)
  const wrapperRef: React.RefObject<HTMLDivElement>  = useRef(null);

  const ButtonBar = () => {
    return (
      <div className="container-task-add-button-bar-left">
      {
        buttonsBar.map(btn =>
          <ButtonIconResponse key={btn.title} data={btn} disabled={isDisabled(originValue)}/>
        )
      }
      </div>
    )
  }

  const handleCancel = () => {
    setShowButtonBar(false)
  }

  const ShowActionBton = () => {
    return (
      <div className="container-task-add-button-bar-right">
        <ButtonActionResponseDelete title="Cancel" icon="trash-2" onClick={handleCancel} disabled={isEmpty()}/>
        <ButtonActionResponsePrimary {...getButtonActionState()} />
      </div>
    )
  }

  const handleFocus = () => {
    setShowButtonBar(true)
  }

  const handleCreate = () => {
    const newTask: ITask = {
      description: originValue,
    }
    console.log(newTask)
    if(createTask) {
      createTask(newTask)
      handleCancel()
      setOriginValue('')
    }
  }

  const getButtonActionState = () : IButtonAction => {
    if(isNew() && !isEmpty()) return {title: "ADD", icon: "plus", onClick: handleCreate }
    if(isEditing() && !isEmpty()) return {title: "Save", icon: "save", onClick: () => {} }

    return {title: "OK", icon:"x", onClick: () => {handleCancel} }
  }

  const isDisabled = (val: string) => val === ''|| val === '<br>'

  const isEditing = () => {
    return taskInicial && taskInicial.description != originValue
  }

  const isNew = () => {
    return !taskInicial
  }

  const isEmpty = () => {
    return originValue === '' || originValue === '<br>'
  }

  const handleChange = (evt: { target: { value: SetStateAction<string> } }) => {
    const value = evt.target.value.toString()
    let newValue = value;
    if (value.endsWith(" <br>") || value.endsWith(" ") || value.endsWith("&nbsp;")) {
      const pattern = checkIfExistLastPattern(value)
      const processed = processTest(pattern)
      newValue = value.replace(pattern, processed)
    }
    setOriginValue(newValue)

  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement> | undefined) => {
    const  element  =  (event?.nativeEvent as FocusEvent & {
      explicitOriginalTarget: HTMLElement
    }).explicitOriginalTarget
    if(event && wrapperRef.current && !wrapperRef.current.contains(element) ) {
      handleCancel()
    }
  }

  const handleShowValue = () => {
    if((!showButtonBar && isNew())) {
      return placeHolder;
    }

    if(!showButtonBar && task) {
      return task.description;
    }

    return originValue
  }


  return (
    <div ref={wrapperRef} className={showButtonBar ? "container-task active" : "container-task"}>
      <div className="container-task-add">
        <div className="container-task-add-icon-plus" onClick={() => inputRef.current && inputRef.current.focus() } data-testid="icon-plus" >
          { isNew() ? <FeatherIcon icon="plus-square" /> : <FeatherIcon icon="square" />}
        </div>
        <ContentEditable
          innerRef={inputRef}
          html={handleShowValue()} // innerHTML of the editable div
          disabled={false} // use true to disable edition
          onChange={handleChange} // handle innerHTML change
          onFocus={handleFocus}
          data-testid="divcontainer"
          className="container-task-add-tag"
          onBlur={handleBlur}
        />
        <div className={showButtonBar ?  "container-task-add-avatar" : "disabled "}>
          <Avatar
            alt="avatar"
            src="https://unavatar.io/github/jhbosch"
            sx={{ width: 24, height: 24 }}
          />
        </div>
      </div>
      <div className={showButtonBar ? "container-task-add-button-bar" : ""}>
        {showButtonBar && <ButtonBar /> }
        {showButtonBar && <ShowActionBton /> }
      </div>
    </div>
  )

}


export default CreateTask
