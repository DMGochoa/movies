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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalMovies, setTotalMovies] = useState(0);
  const [expandedMovie, setExpandedMovie] = useState(null);

  useEffect(() => {
    fetchMovies(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchMovies = async (page, rowsPerPage) => {
    try {
      const totalMovies = (await axios.get('http://localhost:3000/api/movies/all')).data.length;
      const offset = (page - 1) * rowsPerPage;
      const response = await axios.get(`http://localhost:3000/api/movies?limit=${rowsPerPage}&offset=${offset}`);
      console.log(response.data);
      setMovies(response.data, rowsPerPage, offset);
      setTotalMovies(totalMovies);
    } catch (error) {
      setMovies([]);
    }
  };

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

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleExpandClick = (movie) => {
    setExpandedMovie(expandedMovie === movie.title ? null : movie.title);
  };

  return (
    <Layout>
      <div className='table-header'>
        <h2>List of Movies</h2>
        <button onClick={handleAddNewClick}>Add New</button>
      </div>
      <div className='table-container'>
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
                <td className='table-data'>
                  <div className="rating">
                    <span>★</span> {movie.rateAverage} ({movie.voteCount})
                  </div>
                </td>
                <td className='table-data'>
                  <div className="actions">
                    <button onClick={() => handleRateClick(movie)}>Rate</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <label>
            Rows per page:
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {[10, 20, 30].map((rows) => (
                <option key={rows} value={rows}>
                  {rows}
                </option>
              ))}
            </select>
          </label>
          <div className='pagination-controls'>
            <button onClick={(e) => handlePageChange(e, Math.max(page - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span>
              {page} of {Math.ceil(totalMovies / rowsPerPage)}
            </span>
            <button onClick={(e) => handlePageChange(e, Math.min(page + 1, Math.ceil(totalMovies / rowsPerPage)))} disabled={page === Math.ceil(totalMovies / rowsPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className='mobile-list'>
        {movies.map((movie) => (
          <div key={movie.title} className='mobile-list-item'>
            <div className='mobile-list-header' onClick={() => handleExpandClick(movie)}>
              <span>{movie.title}</span>
              <span>{expandedMovie === movie.title ? '-' : '+'}</span>
            </div>
            {expandedMovie === movie.title && (
              <div className='mobile-list-content'>
                <p>Year: {movie.releaseYear}</p>
                <p>Category: {movie.category}</p>
                <p>
                  Rate Average:
                  <span className="rating">
                    <span>★</span> {movie.rateAverage} ({movie.voteCount})
                  </span>
                </p>
                <button onClick={() => handleRateClick(movie)}>Rate</button>
              </div>
            )}
          </div>
        ))}
      </div>
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
