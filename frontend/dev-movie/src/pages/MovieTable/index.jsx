import { useState, useEffect } from 'react';
import NewMovieDialog from './../../components/NewMovieDialog';
import NewRatingDialog from './../../components/NewRatingDialog';
import Layout from './../../components/Layout';
import axios from 'axios';
import './MovieTable.css';

const MovieTable = () => {
  const [movies, setMovies] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleSaveNewMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const handleRateClick = (movie) => {
    setSelectedMovie(movie);
    setShowRatingDialog(true);
  };

  const handleRatingDialogClose = () => {
    setShowRatingDialog(false);
    setSelectedMovie(null);
  };

  const handleSaveRating = (updatedMovie) => {
    const updatedMovies = movies.map((movie) =>
      movie.title === updatedMovie.title ? updatedMovie : movie
    );
    setMovies(updatedMovies);
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
            <th className='table-title'>Rate Average</th>
            <th className='table-title'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.title}>
              <td className='table-data'>{movie.title}</td>
              <td className='table-data'>{movie.releaseYear}</td>
              <td className='table-data'>{movie.category}</td>
              <td className='table-data'>{movie.rateAverage.toFixed(1)} ({movie.voteCount})</td>
              <td className='table-data'>
                <button onClick={() => handleRateClick(movie)}>Add Rate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <NewMovieDialog onClose={handleDialogClose} onSave={handleSaveNewMovie} />
      )}
      {showRatingDialog && selectedMovie && (
        <NewRatingDialog
          movie={selectedMovie}
          onClose={handleRatingDialogClose}
          onSave={handleSaveRating}
        />
      )}
    </Layout>
  );
};

export default MovieTable;

