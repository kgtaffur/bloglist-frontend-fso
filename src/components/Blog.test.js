import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

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
  expect(div).not.toHaveTextContent(
    'This is a test url'
  );
});

test('url and likes are shown when view button has been clicked', async () => {
  const blog = {
    title: 'This is a test title',
    author: 'This is a test author',
    url: 'This is a test url',
    likes: 0,
    user: 'Test user',
  };

  const mockHandler = jest.fn();

  const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />);

  const button = screen.getByText('view');
  await userEvent.click(button);

  const div = container.querySelector('.blog');
  expect(div).toHaveTextContent(
    'This is a test title hideThis is a test urllikes 0 likeThis is a test authorremove'
  );
});