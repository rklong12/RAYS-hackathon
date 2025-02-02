// public/app.js
window.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const captureBtn = document.getElementById('capture-btn');
    const canvas = document.getElementById('canvas');
    const capturedImage = document.getElementById('captured-image');
    const submitBtn = document.getElementById('submit-btn');
    const recipeResults = document.getElementById('recipe-results');
  
    // Start the camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
          alert('Could not access the camera.');
        });
    } else {
      alert('getUserMedia is not supported by your browser.');
    }
  
    // Capture an image when the "Capture Image" button is clicked.
    captureBtn.addEventListener('click', () => {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      capturedImage.src = dataURL;
      console.log('Image captured:', dataURL.substring(0, 30) + '...');
    });
  
    // Submit data to the server for analysis.
    submitBtn.addEventListener('click', async () => {
      const imageData = capturedImage.src;
      if (!imageData || !imageData.startsWith('data:image')) {
        alert('Please capture an image first!');
        return;
      }
  
      // Get selected cuisines from checkboxes.
      const selectedCuisines = [];
      document.querySelectorAll('input[name="cuisines"]:checked').forEach((checkbox) => {
        selectedCuisines.push(checkbox.value);
      });
  
      // Get previous dishes (split the input by commas).
      const previousDishesRaw = document.getElementById('previous-dishes').value;
      const previousDishes = previousDishesRaw
        .split(',')
        .map(s => s.trim())
        .filter(s => s);
  
      console.log('Sending data:', {
        imageData: imageData.substring(0, 30) + '...',
        cuisines: selectedCuisines,
        previousDishes: previousDishes
      });
  
      const payload = { imageData, cuisines: selectedCuisines, previousDishes };
  
      try {
        const response = await fetch('/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          console.error('Server error:', response.statusText);
          alert('Server error: ' + response.statusText);
          return;
        }
  
        const result = await response.json();
        console.log('Received response:', result);
        displayResults(result);
      } catch (error) {
        console.error('Error during fetch:', error);
        alert('An error occurred while processing your request.');
      }
    });
  
    // Display the Gemini API response.
    function displayResults(result) {
      recipeResults.innerHTML = '';
      if (result.response) {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';
        recipeDiv.innerHTML = `<h3>Recipe Suggestions</h3><p>${result.response}</p>`;
        recipeResults.appendChild(recipeDiv);
      } else {
        recipeResults.innerHTML = '<p>No recipe suggestions found.</p>';
      }
    }
  });
  