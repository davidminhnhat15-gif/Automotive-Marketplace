import "./SavedCars.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedCars, removeSavedCar } from "../../services/savedCarsService";

function SavedCars() {
  const navigate = useNavigate();
  const [savedCars, setSavedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadSavedCars() {
      const data = await getSavedCars();

      if (!ignore) {
        if (data.success) {
          setSavedCars(data.cars || []);
        } else {
          setMessage(data.message || "Please sign in to view saved cars.");
        }

        setLoading(false);
      }
    }

    loadSavedCars();

    return () => {
      ignore = true;
    };
  }, []);

  const handleRemove = async (carId) => {
    const data = await removeSavedCar(carId);

    if (data.success) {
      setSavedCars((cars) => cars.filter((car) => String(car.id) !== String(carId)));
    }

    setMessage(data.message || "Saved cars updated.");
  };

  return (
    <main className="saved-page">
      <h1>Saved Cars</h1>

      {loading ? (
        <p className="empty-text">Loading saved cars...</p>
      ) : savedCars.length === 0 ? (
        <div className="saved-empty">
          <p className="empty-text">
            {message || "Sign in to save cars and get price drop alerts."}
          </p>

          <div className="saved-actions">
            <button className="btn-outline" onClick={() => navigate("/cars/all")}>
              Shop for cars
            </button>

            <button className="btn-purple" onClick={() => navigate("/")}>
              Back home
            </button>
          </div>
        </div>
      ) : (
        <>
          {message && <p className="empty-text">{message}</p>}

          <div className="saved-grid">
            {savedCars.map((car) => (
              <div className="saved-card" key={car.id}>
                <img src={car.imageUrl} alt={car.title} />
                <h3>{car.title}</h3>
                <p>${Number(car.price).toLocaleString()}</p>
                <p>{Number(car.mileage || 0).toLocaleString()} mi</p>
                <button onClick={() => navigate(`/cars/detail/${car.id}`)}>
                  View details
                </button>
                <button onClick={() => handleRemove(car.id)}>Remove</button>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default SavedCars;
