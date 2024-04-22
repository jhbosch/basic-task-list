import { SetStateAction, useRef, useState } from "react"
import ContentEditable from "react-contenteditable"
import './CreateTask.css'
import checkIfExistLastPattern from "../../util/checkIfExistLastPattern"
import processTest from "../../util/processText"

const buttons = [
  {
    title: "Open"
  },
  {
    title: "Today"
  },
  {
    title: "Public"
  },
  {
    title: "Normal"
  },
  {
    title: "Estimation"
  },
]


const CreateTask = () => {
  const [showButtonBar, setShowButtonBar] = useState(false)
  const [originValue, setOriginValue] = useState('')
  const [htmlValue, setHtmlValue] = useState('')

  const inputRef: React.RefObject<HTMLDivElement> = useRef(null)

  const buttonBar = () => {
    return buttons.map(btn => <button key={btn.title} disabled={originValue === ''|| originValue === '<br>'}>{btn.title}</button>)
  }

  const showActionBton = () => {
    return (
      <>
        <button>Cancel</button>
        {
          originValue === '' || originValue === '<br>'
            ? <button>Ok</button>
            : <button>Add</button>
        }
      </>
    )
  }

  const handleFocus = () => {
    setShowButtonBar(true)
  }

  const onBlur = () => {
    setShowButtonBar(false)
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


  return (
    <div>
      <div>
        <div onClick={() => inputRef.current && inputRef.current.focus() } data-testid="icon-plus" >

        </div>
        <ContentEditable
          innerRef={inputRef}
          html={htmlValue} // innerHTML of the editable div
          disabled={false} // use true to disable edition
          onChange={handleChange} // handle innerHTML change
          onFocus={handleFocus}
          data-testid="divcontainer"
          onBlur={onBlur}
          className="container-tag"
        />
        <div className="avatar">
          <img />
        </div>
      </div>

      <div>
        {showButtonBar && buttonBar() }
        {showButtonBar && showActionBton() }
      </div>
    </div>
  )

}


export default CreateTask
