import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Components/Cards';
import Navbar from '../Components/Navbar';
// import LoginModal from '../Components/LoginModal';  // Import your LoginModal
// import SignupModal from '../Components/SignupModal';  // Import your SignUpModal

function Home() {
  const [search, setSearch] = useState('');
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodPanda, setFoodPanda] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foodData");
      setFoodCategory(response.data.foodCategory);
      setFoodPanda(response.data.foodPanda);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      
      {/* <div>
        <button onClick={() => setIsLoginOpen(true)} className="btn btn-primary">Open Login Modal</button>
        <button onClick={() => setIsSignupOpen(true)} className="btn btn-secondary">Open Sign Up Modal</button>
      </div> */}

      <div id="carouselExample" className="carousel slide" style={{ objectFit: "cover" }}>
        <div className="carousel-inner" id='carousel' style={{ maxHeight: "500px" }}>
          <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="carousel-item active">
            <img src="./Images/brost1.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
          </div>

          <div className="carousel-item">
            <img src="./Images/burger1.webp" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
          </div>

          <div className="carousel-item">
            <img src="./Images/pizza1.jpeg" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>



      <div>
        {foodCategory.length > 0
          ? foodCategory.map((category) => (
            <div key={category._id} className='row mb-3 ms-1'>
              <div>
                <h3>{category.CategoryName}</h3> {/* Display Category Name */}
              </div>
              {foodPanda.filter(item => (item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map((filteredItem) => (
                  <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                    <Cards
                      foodItem={filteredItem}
                      options={filteredItem.options[0]}
                    />
                  </div>
                ))
              }
            </div>
          ))
          : <p>No categories available</p>
        }
      </div>


    </div>


  );
}

export default Home;
