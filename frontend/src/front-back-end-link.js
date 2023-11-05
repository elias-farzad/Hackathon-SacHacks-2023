// front-back-end-link.js

export function submitComment(selectedTrackIndex, comment) {
    // use FormData to construct the data payload
    let formData = new FormData();
    formData.append('selected_index', selectedTrackIndex);
    formData.append('comment', comment);
  
    // make sure the fetch call mimics a standard form submission
    return fetch('/submit-comment', {
      method: 'POST',
      body: formData // send formData directly without JSON.stringify
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }
  