import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'; // Or your preferred HTTP client

const ROBOFLOW_API_KEY = "PfwIUHM5LSPI7aRbFVXA"; // Replace with your actual key
const ROBOFLOW_MODEL_ID = "food-ingredients-dataset"; // Your Roboflow model ID
const ROBOFLOW_VERSION = "3" // Your model version number

function IngredientIdentifier() {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    if (imageSrc) {
      try {
        console.log("preloading")
        setLoading(true);
        setError(null)
        const response = await axios({
            method: "POST",
            url: `https://detect.roboflow.com/${ROBOFLOW_MODEL_ID}/${ROBOFLOW_VERSION}`,
            params: {
              api_key: ROBOFLOW_API_KEY,
            },
            data: imageSrc,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log("hello");
        console.log(response.data);
        setPredictions(response.data.predictions || []); // Handle potential missing 'predictions'
        setLoading(false);
      } catch (err) {
        console.error("Error with Roboflow API:", err);
        setError("Error identifying ingredients. Please try again.");
        setLoading(false);
        setPredictions([]); // Clear previous predictions on error
      }
    }
};

  const renderPredictions = () => {
    if (loading) {
      return <p>Identifying ingredients...</p>;
    }
    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    return predictions.map((prediction, index) => (
      <div key={index}>
        <p>Ingredient: {prediction.class}</p>
        <p>Confidence: {prediction.confidence.toFixed(2)}</p>
      </div>
    ));
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Photo</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
      {renderPredictions()}
    </div>
  );

}

export default IngredientIdentifier;