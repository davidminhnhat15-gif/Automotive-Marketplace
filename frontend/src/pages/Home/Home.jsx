import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiHeart, FiSearch } from "react-icons/fi";
import { getCars } from "../../services/carService";

function parseAiSearch(query) {
  const text = query.toLowerCase();
  const params = new URLSearchParams();

  const bodyTypes = [
    { words: ["suv", "crossover"], value: "suv" },
    { words: ["sedan"], value: "sedan" },
    { words: ["truck", "pickup"], value: "truck" },
    { words: ["wagon"], value: "wagon" },
    { words: ["convertible"], value: "convertible" },
    { words: ["luxury"], value: "luxury" },
  ];
  const fuelTypes = [
    { words: ["electric", "ev"], value: "Electric" },
    { words: ["plug-in hybrid", "plugin hybrid"], value: "Plug-in Hybrid" },
    { words: ["hybrid"], value: "Hybrid" },
    { words: ["gas", "gasoline", "petrol"], value: "Gasoline" },
  ];
  const cities = [
    { words: ["ha noi", "hanoi"], value: "Ha Noi" },
    {
      words: ["ho chi minh", "hcm", "saigon", "sai gon"],
      value: "Ho Chi Minh",
    },
    { words: ["hai phong"], value: "Hai Phong" },
    { words: ["da nang", "danang"], value: "Da Nang" },
    { words: ["quang ninh"], value: "Quang Ninh" },
  ];
  const makes = [
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
    "Ford",
    "Jeep",
    "Lexus",
    "Mercedes-Benz",
    "Porsche",
    "Volvo",
  ];

  const bodyType = bodyTypes.find((item) =>
    item.words.some((word) => text.includes(word)),
  );
  const fuelType = fuelTypes.find((item) =>
    item.words.some((word) => text.includes(word)),
  );
  const city = cities.find((item) =>
    item.words.some((word) => text.includes(word)),
  );
  const make = makes.find((item) => text.includes(item.toLowerCase()));
  const priceMatch = text.match(
    /(?:under|below|less than|max|maximum)\s*\$?\s*(\d+(?:,\d{3})?|\d+)(k)?/,
  );
  const mileageMatch = text.match(
    /(?:under|below|less than|max|maximum)\s*(\d+(?:,\d{3})?|\d+)(k)?\s*(?:mi|mile|miles)/,
  );
  const yearMatch = text.match(/\b(20\d{2})\b/);

  if (make) params.set("make", make);
  if (fuelType) params.set("fuelType", fuelType.value);
  if (city) params.set("city", city.value);

  if (text.includes("used")) params.set("condition", "Used");
  if (text.includes("new")) params.set("condition", "New");

  if (priceMatch) {
    const amount = Number(priceMatch[1].replaceAll(",", ""));
    params.set("maxPrice", String(priceMatch[2] ? amount * 1000 : amount));
  }

  if (mileageMatch) {
    const amount = Number(mileageMatch[1].replaceAll(",", ""));
    params.set("maxMileage", String(mileageMatch[2] ? amount * 1000 : amount));
  }

  if (yearMatch) {
    params.set("minYear", yearMatch[1]);
    params.set("maxYear", yearMatch[1]);
  }

  if (
    !bodyType &&
    !make &&
    !fuelType &&
    !city &&
    !priceMatch &&
    !mileageMatch
  ) {
    params.set("search", query.trim());
  }

  return {
    category: bodyType?.value || "all",
    params,
  };
}

const bestDeals = [
  {
    title: "2021 Toyota Corolla",
    type: "New",
    detail: "LE - 42K mi",
    price: "$15,900",
    img: "/img/deals/Corolla.jpg",
  },
  {
    title: "2020 Hyundai Elantra",
    type: "New",
    detail: "SEL - 48K mi",
    price: "$14,800",
    img: "/img/deals/Elantra.jpg",
  },
  {
    title: "2021 Kia Forte",
    type: "New",
    detail: "LXS - 39K mi",
    price: "$15,500",
    img: "/img/deals/Forte.jpg",
  },
  {
    title: "2020 Nissan Sentra",
    type: "New",
    detail: "SV - 45K mi",
    price: "$14,900",
    img: "/img/deals/Sentra.jpg",
  },
];

function Home() {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [aiQuery, setAiQuery] = useState("");
  const [make, setMake] = useState("All makes");
  const [model, setModel] = useState("All models");
  const [dealIds, setDealIds] = useState({});

  const makes = [
    "All makes",
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

  const modelsByMake = {
    "All makes": [
      "All models",
      "Camry",
      "Corolla",
      "RAV4",
      "Prius",
      "Elantra",
      "Sonata",
      "Tucson",
      "Forte",
      "K5",
      "Sportage",
      "Model 3",
      "Model S",
      "Model X",
      "Model Y",
      "VF 6",
      "VF 8",
      "A4",
      "Q5",
      "3 Series",
      "X5",
      "Sentra",
      "Rogue",
      "Mazda3",
      "CX-5",
      "Camaro",
      "Tahoe",
      "Silverado",
    ],
    Tesla: ["All models", "Model 3", "Model S", "Model X", "Model Y"],
    VinFast: ["All models", "VF 3", "VF 5", "VF 6", "VF 7", "VF 8", "VF 9"],
    Audi: ["All models", "A3", "A4", "A6", "Q3", "Q5", "Q7"],
    BMW: ["All models", "3 Series", "5 Series", "X3", "X5"],
    Toyota: ["All models", "Camry", "Corolla", "RAV4", "Prius"],
    Nissan: ["All models", "Altima", "Sentra", "Rogue", "Leaf"],
    Mazda: ["All models", "Mazda3", "Mazda6", "CX-5"],
    Hyundai: ["All models", "Elantra", "Sonata", "Tucson"],
    Kia: ["All models", "K5", "Sportage", "Sorento"],
    Chevrolet: ["All models", "Camaro", "Malibu", "Tahoe", "Silverado"],
    default: ["All models"],
  };

  const styles = [
    { name: "Sedans", slug: "sedan", img: "/img/styles/Sedan.png" },
    { name: "SUVs & Crossovers", slug: "suv", img: "/img/styles/Suv.png" },
    { name: "Luxury", slug: "luxury", img: "/img/styles/Luxury.png" },
    { name: "Hybrid", slug: "hybrid", img: "/img/styles/Hybridd.png" },
    { name: "Wagons", slug: "wagon", img: "/img/styles/Wagons.png" },
    {
      name: "Convertibles",
      slug: "convertible",
      img: "/img/styles/Convertibles.png",
    },
    { name: "Electric", slug: "electric", img: "/img/styles/Electric.png" },
  ];

  const journeyLinks = [
    { label: "Sedans for Sale Near Me", path: "/cars/sedan" },
    { label: "SUVs for Sale Near Me", path: "/cars/suv" },
    { label: "Electric Cars Near Me", path: "/cars/electric" },
    { label: "Hybrid Cars Near Me", path: "/cars/hybrid" },
    { label: "Luxury Cars Near Me", path: "/cars/luxury" },
  ];

  const popularSearches = [
    {
      title: "Shop Vehicles By Style",
      items: [
        { label: "SUVs", path: "/cars/suv" },
        { label: "Sedans", path: "/cars/sedan" },
        { label: "Electric cars", path: "/cars/electric" },
        { label: "Luxury cars", path: "/cars/luxury" },
        { label: "Convertibles", path: "/cars/convertible" },
      ],
    },
    {
      title: "Popular Cars",
      items: [
        { label: "Toyota Corolla", path: "/cars/all?search=Toyota%20Corolla" },
        {
          label: "Hyundai Elantra",
          path: "/cars/all?search=Hyundai%20Elantra",
        },
        { label: "Kia Forte", path: "/cars/all?search=Kia%20Forte" },
        { label: "Nissan Sentra", path: "/cars/all?search=Nissan%20Sentra" },
      ],
    },
    {
      title: "Popular New Cars",
      items: [
        { label: "Toyota Camry", path: "/cars/all?search=Toyota%20Camry" },
        { label: "Honda Accord", path: "/cars/all?search=Honda%20Accord" },
        { label: "Tesla Model 3", path: "/cars/all?search=Tesla%20Model%203" },
        { label: "BMW 3 Series", path: "/cars/all?search=BMW%203%20Series" },
      ],
    },
    {
      title: "More Popular Vehicle Categories",
      items: [
        { label: "Cars under $20,000", path: "/cars/all?maxPrice=20000" },
        { label: "Hybrid cars", path: "/cars/hybrid" },
        { label: "Family SUVs", path: "/cars/suv" },
        { label: "Reliable commuter cars", path: "/cars/sedan?maxPrice=30000" },
      ],
    },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (make !== "All makes") params.append("make", make);
    if (model !== "All models") params.append("model", model);

    const query = params.toString();

    navigate(query ? `/cars/all?${query}` : "/cars/all");
  };

  const handleAiSearch = (event) => {
    event.preventDefault();

    if (!aiQuery.trim()) {
      navigate("/cars/all");
      return;
    }

    const { category, params } = parseAiSearch(aiQuery);
    const query = params.toString();

    navigate(query ? `/cars/${category}?${query}` : `/cars/${category}`);
  };

  useEffect(() => {
    let isMounted = true;

    async function loadDealIds() {
      const entries = await Promise.all(
        bestDeals.map(async (car) => {
          try {
            const data = await getCars({ search: car.title });
            const match = data.cars?.find((item) => item.title === car.title);
            return [car.title, match?.id];
          } catch {
            return [car.title, null];
          }
        }),
      );

      if (isMounted) {
        setDealIds(Object.fromEntries(entries));
      }
    }

    loadDealIds();

    return () => {
      isMounted = false;
    };
  }, []);

  const openDeal = (car) => {
    const id = dealIds[car.title];

    if (id) {
      navigate(`/cars/detail/${id}`);
      return;
    }

    navigate(`/cars/all?search=${encodeURIComponent(car.title)}`);
  };

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-card">
          <h1>
            Imagine the <br /> possibilities
          </h1>

          <div className="hero-tab">Shop cars for sale</div>

          <form className="ai-search" onSubmit={handleAiSearch}>
            <input
              value={aiQuery}
              onChange={(event) => setAiQuery(event.target.value)}
              placeholder="Try finding a car with me, AutoAI"
            />
            <button type="submit" aria-label="Search with AutoAI">
              <FiSearch />
            </button>
          </form>

          <div className="divider">- Or search by -</div>

          <div className="form-box">
            <div
              className={`select-field ${openDropdown === "make" ? "open" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "make" ? null : "make")
              }
            >
              <small>Make</small>
              <strong>{make}</strong>
              <FiChevronDown className="chevron" />

              {openDropdown === "make" && (
                <div className="hero-dropdown-menu">
                  {makes.map((item) => (
                    <button
                      key={item}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMake(item);
                        setModel("All models");
                        setOpenDropdown(null);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`select-field ${openDropdown === "model" ? "open" : ""}`}
              onClick={() =>
                setOpenDropdown(openDropdown === "model" ? null : "model")
              }
            >
              <small>Model</small>
              <strong>{model}</strong>
              <FiChevronDown className="chevron" />

              {openDropdown === "model" && (
                <div className="hero-dropdown-menu">
                  {(modelsByMake[make] || modelsByMake.default).map((item) => (
                    <button
                      key={item}
                      onClick={(e) => {
                        e.stopPropagation();
                        setModel(item);
                        setOpenDropdown(null);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="show-btn" onClick={handleSearch}>
              Show matches
            </button>
          </div>
        </div>

        <div className="hero-copy" aria-hidden="true">
          <span>Curated inventory</span>
          <h2>Find, compare, and save your next car with less noise.</h2>
        </div>
      </section>

      <section className="journey-section">
        <h2>Continue Your Journey</h2>

        <div className="journey-row">
          {journeyLinks.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path)}>
              <FiSearch />
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="style-section">
        <div className="section-title-row">
          <h2>Shop Vehicles by Style</h2>
          <button onClick={() => navigate("/cars/all")}>Shop All Styles</button>
        </div>

        <div className="style-row">
          {styles.map((item) => (
            <div
              className="style-card"
              key={item.slug}
              onClick={() => navigate(`/cars/${item.slug}`)}
            >
              <div className="style-img-bg">
                <img src={item.img} alt={item.name} />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="deals-section">
        <div className="section-title-row">
          <h2>The Best Car Deals</h2>
          <button onClick={() => navigate("/cars/all")}>
            Shop All Best Car Deals
          </button>
        </div>

        <div className="deals-row">
          {bestDeals.map((car) => (
            <div
              className="deal-card"
              key={car.title}
              role="button"
              tabIndex={0}
              onClick={() => openDeal(car)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openDeal(car);
                }
              }}
            >
              <div className="deal-img">
                <span>Great Price</span>
                <button
                  aria-label={`Save ${car.title}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <FiHeart />
                </button>
                <img
                  src={car.img}
                  alt={car.title}
                  onError={(event) => {
                    event.currentTarget.src = "/img/car.jpg";
                  }}
                />
              </div>

              <div className="deal-info">
                <p>{car.type}</p>
                <h3>{car.title}</h3>
                <small>{car.detail}</small>
                <h4>{car.price}</h4>

                <div className="deal-tags">
                  <span>Great Price</span>
                  <span>Reliable Choice</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="popular-searches">
          <h3>Popular searches</h3>

          <div className="popular-search-list">
            {popularSearches.map((group) => (
              <details className="popular-search-item" key={group.title}>
                <summary>
                  <span>{group.title}</span>
                  <FiChevronDown />
                </summary>

                <div className="popular-search-links">
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => navigate(item.path)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
