import { render, screen } from '@testing-library/react';
import { Hello } from '../../components/Hello';

test('renders hello message', () => {
  render(<Hello />);
  const element = screen.getByText(/hello, world!/i);
  expect(element).toBeInTheDocument();
});
