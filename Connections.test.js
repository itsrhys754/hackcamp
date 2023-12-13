import { render, screen } from '@testing-library/react';
import Connections from './components/Connections';

test('renders learn react link', () => {
  render(<Connections />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
