import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Itemdetail() {
  const [itemlist, setitem] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const showdata = async () => {
      try {
        const item = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
       
        setitem(item.data.meals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    showdata();
  }, [id]);

  return (
    <>
      <div className="container text-center mt-4">
        {itemlist.map((itmlistdata, index) => (
          <div className="row" key={index}>
            <div className="col-md-6 mb-4">
              <img
                src={itmlistdata.strMealThumb}
                className="img-fluid rounded"
                alt={itmlistdata.strMeal}
              />
              <Link to="/">
              <button className="btn btn-outline-danger mt-4">Go back</button>
              </Link>
            </div>
            <div className="col-md-6 text-left">
              <p><b>Category</b>: {itmlistdata.strCategory}</p>
              <p><b>Meal</b>: {itmlistdata.strMeal}</p>
              <h5>Ingredients:</h5>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Measurement</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 20 }).map((_, i) => {
                    const ingredient = itmlistdata[`strIngredient${i + 1}`];
                    const measure = itmlistdata[`strMeasure${i + 1}`];
                    return (
                      ingredient && (
                        <tr key={i}>
                          <td>{ingredient}</td>
                          <td>{measure}</td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
              <h5>Instructions:</h5>
              <p>{itmlistdata.strInstructions}</p>
              <h5>Video:</h5>
              {itmlistdata.strYoutube && (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${new URL(itmlistdata.strYoutube).searchParams.get('v')}`}
                  title={itmlistdata.strMeal}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Itemdetail;
