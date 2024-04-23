import { afterEach, describe, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import CreateTask from './CreateTask'
import userEvent from '@testing-library/user-event'


describe('create task', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<CreateTask />)
  })

  it('should render div container', () => {
    render(<CreateTask task={undefined} />)
    screen.getByTestId('divcontainer')
  })

  it('should write "Hello" text', async () => {
    render(<CreateTask task={undefined} />)
    const input = screen.getByTestId('divcontainer')
    await userEvent.type(input, 'Hello')
    expect(input.textContent).toBe('Hello')
  })


  it('should render  bar button when user click', async () => {
    render(<CreateTask task={undefined} />)

    let buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)
    buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(6)
  })

  it('should render button with label expecific when user click', async () => {
    render(<CreateTask task={undefined} />)

    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)

    screen.getByLabelText('Open')
    screen.getByLabelText('Today')
    screen.getByLabelText('Public')
    screen.getByLabelText('Normal')
    screen.getByLabelText('Estimation')
    // screen.getByText('Cancel')
    screen.getByLabelText('OK')

  })

  it('should render icon plus', async () => {
    render(<CreateTask task={undefined} />)
    screen.getByTestId('icon-plus')

  })

  it('should switch render between button "Ok" and "Add" when user type text', async () => {
    render(<CreateTask task={undefined} />)

    const input = screen.getByTestId('divcontainer')

    await userEvent.click(input)

    screen.getByLabelText('OK')
    const addBtn = screen.queryByLabelText('ADD')
    expect(addBtn).toBeNull

    await userEvent.type(input, 'Any text')

    screen.getByLabelText('ADD')
    const okBtn = screen.queryByLabelText('OK')
    expect(okBtn).toBeNull

  })

  it('should render buttons disabled', async () => {
    render(<CreateTask task={undefined} />)

    const buttons = [
       'Open',"Today","Public","Normal","Estimation"
    ]

    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)

    buttons.forEach((button) => {
      const btn = screen.getByLabelText(button)
      expect(btn).toBeDisabled()
    })

  })

  it('should render buttons actions and "Ok" enabled', async () => {
    render(<CreateTask task={undefined} />)

    const buttons = [
      "OK"
    ]

    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)

    buttons.forEach((button) => {
      const btn = screen.getByLabelText(button)
      expect(btn).toBeEnabled
    })

  })

  it('should blur buttons when input lost focus', async () => {
    render(<CreateTask task={undefined} />)
    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)
    let buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(6)

    await userEvent.click(document.body);

    buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)

  })







})
