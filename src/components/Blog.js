import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, owner }) => {
  const [visible, setVisible] = useState(false);

  const handleLike = () => {
    updateBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
    }, blog.id);
  };

  const addedByUser = () => {
    return blog.user.username === owner;
  };

  const removeBlog = () => {
    deleteBlog(blog.id, blog.title, blog.author);
  };

  if (visible) {
    return (
      <div className="blog">
        <div>
          {blog.title} <button onClick={() => setVisible(!visible)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        {addedByUser() && (
          <div>
            <button onClick={removeBlog}>remove</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="blog">
      {blog.title} <button onClick={() => setVisible(!visible)}>view</button>
    </div>
  );
};

export default Blog;