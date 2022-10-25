import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'This is a test title',
    author: 'This is a test author',
    url: 'This is a test url',
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('This is a test title This is a test author');
  expect(element).toBeDefined();
});

test('renders only title and author by default', () => {
  const blog = {
    title: 'This is a test title',
    author: 'This is a test author',
    url: 'This is a test url',
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent(
    'This is a test title This is a test author'
  );
});