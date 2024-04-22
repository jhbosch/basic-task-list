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
    render(<CreateTask />)
    screen.getByTestId('divcontainer')
  })

  it('should write "Hello" text', async () => {
    render(<CreateTask />)
    const input = screen.getByTestId('divcontainer')
    await userEvent.type(input, 'Hello')
    expect(input.textContent).toBe('Hello')
  })


  it('should render  bar button when user click', async () => {
    render(<CreateTask />)
    let buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)
    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)
    buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(7)
  })

  it('should render button with label expecific when user click', async () => {
    render(<CreateTask />)

    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)

    screen.getByText('Open')
    screen.getByText('Today')
    screen.getByText('Public')
    screen.getByText('Normal')
    screen.getByText('Estimation')
    screen.getByText('Cancel')
    screen.getByText('Ok')

  })

  it('should render icon plus', async () => {
    render(<CreateTask />)
    screen.getByTestId('icon-plus')

  })

  it('should switch render between button "Ok" and "Add" when user type text', async () => {
    render(<CreateTask />)

    const input = screen.getByTestId('divcontainer')

    await userEvent.click(input)

    screen.getByText('Ok')
    const addBtn = screen.queryByText('Add')
    expect(addBtn).toBeNull

    await userEvent.type(input, 'Any text')

    screen.getByText('Add')
    const okBtn = screen.queryByText('Ok')
    expect(okBtn).toBeNull

  })

  it('should render buttons disabled', async () => {
    render(<CreateTask />)

    const buttons = [
       'Open',"Today","Public","Normal","Estimation"
    ]

    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)

    buttons.forEach((button) => {
      const btn = screen.getByText(button)
      expect(btn).toBeDisabled()
    })

  })

  it('should render buttons actions "Cancel" and "Ok" enabled', async () => {
    render(<CreateTask />)

    const buttons = [
       "Cancel","Ok"
    ]

    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)

    buttons.forEach((button) => {
      const btn = screen.getByText(button)
      expect(btn).toBeEnabled
    })

  })

  it('should blur buttons when input lost focus', async () => {
    render(<CreateTask />)
    const input = screen.getByTestId('divcontainer')
    await userEvent.click(input)
    let buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(7)

    await userEvent.click(document.body);

    buttons = screen.queryAllByRole('button')
    expect(buttons).toHaveLength(0)

  })







})
