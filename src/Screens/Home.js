import React, { useEffect, useState } from 'react'
import Carousal from '../Components/Carousal'
import Footer from '../Components/Footer'
import Item from '../Components/Item'
import Navbar from '../Components/Navbar'
import { BASE_URL } from './api'



export default function Home() {
    const [searchItems, setsearchItems] = useState('')
    const [menuCatData, setmenuCatData] = useState([]);
    const [menuFood, setmenuFood] = useState([]);

    const provideData = async () => {
        let response = await fetch(`${BASE_URL}/api/foodMenu`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        // console.log(response[0],response[1]);
        setmenuFood(response[0]);
        setmenuCatData(response[1]);
    }

    useEffect(() => {
        provideData();
    }, [])


    return (
        <div>
            <div> <Navbar /> </div>
            <div> <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='Carousel'  >
                    <div className="carousel-caption" >
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchItems} onChange={(e) => { setsearchItems(e.target.value) }} />
                            {/* <button className="btn btn-outline-warning text-black bg-warning" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://wallpaperaccess.com/full/462773.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "contain" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://wallpapers.com/images/file/tandoori-chicken-legs-cq6zeuq06bks0doq.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item" >
                        <img src="https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/black_and_blue_burger_95881_16x9.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
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
            <div className='m-container'>
                {
                    menuCatData !== []
                        ? menuCatData.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className="fs-3 m-3">
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {menuFood !== [] ? menuFood.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(searchItems.toLowerCase())))
                                        .map(underCat => {
                                            return (
                                                <div key={underCat._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Item foodName={underCat}
                                                        options={underCat.options[0]}

                                                    ></Item>


                                                </div>
                                            )

                                        }) : <div> data does not exist</div>}
                                </div>

                            )
                        })
                        : ""
                }

            </div>
            <div> <Footer /></div>
        </div>

    )
}
