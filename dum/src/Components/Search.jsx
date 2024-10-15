import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";

function Search() {
  const [userdata, setuserdata] = useState("chicken");
  const [itemList, setItemList] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  // Load liked items from local storage when the component mounts
  useEffect(() => {
    const storedLikedItems = JSON.parse(localStorage.getItem('th')) || [];
    setLikedItems(storedLikedItems);
  }, []);

  const getuserdata = (event) => {
    setuserdata(event.target.value);
  };

  const showdata = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${userdata}`
      );
      setItemList(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const like = (itemId) => {
    const isLiked = likedItems.includes(itemId);
    if (!isLiked) {
      const updatedLikedItems = [...likedItems, itemId];
      setLikedItems(updatedLikedItems);
      localStorage.setItem('th', JSON.stringify(updatedLikedItems));
    } else {
      alert(`Item is already liked.`);
    }
  };

  return (
    <>
      <center className="mt-4">
        <Link to={{ pathname: `/cart/${likedItems}` }}>
          <button type="button" className="btn btn-primary position-relative">
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {likedItems.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
        <h3 className="text-danger">Recipe Finder</h3>
        <p className="text-secondary">Search, Cook, Enjoy!</p>
      </center>
      <div className="container mt-4">
        <form onSubmit={showdata} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              onChange={getuserdata}
              value={userdata}
              placeholder="Search for recipes..."
            />
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
          </div>
        </form>
        <div className="row">
          {itemList && itemList.length > 0 ? (
            itemList.map((dataitem, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <Link to={`item/${dataitem.idMeal}`}>
                    <img
                      src={dataitem.strMealThumb}
                      alt={dataitem.strMeal}
                      className="card-img-top"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{dataitem.strArea}</h5>
                    <p className="card-text">{dataitem.strMeal}</p>
                    <Link
                      to={`item/${dataitem.idMeal}`}
                      className="btn btn-outline-primary me-2"
                    >
                      View Recipe
                    </Link>
                    <div className="btn btn-outline-primary" onClick={() => like(dataitem.idMeal)}>
                      <IoIosHeartEmpty />
                      Like
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
