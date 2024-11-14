import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './helper';
import './Updatecar.css'; // Reuse the same styles from AddCar

const UpdateCar = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch car details when component mounts
  useEffect(() => {
    if (!localStorage.getItem('logintoken')) {
        navigate("/"); // Redirect to login or home page if not logged in
      }
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/car/${id}`);
        const carData = response.data;
        setTitle(carData.title);
        setDescription(carData.description);
        setTags(carData.tags || []);
        setImages(carData.images || []);
      } catch (error) {
        setErrorMessage('Failed to load car details.');
      }
    };

    fetchCarData();
  }, [id,navigate]);

  // Handle form submission to update car data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      title,
      description,
      tags,
      images,
    };

    setIsLoading(true);

    try {
      const response = await axios.put(`${BASE_URL}/update-car/${id}`, carData);
      if (response.status === 200) {
        navigate(`/car/${id}`); // Redirect back to car details page
      }
    } catch (error) {
      setErrorMessage('Failed to update the car. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image change for updating images
  const handleImageChange = async (e) => {
    const files = e.target.files;
    const fileURLs = [];

    for (let i = 0; i < files.length; i++) {
      const imageFile = files[i];
      const imageDataUrl = await readFileAsDataURL(imageFile);
      fileURLs.push(imageDataUrl);
    }

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
      <h2>Update Car Details</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

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
          value={tags.join(',')}
          onChange={(e) => setTags(e.target.value.split(','))}
        />

        <label>Images (max 10)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        {images.length > 0 && (
          <div className="image-previews">
            <h3>Image Previews:</h3>
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} />
            ))}
          </div>
        )}

        <button type="submit" disabled={isLoading}>Update Car</button>
        <button type="button" onClick={() => navigate(`/car/${id}`)}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCar;
