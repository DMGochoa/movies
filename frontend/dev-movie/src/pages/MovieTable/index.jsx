import { useState, useEffect } from 'react';
import NewMovieDialog from './../../components/NewMovieDialog';
import Layout from './../../components/Layout'
import axios from 'axios';
import './MovieTable.css'

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/movies');
        setMovies(response.data);
      } catch (error) {
        setMovies([]);
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
    <Layout>
      <div className='table-header'>
        <h2>List of Movies</h2>
        <button onClick={handleAddNewClick}>Add New</button>
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
          {movies?.map((movie) => (
            <tr key={movie.title}>
              <td className='table-data'>{movie.title}</td>
              <td className='table-data'>{movie.releaseYear}</td>
              <td className='table-data'>{movie.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <NewMovieDialog onClose={handleDialogClose} onSave={handleSaveNewMovie} />
      )}
    </Layout>
  );
};

export default MovieTable;
