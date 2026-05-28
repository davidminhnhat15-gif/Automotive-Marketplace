import "./Buy.css";
import { useNavigate } from "react-router-dom";

function Buy() {
  const navigate = useNavigate();

  const categories = [
    ["Sedans", "sedan", "/img/styles/sedan.png"],
    ["SUVs", "suv", "/img/styles/suv.png"],
    ["Electric Cars", "electric", "/img/styles/electric.png"],
    ["Hybrid Cars", "hybrid", "/img/styles/hybrid.png"],
    ["Luxury Cars", "luxury", "/img/styles/luxury.png"],
    ["Convertibles", "convertible", "/img/styles/convertible.png"],
  ];

  const brands = [
    "Tesla",
    "VinFast",
    "Audi",
    "BMW",
    "Toyota",
    "Nissan",
    "Mazda",
    "Hyundai",
    "Kia",
    "Chevrolet",
  ];

  return (
    <main className="buy-page">
      <section className="buy-hero">
        <div>
          <p className="buy-tag">Find your next car</p>
          <h1>Shop Cars for Sale</h1>
          <p>
            Browse vehicles by style, brand, and budget. Find the right car for
            your needs.
          </p>

          <button onClick={() => navigate("/cars/all")}>Shop All Cars</button>
        </div>
      </section>

      <section className="buy-section">
        <div className="buy-title-row">
          <h2>Shop by Style</h2>
          <button onClick={() => navigate("/cars/all")}>View All</button>
        </div>

        <div className="buy-style-grid">
          {categories.map((item) => (
            <div
              className="buy-style-card"
              key={item[1]}
              onClick={() => navigate(`/cars/${item[1]}`)}
            >
              <div>
                <img src={item[2]} alt={item[0]} />
              </div>
              <h3>{item[0]}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="buy-section alt">
        <h2>Shop by Brand</h2>

        <div className="brand-grid">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => navigate(`/cars/all?make=${brand}`)}
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      <section className="buy-cta">
        <h2>Ready to find your car?</h2>
        <p>Start browsing available cars now.</p>
        <button onClick={() => navigate("/cars/all")}>Start Shopping</button>
      </section>
    </main>
  );
}

export default Buy;
