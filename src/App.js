import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import AddCar from './Components/Addcar';
import CarDetails from './Components/Cardetails';
import UpdateCar from './Components/Updatecar';
import Forgotpassword from './Components/Forgotpassword';
function App() {
  return (
    <>
    <div>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/car/:id" element={<CarDetails/>}/> 
          <Route path="/Addcar" element={<AddCar/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/update-car/:id" element={<UpdateCar />} />
          <Route path="/updatepassword" element={<Forgotpassword/>}/>
        </Routes>
        <Footer/>
    </div>
    </>
  );
}

export default App;
