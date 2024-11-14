import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './helper';
import './Cardetails.css';

const CarDetails = () => {
  const { id } = useParams(); // Get the car ID from the URL
  const [carData, setCarData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For carousel
  const [loading, setLoading] = useState(true); // New state to manage loading
  const loggedInUserId = localStorage.getItem('logintoken'); // Retrieve logged-in user's ID from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (!localStorage.getItem('logintoken')) {
      navigate("/"); // Redirect to login or home page if not logged in
    }

    // Fetch car details using the ID
    const fetchCarData = async () => {
      try {
        setLoading(true); // Set loading state to true when the fetch starts
        const response = await axios.get(`${BASE_URL}/api/car/${id}`);
        setCarData(response.data);
        setLoading(false); // Set loading state to false once data is fetched
      } catch (error) {
        setLoading(false); // Stop loading in case of error
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, [id, navigate]);

  // If loading, show a loading spinner
  if (loading) {
    return <div className="loading-spinner"></div>; // Show the spinner while loading
  }

  // Carousel controls
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % carData.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + carData.images.length) % carData.images.length);

  // Handle delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/deletecar/${id}`);
      alert('Car deleted successfully.');
      navigate('/dashboard'); // Redirect to the cars list or another page
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete the car.');
    }
  };

  // Handle update action
  const handleUpdate = () => {
    navigate(`/update-car/${id}`); // Navigate to the update page/form
  };

  const handleBack = () => {
    navigate("/dashboard"); // Go back to the previous page
  };

  return (
    <div className="car-det-container">
      <button className="back-button" onClick={handleBack}>Back</button>
      <h2 className="car-ti">{carData.title}</h2>
      <div className="carousel">
        {carData.images.length > 0 && (
          <div className="carousel-wrapper">
            <button className="carousel-button prev" onClick={prevImage}>&#10094;</button>
            <img className="carousel-image" src={carData.images[currentImageIndex]} alt="Car" />
            <button className="carousel-button next" onClick={nextImage}>&#10095;</button>
          </div>
        )}
      </div>
      <div className="car-det">
        <p className="car-des">{carData.description}</p>
        {carData.tags && carData.tags.length > 0 && (
          <div className="car-t">
            <strong>Tags:</strong> {carData.tags.join(', ')}
          </div>
        )}

        {/* Display Update and Delete buttons if the logged-in user is the owner */}
        {carData.userId === loggedInUserId && (
          <div className="car-act">
            <button className="update-button" onClick={handleUpdate}>Update</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
