import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// Mock API: success on login
vi.mock('../api/client', () => {
  const actual = vi.importActual('../api/client')
  return {
    ...actual,
    post: vi.fn((url, body) => {
      if (url.endsWith('/auth/login') && body.username && body.password) {
        return Promise.resolve({ data: { access_token: 'fake.jwt.token' } })
      }
      return Promise.reject(new Error('bad request'))
    })
  }
})

function renderApp(route = '/login') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  )
}

test('login form submits and stores token then redirects to /', async () => {
  renderApp('/login')
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/username/i), 'admin')
  await user.type(screen.getByLabelText(/password/i), 'pass123')
  await user.click(screen.getByRole('button', { name: /log in/i }))

  // Redirected to dashboard (sweets list heading visible)
  expect(await screen.findByRole('heading', { name: /sweets/i })).toBeInTheDocument()

  // token saved
  expect(localStorage.getItem('token')).toBe('fake.jwt.token')
})

test('blocks /admin when not admin (no token), shows login link', async () => {
  localStorage.removeItem('token')
  renderApp('/admin')
  expect(await screen.findByText(/please log in/i)).toBeInTheDocument()
})
