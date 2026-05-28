import "./CarsPage.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiMapPin,
  FiSearch,
  FiSliders,
  FiX,
  FiZap,
} from "react-icons/fi";
import { getCars } from "../../services/carService";
import { saveCar } from "../../services/savedCarsService";
import { createSavedSearch } from "../../services/savedSearchesService";
import { getCarImageUrl } from "../../utils/carImages";

function getPriceRangeFromParams(searchParams) {
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  if (minPrice && maxPrice) {
    return `${minPrice}-${maxPrice}`;
  }

  if (maxPrice) {
    return `0-${maxPrice}`;
  }

  return "All";
}

function getMileageRangeFromParams(searchParams) {
  const minMileage = searchParams.get("minMileage");
  const maxMileage = searchParams.get("maxMileage");

  if (minMileage && maxMileage) {
    return `${minMileage}-${maxMileage}`;
  }

  if (maxMileage) {
    return `0-${maxMileage}`;
  }

  return "All";
}

const cities = [
  "All",
  "Ha Noi",
  "Ho Chi Minh",
  "Hai Phong",
  "Da Nang",
  "Quang Ninh",
];

const listingCities = [
  "Ha Noi",
  "Ho Chi Minh",
  "Ha Noi",
  "Ho Chi Minh",
  "Ha Noi",
  "Ho Chi Minh",
  "Hai Phong",
  "Da Nang",
  "Quang Ninh",
];

const mileageRanges = [
  { value: "All", label: "Any mileage" },
  { value: "0-10000", label: "0 - 10,000 mi" },
  { value: "10000-30000", label: "10,000 - 30,000 mi" },
  { value: "30000-50000", label: "30,000 - 50,000 mi" },
  { value: "50000-100000", label: "50,000 - 100,000 mi" },
];

function parseAiSearch(query) {
  const text = query.toLowerCase();
  const params = new URLSearchParams();

  const bodyTypes = [
    { words: ["suv", "crossover"], value: "suv" },
    { words: ["sedan"], value: "sedan" },
    { words: ["wagon"], value: "wagon" },
    { words: ["convertible"], value: "convertible" },
    { words: ["luxury"], value: "luxury" },
    { words: ["hybrid"], value: "hybrid" },
    { words: ["electric", "ev"], value: "electric" },
  ];
  const fuelTypes = [
    { words: ["electric", "ev"], value: "Electric" },
    { words: ["plug-in hybrid", "plugin hybrid"], value: "Plug-in Hybrid" },
    { words: ["hybrid"], value: "Hybrid" },
    { words: ["gas", "gasoline", "petrol"], value: "Gasoline" },
  ];
  const cityWords = [
    { words: ["ha noi", "hanoi"], value: "Ha Noi" },
    { words: ["ho chi minh", "hcm", "saigon", "sai gon"], value: "Ho Chi Minh" },
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
  const city = cityWords.find((item) =>
    item.words.some((word) => text.includes(word)),
  );
  const make = makes.find((item) => text.includes(item.toLowerCase()));
  const priceMatch = text.match(
    /(?:under|below|less than|max|maximum)\s*\$?\s*(\d+(?:,\d{3})?|\d+)(k)?/,
  );
  const mileageMatch = text.match(
    /(?:under|below|less than|max|maximum)\s*(\d+(?:,\d{3})?|\d+)(k)?\s*(?:mi|mile|miles)/,
  );

  if (make) params.set("make", make);
  if (fuelType) params.set("fuelType", fuelType.value);
  if (city) params.set("city", city.value);
  if (text.includes("used")) params.set("condition", "Used");
  if (text.includes("new")) params.set("condition", "New");

  if (priceMatch && !text.includes("mile")) {
    const amount = Number(priceMatch[1].replaceAll(",", ""));
    params.set("maxPrice", String(priceMatch[2] ? amount * 1000 : amount));
  }

  if (mileageMatch) {
    const amount = Number(mileageMatch[1].replaceAll(",", ""));
    params.set("maxMileage", String(mileageMatch[2] ? amount * 1000 : amount));
  }

  if (!bodyType && !make && !fuelType && !city && !priceMatch && !mileageMatch) {
    params.set("search", query.trim());
  }

  return {
    category: bodyType?.value || "all",
    params,
  };
}

function getCarCity(car) {
  if (car.location) {
    return car.location;
  }

  const index = Number(car.id || 0) % listingCities.length;
  return listingCities[index];
}

function FilterSelect({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const selected = options.find((item) => item.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`filter-select ${open ? "open" : ""}`} ref={selectRef}>
      <button
        type="button"
        className="filter-select-trigger"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected?.label}</span>
      </button>

      {open && (
        <div className="filter-select-menu">
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              className={item.value === value ? "active" : ""}
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
            >
              <span>{item.label}</span>
              {item.value === value && <b>✓</b>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function CarsPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const resultsRef = useRef(null);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [condition, setCondition] = useState(
    searchParams.get("condition") || "New",
  );
  const [make, setMake] = useState(searchParams.get("make") || "All");
  const [priceRange, setPriceRange] = useState(
    getPriceRangeFromParams(searchParams),
  );
  const [mileage, setMileage] = useState(
    getMileageRangeFromParams(searchParams),
  );
  const [sort, setSort] = useState("best");
  const [city, setCity] = useState(searchParams.get("city") || "All");
  const [fuelType, setFuelType] = useState(searchParams.get("fuelType") || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [aiQuery, setAiQuery] = useState("");

  const makes = [
    "All",
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
  const cityOptions = cities.map((item) => ({
    value: item,
    label: item === "All" ? "All cities" : item,
  }));
  const makeOptions = makes.map((item) => ({
    value: item,
    label: item === "All" ? "All makes" : item,
  }));
  const conditionOptions = [
    { value: "All", label: "All" },
    { value: "New", label: "New" },
    { value: "Used", label: "Used" },
  ];
  const fuelTypeOptions = [
    { value: "All", label: "All" },
    { value: "Gasoline", label: "Gasoline" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Electric", label: "Electric" },
    { value: "Plug-in Hybrid", label: "Plug-in Hybrid" },
  ];

  const priceRanges = [
    { value: "All", label: "Any price" },
    { value: "0-15000", label: "Under $15,000" },
    { value: "0-20000", label: "Under $20,000" },
    { value: "15000-20000", label: "$15,000 - $20,000" },
    { value: "20000-25000", label: "$20,000 - $25,000" },
    { value: "25000-30000", label: "$25,000 - $30,000" },
    { value: "30000-35000", label: "$30,000 - $35,000" },
    { value: "35000-50000", label: "$35,000 - $50,000" },
    { value: "50000-75000", label: "$50,000 - $75,000" },
    { value: "75000-100000", label: "$75,000 - $100,000" },
    { value: "100000-150000", label: "$100,000 - $150,000" },
    { value: "150000-250000", label: "$150,000 - $250,000" },
    { value: "250000-500000", label: "$250,000 - $500,000" },
  ];
  const [minPrice, maxPrice] =
    priceRange === "All" ? [undefined, undefined] : priceRange.split("-");
  const [minMileage, maxMileage] =
    mileage === "All" ? [undefined, undefined] : mileage.split("-");
  const selectedPriceLabel =
    priceRanges.find((item) => item.value === priceRange)?.label || "Any price";
  const selectedMileageLabel =
    mileageRanges.find((item) => item.value === mileage)?.label ||
    (maxMileage ? `Under ${Number(maxMileage).toLocaleString()} mi` : "Any mileage");

  const categoryTitle =
    !category || category === "all"
      ? "New vehicles for sale"
      : `${category.charAt(0).toUpperCase() + category.slice(1)} vehicles for sale`;

  const apiParams = useMemo(
    () => ({
      bodyType: category && category !== "all" ? category : undefined,
      make,
      minPrice,
      maxPrice,
      minYear: searchParams.get("minYear") || undefined,
      maxYear: searchParams.get("maxYear") || undefined,
      fuelType,
      search: searchParams.get("search") || undefined,
    }),
    [category, make, minPrice, maxPrice, fuelType, searchParams],
  );
  const sellerListings = useMemo(
    () => JSON.parse(localStorage.getItem("veloce_seller_cars") || "[]"),
    [],
  );

  useEffect(() => {
    let ignore = false;

    async function loadCars() {
      setLoading(true);
      setMessage("");
      setMessageType("info");

      const data = await getCars(apiParams);

      if (!ignore) {
        if (data.success) {
          setCars(data.cars || []);
        } else {
          setMessage(data.message || "Could not load cars.");
          setCars([]);
        }

        setLoading(false);
      }
    }

    loadCars();

    return () => {
      ignore = true;
    };
  }, [apiParams]);

  const filteredCars = useMemo(() => {
    let result =
      condition === "Used"
        ? [...sellerListings]
        : condition === "All"
          ? [...sellerListings, ...cars]
          : [...cars];

    if (make !== "All") {
      result = result.filter((car) => car.make === make);
    }

    if (fuelType !== "All") {
      result = result.filter((car) => car.fuelType === fuelType);
    }

    if (searchParams.get("search")) {
      const query = searchParams.get("search").toLowerCase();
      result = result.filter((car) =>
        [car.title, car.make, car.model, car.trim]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query)),
      );
    }

    if (minPrice && maxPrice) {
      result = result.filter(
        (car) =>
          Number(car.price || 0) >= Number(minPrice) &&
          Number(car.price || 0) <= Number(maxPrice),
      );
    }

    if (city !== "All") {
      result = result.filter((car) => getCarCity(car) === city);
    }

    if (minMileage && maxMileage) {
      result = result.filter(
        (car) =>
          Number(car.mileage || 0) >= Number(minMileage) &&
          Number(car.mileage || 0) <= Number(maxMileage),
      );
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "mileage-low") {
      result.sort((a, b) => a.mileage - b.mileage);
    }

    return result;
  }, [
    cars,
    sellerListings,
    condition,
    make,
    fuelType,
    searchParams,
    minPrice,
    maxPrice,
    city,
    minMileage,
    maxMileage,
    sort,
  ]);

  const carsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredCars.length / carsPerPage));
  const visiblePage = Math.min(currentPage, totalPages);
  const pageStart = (visiblePage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(pageStart, pageStart + carsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const activeFilters = [
    condition !== "All" && condition,
    category && category !== "all" && category,
    make !== "All" && make,
    priceRange !== "All" && selectedPriceLabel,
    mileage !== "All" && selectedMileageLabel,
    city !== "All" && city,
    fuelType !== "All" && fuelType,
    searchParams.get("search") && `Search: ${searchParams.get("search")}`,
  ].filter(Boolean);

  const resetFilters = () => {
    setCondition("New");
    setMake("All");
    setPriceRange("All");
    setMileage("All");
    setCity("All");
    setFuelType("All");
    setSort("best");
    navigate("/cars/all");
  };

  const handleAiSearch = (event) => {
    event.preventDefault();

    if (!aiQuery.trim()) {
      navigate("/cars/all");
      return;
    }

    const { category: aiCategory, params } = parseAiSearch(aiQuery);

    setCondition(params.get("condition") || "New");
    setMake(params.get("make") || "All");
    setFuelType(params.get("fuelType") || "All");
    setCity(params.get("city") || "All");
    setPriceRange(getPriceRangeFromParams(params));
    setMileage(getMileageRangeFromParams(params));
    setCurrentPage(1);

    const query = params.toString();
    navigate(query ? `/cars/${aiCategory}?${query}` : `/cars/${aiCategory}`);

    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSaveCar = async (carId) => {
    if (!localStorage.getItem("token")) {
      setMessageType("warning");
      setMessage("Please sign in to save this car.");
      return;
    }

    const data = await saveCar(carId);
    setMessageType(data.success ? "success" : "warning");
    setMessage(data.message || (data.success ? "Car saved." : "Could not save car."));
  };

  const handleSaveSearch = async () => {
    if (!localStorage.getItem("token")) {
      setMessageType("warning");
      setMessage("Please sign in to save this search.");
      return;
    }

    const data = await createSavedSearch({
      name: `${category || "All"} search`,
      bodyType: category && category !== "all" ? category : undefined,
      make: make !== "All" ? make : undefined,
      minPrice,
      maxPrice,
      fuelType: fuelType !== "All" ? fuelType : undefined,
      search: searchParams.get("search") || undefined,
    });

    setMessageType(data.success ? "success" : "warning");
    setMessage(data.message || (data.success ? "Search saved." : "Could not save search."));
  };

  return (
    <main className="cars-page">
      <section className="cars-header">
        <div>
          <p className="breadcrumb-text">Cars for Sale / {category || "all"}</p>
          <h1>{categoryTitle}</h1>
        </div>

        <div className="sort-box">
          <span>Sort:</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="best">Best match</option>
            <option value="price-low">Lowest price</option>
            <option value="price-high">Highest price</option>
            <option value="mileage-low">Lowest mileage</option>
          </select>
        </div>
      </section>

      <section className="cars-layout">
        <aside className="filter-sidebar">
          <div className="filter-card result-card">
            <h3>{loading ? "Loading..." : `${filteredCars.length}+ results`}</h3>

            <button className="save-search-btn" onClick={handleSaveSearch}>
              Save search
            </button>

            {message && (
              <div className={`api-message ${messageType}`}>
                <p>{message}</p>
                {messageType === "warning" && (
                  <button type="button" onClick={() => navigate("/auth")}>
                    Sign in
                  </button>
                )}
              </div>
            )}

            <form className="ai-filter" onSubmit={handleAiSearch}>
              <input
                value={aiQuery}
                onChange={(event) => setAiQuery(event.target.value)}
                placeholder="Search in your own words..."
              />
              <button type="submit" aria-label="Search inventory">
                <FiSearch />
              </button>
            </form>

            <button className="clear-filter-btn" onClick={resetFilters}>
              Clear filters
            </button>
          </div>

          <div className="filter-card">
            <h3>Location</h3>

            <label>City</label>
            <FilterSelect
              value={city}
              options={cityOptions}
              onChange={setCity}
            />

            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              Include shippable listings
            </label>
          </div>

          <div className="filter-card basics-card">
            <h3>Basics</h3>

            <details open>
              <summary>Price</summary>

              <FilterSelect
                value={priceRange}
                options={priceRanges}
                onChange={setPriceRange}
              />
            </details>

            <details>
              <summary>Mileage</summary>

              <FilterSelect
                value={mileage}
                options={mileageRanges}
                onChange={setMileage}
              />
            </details>

            <details>
              <summary>New/Used</summary>

              <FilterSelect
                value={condition}
                options={conditionOptions}
                onChange={setCondition}
              />
            </details>

            <details>
              <summary>Make</summary>

              <FilterSelect
                value={make}
                options={makeOptions}
                onChange={setMake}
              />
            </details>

            <details>
              <summary>Fuel Type</summary>

              <FilterSelect
                value={fuelType}
                options={fuelTypeOptions}
                onChange={setFuelType}
              />
            </details>
          </div>
        </aside>

        <section className="cars-results-section" ref={resultsRef}>
          <div className="results-toolbar">
            <div>
              <span className="results-kicker">
                <FiSliders />
                Matching inventory
              </span>
              <h2>{loading ? "Finding cars..." : `${filteredCars.length} vehicles found`}</h2>
            </div>

            {activeFilters.length > 0 && (
              <div className="active-filters">
                {activeFilters.map((item) => (
                  <span key={item}>{item}</span>
                ))}
                <button type="button" onClick={resetFilters}>
                  <FiX />
                  Clear all
                </button>
              </div>
            )}
          </div>

          <div className="cars-results">
            {loading ? (
              <div className="empty-state">
                <h2>Loading cars...</h2>
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="empty-state">
                <h2>No cars found</h2>
                <p>Try changing your filters.</p>
                <button onClick={resetFilters}>Reset filters</button>
              </div>
            ) : (
              paginatedCars.map((car) => (
                <article
                  className="car-card"
                  key={car.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/cars/detail/${car.id}`)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      navigate(`/cars/detail/${car.id}`);
                    }
                  }}
                >
                  <div className="car-img">
                    <img
                      src={getCarImageUrl(car)}
                      alt={car.title}
                      onError={(event) => {
                        event.currentTarget.src = "/img/car.jpg";
                      }}
                    />
                    <span className="sponsored-badge">Sponsored</span>
                    <button
                      className="save-car-btn"
                      aria-label={`Save ${car.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleSaveCar(car.id);
                      }}
                    >
                      <FiHeart />
                    </button>
                  </div>

                  <div className="car-info">
                    <div className="price-row">
                      <h2>${Number(car.price).toLocaleString()}</h2>
                      <small>{Number(car.mileage || 0).toLocaleString()} mi</small>
                    </div>

                    <p className="monthly">
                      Est. ${Math.round(Number(car.price) / 60).toLocaleString()}/mo
                    </p>

                    <h3>{car.title}</h3>

                    <div className="badges">
                      <span>Good Deal</span>
                      <span>
                        <FiZap />
                        {car.fuelType}
                      </span>
                    </div>

                    <p className="dealer">
                      Veloce Partner <b>Rating 4.8</b>
                    </p>

                    <button
                      className="availability"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/cars/detail/${car.id}`);
                      }}
                    >
                      Check Availability
                    </button>

                    <div className="location">
                      <FiMapPin />
                      Available in {getCarCity(car)}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {!loading && filteredCars.length > carsPerPage && (
            <div className="pagination-bar">
              <button
                type="button"
                disabled={visiblePage === 1}
                onClick={() => goToPage(Math.max(1, visiblePage - 1))}
              >
                <FiChevronLeft />
                Previous
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      className={page === visiblePage ? "active" : ""}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                disabled={visiblePage === totalPages}
                onClick={() =>
                  goToPage(Math.min(totalPages, visiblePage + 1))
                }
              >
                Next
                <FiChevronRight />
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default CarsPage;
