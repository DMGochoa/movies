import { useState } from 'react';
import axios from 'axios';
import './NewRatingDialog.css';

const NewRatingDialog = ({ movie, onClose, onSave }) => {
  const [rating, setRating] = useState(1);

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/movies/${movie.id}/ratings`, { value: rating });
      const updatedMovie = response.data;
      onSave(updatedMovie);
      onClose();
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  return (
    <div className="dialog-container">
      <h2 className="dialog-header">Add Rate</h2>
      <p className="dialog-movie-title">Title: {movie.title}</p>
      <div className="dialog-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ color: star <= rating ? 'gold' : 'grey' }}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <div className="dialog-actions">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NewRatingDialog;

