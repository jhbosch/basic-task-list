import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CreateTask from './CreateTask'


describe('create task', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<CreateTask />)

  })


  it('should render input', () => {
    render(<CreateTask />)
    screen.getByRole('textbox')
  })

  it('should write in input', () => {
    render(<CreateTask />)
    const input = screen.getByRole<HTMLInputElement>('textbox')

    fireEvent.change(input, {
      target : {
        value: 'ABC'
      }
    })

    expect(input.value).toBe('ABC')
  })

})
