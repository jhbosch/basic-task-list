import { afterEach, describe, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import CreateTask from './CreateTask'
import userEvent from '@testing-library/user-event'


describe('create task', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<CreateTask />)
  })

  it('should render input', () => {
    render(<CreateTask />)
    screen.getByRole('textbox')
  })

  it('should write "Hello" text', async () => {
    render(<CreateTask />)
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'Hello')
    expect(input).toHaveValue('Hello')
  })

})
