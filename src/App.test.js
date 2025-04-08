import { render, screen } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  expect(screen.getByText(/learn react/i)).toBeInTheDocument();
});
