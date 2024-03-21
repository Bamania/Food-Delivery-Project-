import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Nichewala from '../component/Nichewala';
import Card from '../component/Card';


export default function Home() {
  const [search, setSearch] = useState('')
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItems, setFoodItems] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    // console.log(response[0],response[1])
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption ' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-centre">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>


            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900×700/?pastry " className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900×700/?Pizza" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div></div>
      <div className='m-2'>
        {FoodCat != [] ? FoodCat.map((data) => {
          return (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3 '>{data.CategoryName}</div>
              <hr />
              {FoodItems != [] ?
                FoodItems.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map(filterItems => {
                    return (
                      <div className='col-12 col-md-6 col-lg-3' key={filterItems._id}>
                        <Card foodItem={filterItems}
                          foodDes={filterItems.description}
                          
                          options={filterItems.options} />
                      </div>
                    );
                  }) : null}
            </div>
          );
        }) : null}
      </div>
      <div><Nichewala /></div>
    </div>
  );
}
