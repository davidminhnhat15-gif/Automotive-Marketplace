import "./CarDetail.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCarById } from "../../services/carService";
import { saveCar } from "../../services/savedCarsService";
import { getCarImageUrl } from "../../utils/carImages";

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [showAvailability, setShowAvailability] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadCar() {
      if (id.startsWith("seller-")) {
        const sellerCars = JSON.parse(
          localStorage.getItem("veloce_seller_cars") || "[]",
        );
        const sellerCar = sellerCars.find((item) => String(item.id) === String(id));

        if (!ignore) {
          setCar(sellerCar || null);
          setLoading(false);
        }

        return;
      }

      const data = await getCarById(id);

      if (!ignore) {
        setCar(data.success ? data.car : null);
        setLoading(false);
      }
    }

    loadCar();

    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSave = async () => {
    if (!localStorage.getItem("token")) {
      setMessageType("warning");
      setMessage("Please sign in to save this car to your account.");
      return;
    }

    const data = await saveCar(id);
    setMessageType(data.success ? "success" : "warning");
    setMessage(data.message || (data.success ? "Car saved." : "Could not save car."));
  };

  const handleAvailability = () => {
    setShowAvailability(true);
    setMessageType("success");
    setMessage("This vehicle is currently available. Contact the dealer to confirm details.");
  };

  if (loading) {
    return (
      <main className="detail-page">
        <h1>Loading car...</h1>
      </main>
    );
  }

  if (!car) {
    return (
      <main className="detail-page">
        <h1>Car not found</h1>
        <button onClick={() => navigate("/cars/all")}>Back to cars</button>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back to results
      </button>

      <section className="detail-layout">
        <div className="detail-gallery">
          <img
            src={getCarImageUrl(car)}
            alt={car.title}
            onError={(event) => {
              event.currentTarget.src = "/img/car.jpg";
            }}
          />
        </div>

        <aside className="detail-panel">
          <p>{car.bodyType}</p>
          <h1>{car.title}</h1>
          <h2>${Number(car.price).toLocaleString()}</h2>
          <span>Est. ${Math.round(Number(car.price) / 60).toLocaleString()}/mo</span>

          <button onClick={handleAvailability}>Check Availability</button>
          <button className="outline-btn" onClick={handleSave}>
            Save
          </button>

          {message && (
            <div className={`detail-message ${messageType}`}>
              <p>{message}</p>
              {messageType === "warning" && (
                <button type="button" onClick={() => navigate("/auth")}>
                  Sign in
                </button>
              )}
            </div>
          )}

          {showAvailability && (
            <div className="availability-box">
              <span>Available now</span>
              <h3>{car.location || car.city || "Veloce Partner Dealer"}</h3>
              <p>
                Call {car.phone || "the dealer"} or request a visit to confirm price,
                mileage, and appointment time.
              </p>
              <button type="button">Request dealer contact</button>
            </div>
          )}

          <div className="dealer-box">
            <h3>Veloce Partner</h3>
            <p>Rating 4.8 / Available nationwide</p>
          </div>
        </aside>
      </section>

      <section className="overview-section">
        <h2>Vehicle Details</h2>

        <div className="overview-grid">
          <div>
            <span>Year</span>
            <strong>{car.year}</strong>
          </div>
          <div>
            <span>Mileage</span>
            <strong>{Number(car.mileage || 0).toLocaleString()} mi</strong>
          </div>
          <div>
            <span>Fuel</span>
            <strong>{car.fuelType}</strong>
          </div>
          <div>
            <span>Make</span>
            <strong>{car.make}</strong>
          </div>
          <div>
            <span>Model</span>
            <strong>{car.model}</strong>
          </div>
          <div>
            <span>Body Style</span>
            <strong>{car.condition || car.bodyType}</strong>
          </div>
          <div>
            <span>City</span>
            <strong>{car.location || car.city || "Available nationwide"}</strong>
          </div>
          <div>
            <span>Phone</span>
            <strong>{car.phone || "Contact dealer"}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CarDetail;
