import React from 'react'
import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
import App from '../App'

test('renders app header', () => {
  render(<App />)
  expect(screen.getByText(/Rozgar Radar — Skill Salary Map/i)).toBeInTheDocument()
})
