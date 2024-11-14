import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css'; // Custom styling for the dashboard
import { BASE_URL } from './helper';


const Dashboard = () => {
  const [allCars, setAllCars] = useState([]); // All cars globally
  const [userCars, setUserCars] = useState([]); // Cars created by the logged-in user
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const name=localStorage.getItem('username');
  const [loading, setLoading] = useState(true); // New loading state
  const navigate = useNavigate();

  // Fetch all cars globally
  const fetchAllCars = async () => {
    const userId = localStorage.getItem('logintoken');
    try {
      const response = await axios.get(BASE_URL + "/getallcars"); // Global cars API
      setAllCars(response.data);
      const filteredCars = response.data.filter(car => car.userId === userId);
      setUserCars(filteredCars);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      setErrorMessage('Failed to load global cars.');
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter cars based on search term
  const filteredCars = (cars) => {
    return cars.filter((car) => {
      return (
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  };

  // Navigate to create car page
  const navigateToCreateCar = () => {
    navigate('/addcar');
  };

  useEffect(() => {
    if (!localStorage.getItem('logintoken')) {
      navigate("/"); // Redirect to login or home page if not logged in
    }
    fetchAllCars();
  }, [navigate]);

  // If loading, show a loading spinner
  if (loading) {
    return <div className="loading-spinner"></div>; // Show the spinner while loading
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header text-success">Hello {name}</h1>
      <h1 className="dashboard-header">Welcome to Car Management Dashboard</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search cars..."
          className="search-input"
        />
      </div>

      {/* Add new car button */}
      <button onClick={navigateToCreateCar} className="add-car-btn">
        Add New Car
      </button>

      {/* User's Cars Section */}
      <div className="section">
        <h2>Your Cars</h2>
        <div className="car-list">
          {filteredCars(userCars).length === 0 ? (
            <p>No cars found</p> // Message when no cars are found
          ) : (
            filteredCars(userCars).map((car) => (
              <div className="car-card" key={car._id}>
                <img src={car.images[0]} alt={car.title} className="car-image" />
                <div className="car-details">
                  <h3>{car.title}</h3>
                  <p>{car.description}</p>
                  <Link to={`/car/${car._id}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Global Cars Section */}
      <div className="section">
        <h2>Global Cars</h2>
        <div className="car-list">
          {filteredCars(allCars).length === 0 ? (
            <p>No cars found</p> // Message when no cars are found
          ) : (
            filteredCars(allCars).map((car) => (
              <div className="car-card" key={car._id}>
                <img src={car.images[0]} alt={car.title} className="car-image" />
                <div className="car-details">
                  <h3>{car.title}</h3>
                  <p>{car.description}</p>
                  <Link variant='secondary' to={`/car/${car._id}`} className="view-details-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
