import React, { useEffect, useState } from 'react';
import { Container, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import { fetchPosts } from './api';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <TextField
        label="Search Posts"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <List>
        {filteredPosts.map(post => (
          <ListItem key={post.id} alignItems="flex-start">
            <ListItemText
              primary={post.title}
              secondary={post.body}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
