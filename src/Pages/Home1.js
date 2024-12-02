import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from '../Components/Cards';
import Carousel from '../Components/Carousel';
import Navbar from '../Components/Navbar';

function Home() {
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
      <div>  
        <Navbar/>
      </div>
      <div>
        <Carousel />
      </div>

      <div>
        {foodCategory.length > 0 
          ? foodCategory.map((category, index) => (
              <div key={index}>
                <h3>{category.CategoryName}</h3> {/* Display Category Name */}
                
                {foodPanda.filter(item => item.CategoryName === category.CategoryName)
                  .map((filteredItem, idx) => (
                    <div key={idx}>
                      {filteredItem.ItemName}
                      <Cards data={filteredItem} /> {/* Pass filtered data to Cards */}
                    </div>
                  ))
                }
              </div>
            ))
          : <p>No categories available</p>
        }
      </div>

      <div>Footer</div>
    </div>
  );
}

export default Home;
