import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';
// component for app to get individual images from my cloudinary profile
// to store in supabase database and display all on authenticated user profile 
function Images() {
  const [posts, setPosts] = useState([]);

  // Fetch data from Supabase when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*'); // You can specify specific columns like ['id', 'title']

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.imgURL}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Images;
