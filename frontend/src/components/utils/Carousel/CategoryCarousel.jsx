import React, { useEffect, useRef, useState } from 'react';
import './CategoryCarousel.css'; // Agrega un archivo CSS específico para los estilos del carrusel
import imagen from "../../../assets/Img/mojarra1.jpg"
import { useNavigate } from 'react-router-dom';


const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const BASE_URL = "https://ramoja-tours.up.railway.app";
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -100, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 100, behavior: 'smooth' });
  };

  useEffect(()=>{
    const fetchCategories = async ()=>{
      const response = await fetch(`${BASE_URL}/api/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      const data = await response.json();
      setCategories(data);      
    }
    fetchCategories();
  },[])

  const handleCategoryClick = ({category}) => {
    navigate(`/tours?category=${category.id}&name=${category.name}`);
  };


  return (
    <section className="categories-section">
      {/* <h2 className='title_cat'>CATEGORIAS</h2> */}
      <div className="carousel-container">
        <button className="carousel-button left" onClick={scrollLeft}>
          &#8249;
        </button>
        <ul className="categories-list" ref={carouselRef}>
          
          {
            categories.map((category)=>(
              <li className="category-item" key={category.id} onClick={()=>handleCategoryClick({category})} style={{ backgroundImage: `url(${category.imgUrl})` }}><p>{category.name}</p></li>
            ))
          }
        </ul>
        <button className="carousel-button right" onClick={scrollRight}>
          &#8250;
        </button>
      </div>
    </section>
  );
};

export default CategoryCarousel;