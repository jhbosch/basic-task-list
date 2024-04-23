import { SetStateAction, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import './CreateTask.css'
import checkIfExistLastPattern from "../../util/checkIfExistLastPattern"
import processTest from "../../util/processText"
import FeatherIcon from "feather-icons-react"
import { ButtonActionResponseDelete, ButtonActionResponsePrimary, ButtonIconResponse } from "../Button/Button"
import { IButtonAction, IButtonIcon, ITask } from "../../util/interface"
import Avatar from "@mui/material/Avatar"


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


const isDisabled = (val: string) => val === ''|| val === '<br>'


const CreateTask = ({task} : {task : ITask | undefined}) => {
  const [showButtonBar, setShowButtonBar] = useState(false)
  const [originValue, setOriginValue] = useState('')
  const [htmlValue, setHtmlValue] = useState('')
  const [taskInicial] = useState(task)

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
    setOriginValue('')
    setHtmlValue('')

  }

  const ShowActionBton = () => {
    return (
      <div className="container-task-add-button-bar-right">
        <ButtonActionResponseDelete title="Cancel" icon="trash-2" onClick={handleCancel} disabled={isDisabled(originValue)}/>
        <ButtonActionResponsePrimary {...getButtonActionState()} />
      </div>
    )
  }

  const handleFocus = () => {
    setShowButtonBar(true)
  }

  const getButtonActionState = () : IButtonAction => {
    if(isNew()) return {title: "ADD", icon: "plus", onClick: () => {} }
    if(isEditing()) return {title: "Save", icon: "save", onClick: () => {} }

    return {title: "OK", icon:"x", onClick: () => {} }
  }

  const isEditing = () => {
    return taskInicial && taskInicial.value != originValue
  }

  const isNew = () => {
    return !taskInicial && originValue !== '' && originValue !== '<br>'
  }

  const handleChange = (evt: { target: { value: SetStateAction<string> } }) => {
    const value = evt.target.value.toString()
    let newValue = value;
    if (value.endsWith(" <br>") || value.endsWith(" ")) {
      const pattern = checkIfExistLastPattern(value)
      const processed = processTest(pattern)
      newValue = value.replace(pattern, processed)
    }
    setHtmlValue(newValue)
    setOriginValue(newValue)

  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement> | undefined) => {
    const element =  event?.nativeEvent.explicitOriginalTarget;

    if(event && wrapperRef.current && !wrapperRef.current.contains(element) ) {
      handleCancel()
    }
  }


  return (
    <div ref={wrapperRef} className="container-task">
      <div className="container-task-add">
        <div className="container-task-add-icon-plus" onClick={() => inputRef.current && inputRef.current.focus() } data-testid="icon-plus" >
          <FeatherIcon icon="plus-square" />
        </div>
        <ContentEditable
          innerRef={inputRef}
          html={htmlValue} // innerHTML of the editable div
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
