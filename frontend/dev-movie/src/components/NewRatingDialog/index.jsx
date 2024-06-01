import { useState } from 'react';
import axios from 'axios';
import './NewRatingDialog.css';

const NewRatingDialog = ({ movie, onClose, onSave }) => {
  const [rating, setRating] = useState(1);

  const handleSave = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/movies/${movie.id}/rate`, { rating });
      const updatedMovie = response.data;
      onSave(updatedMovie);
      onClose();
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  return (
    <div className="dialog-container">
      <div className="dialog-content">
        <h2 className="dialog-header">Add Rate</h2>
        <button className="dialog-close" onClick={onClose}>X</button>
        <div className="dialog-body">
          <p>Title: {movie.title}</p>
          <div className="dialog-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="dialog-actions">
          <button className="dialog-cancel" onClick={onClose}>Cancel</button>
          <button className="dialog-save" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NewRatingDialog;
