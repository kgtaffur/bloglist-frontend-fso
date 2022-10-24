import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

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
          {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.likes}
        </div>
      </div>
    )
  }

  return (
    <div className="blog">
      {blog.title} <button onClick={() => setVisible(!visible)}>view</button>
    </div>
  );
};

export default Blog;