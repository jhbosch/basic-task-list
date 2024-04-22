import { afterEach, describe, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import App from './App'



describe('App', () => {
  afterEach(cleanup)

  it('should render component', () => {
    render(<App />)
  })

})
