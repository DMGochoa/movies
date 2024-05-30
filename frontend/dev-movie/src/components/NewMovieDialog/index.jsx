import { useState } from 'react';
import axios from 'axios';
import './NewMovieDialog.css'

const NewMovieDialog = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = async () => {
      try {
          const newMovie = { title, releaseYear, category };
          await axios.post('http://localhost:3000/api/movies', newMovie);
          onSave(newMovie);
          onClose();
      } catch (error) {
          console.error('Error adding new movie:', error);
      }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', width: '300px', margin: '20px auto' }}>
      <h2>Add New Movie</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Release date:</label>
        <input type="text" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NewMovieDialog
