import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addcar.css';
import { BASE_URL } from './helper.js';

const AddCar = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]); // To store all selected images
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Loading state
  const navigate = useNavigate();

  // Redirect if the user is not logged in
  useEffect(() => {
    const userId = localStorage.getItem('logintoken');
    if (!userId) {
      navigate('/');  // Redirect to home page if not logged in
    }
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the userId (email) from localStorage
    const userId = localStorage.getItem('logintoken'); // Get email from localStorage
    if (!userId) {
      setErrorMessage('User not logged in. Please log in first.');
      return;
    }

    // Create car data object
    const carData = { 
      userId, 
      title, 
      description, 
      tags, 
      images
    };
    console.log(images);

    setIsLoading(true);  // Start loading

    try {
      // Send POST request to backend
      const response = await axios.post(BASE_URL + '/addcar', carData);
      if (response.status === 201) {
        // Redirect to dashboard or list page after successful creation
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage('Failed to add the car. Please try again.');
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate('/dashboard'); // Redirect to dashboard or list page
  };

  // Handle image input change (multiple image selection)
  const handleImageChange = async (e) => {
    const files = e.target.files;
    const fileURLs = [];

    // Loop through selected files and create object URLs for previews
    for (let i = 0; i < files.length; i++) {
      const imageFile = files[i];
      const imageDataUrl = await readFileAsDataURL(imageFile);
      fileURLs.push(imageDataUrl);
    }

    // Set the state with the array of image previews
    setImages(fileURLs);
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="add-car-form">
      <h2>Add a New Car</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      {/* Show loading spinner while adding car */}
      {isLoading && <div className="loading-spinner">Loading...</div>}

      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <label>Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(','))}
        />
        
        <label>Images (max 10)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}  // Allow multiple files
        />
        
        {/* Display image previews */}
        {images.length > 0 && (
          <div className="image-previews">
            <h3>Image Previews:</h3>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} />
            ))}
          </div>
        )}
        
        <button type="submit" disabled={isLoading}>Add Car</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCar;
