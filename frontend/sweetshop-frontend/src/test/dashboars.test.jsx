import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

vi.mock('../api/client', () => {
  return {
    get: vi.fn((url) => {
      if (url === '/sweets') {
        return Promise.resolve({ data: [
          { id:1, name:'Ladoo', category:'Indian', price:10, quantity:0 },
          { id:2, name:'Barfi', category:'Indian', price:12, quantity:5 }
        ]})
      }
      if (url.startsWith('/sweets/search')) {
        return Promise.resolve({ data: [{ id:2, name:'Barfi', category:'Indian', price:12, quantity:5 }]})
      }
      return Promise.resolve({ data: [] })
    }),
    post: vi.fn((url) => Promise.resolve({ data: { message: 'ok' } }))
  }
})

function renderAt(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  )
}

test('renders sweets and disables purchase for out-of-stock items', async () => {
  renderAt('/')
  expect(await screen.findByText(/Ladoo/i)).toBeInTheDocument()
  const ladooPurchase = screen.getAllByRole('button', { name:/purchase/i })[0]
  expect(ladooPurchase).toBeDisabled()
})

test('search filters list', async () => {
  renderAt('/')
  const user = userEvent.setup()
  const input = await screen.findByPlaceholderText(/search by name/i)
  await user.type(input, 'Barfi')
  await user.click(screen.getByRole('button', { name:/search/i }))

  await waitFor(() => {
    expect(screen.queryByText(/Ladoo/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Barfi/i)).toBeInTheDocument()
  })
})
