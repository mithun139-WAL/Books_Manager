/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
/* eslint linebreak-style: ["error", "windows"] */

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
