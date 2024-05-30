import { useState } from 'react';
import axios from 'axios';
import './NewMovieDialog.css';

const categories = ['Action', 'Drama', 'Thriller', 'Horror', 'Science Fiction'];

const NewMovieDialog = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const errors = {};

    if (!title) {
      errors.title = 'Must not be empty.';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(title)) {
      errors.title = 'Only letters, numbers, and spaces are allowed.';
    } else if (title.length > 50) {
      errors.title = 'Title must be less than 50 characters.';
    }

    if (!releaseYear) {
      errors.releaseYear = 'Must not be empty.';
    } else if (isNaN(releaseYear) || releaseYear < 1888 || releaseYear > 2024) {
      errors.releaseYear = "Must be greater than or equal to '1888' and less than or equal to '2024'.";
    }

    if (!category) {
      errors.category = 'Must not be empty.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateInputs()) {
      return;
    }

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
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
        {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Release date:</label>
        <input
          type="text"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          style={{ width: '100%' }}
        />
        {errors.releaseYear && <div style={{ color: 'red' }}>{errors.releaseYear}</div>}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%' }}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NewMovieDialog;
