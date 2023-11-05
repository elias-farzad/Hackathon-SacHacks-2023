// CommentFormPage.js
import React, { useState, useEffect, useMemo } from 'react';
import { submitComment } from './front-back-end-link';
import './CommentFormPage.css';

const CommentFormPage = () => {
const [comment, setComment] = useState('');
const [selectedTrackIndex, setSelectedTrackIndex] = useState('');
const [tracks, setTracks] = useState([]);
const [isLoading, setIsLoading] = useState(false);


  // Fetch the tracks from the backend when the component mounts
  useEffect(() => {
    setIsLoading(true);
      fetch('http://localhost:8000/api/tracks_info')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Tracks fetched:', data); // Log the fetched data
        setTracks(data);
        if (data.length > 0) {
          setSelectedTrackIndex(data[0].id); // Assume the id is the correct value for selectedTrackIndex
        }
      })
      .catch(error => {
        console.error('Failed to fetch tracks:', error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []);
  

  // Handle the form submission
const handleSubmit = (event) => {
    event.preventDefault();
    // Find the track object by index, then use its track_uri to submit
    const trackUri = tracks[selectedTrackIndex] ? tracks[selectedTrackIndex].track_uri : null;
    if (trackUri) {
        submitComment(tracks[selectedTrackIndex].track_uri, comment)
        .then(data => {
        console.log(data);
          setComment(''); // Clear comment field on success
          // todo further actions on success like showing a success message
        })
        .catch(error => {
        console.error('Failed to submit comment:', error);
          // todo further actions on failure like showing an error message
        });
    }
};

return (
    <div className="comment-form-page">
      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <label htmlFor="comment">
            <textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="I love this song! &#128516;" 
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="track-select">
            <b>Song Name:</b>
            {isLoading ? (
              <div>Loading...</div> // Loading indicator
            ) : (
              <select
                id="track-select"
                value={selectedTrackIndex}
                onChange={e => setSelectedTrackIndex(e.target.value)}
                required
              >
                {tracks.map((track) => (
                  <option key={track.track_uri} value={track.track_uri}>
                    {track.track_name}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>
        <button type="submit" className="submit-button">Submit Comment</button>
      </form>
    </div>
  );
  
};

export default CommentFormPage;