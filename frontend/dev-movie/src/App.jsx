//import { useState } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  return (
    <>
      <div>
        <nav className='navbar-container'>
          <h1>Media Hub</h1>
        </nav>
        <div className='content-container'>
          <MovieList />
        </div>
      </div>
    </>
  )
}



const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Fetching movies...');
        const response = await axios.get('http://localhost:3000/api/movies');
        console.log('Movies:', response.data);
        setMovies(response.data.body);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleAddNewClick = () => {
    console.log('Add new movie clicked');
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSaveNewMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>List of Movies</h2>
        <button href="" onClick={handleAddNewClick}>Add New</button>
      </div>
      <table className='table-movies'>
        <thead>
          <tr>
            <th className='table-title'>Title</th>
            <th className='table-title'>Release Date</th>
            <th className='table-title'>Category</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie.releaseYear}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{movie.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <AddNewMovieDialog onClose={handleDialogClose} onSave={handleSaveNewMovie} />
      )}
    </>
  );
};

const AddNewMovieDialog = ({ onClose, onSave }) => {
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

export default App
