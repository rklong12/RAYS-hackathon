import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <button>
        <label htmlFor="imageUpload">Choose Image</label>
      </button>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        style={{ display: 'none' }} // Hides the input
        onChange={handleImageChange}
      />
      {selectedImage && (
        <div>
          <h3>Selected Image:</h3>
          <img src={selectedImage} alt="Selected" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
