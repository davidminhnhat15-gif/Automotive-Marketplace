import "./CompareCars.css";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiChevronDown, FiX } from "react-icons/fi";
import { getCars } from "../../services/carService";

const comparisonStorageKey = "savedComparison";
const emptySlots = [null, null];
const popularCategoryConfig = [
  {
    title: "Hybrids/electric cars",
    match: (car) =>
      ["hybrid", "electric", "plug-in hybrid"].includes(
        String(car.fuelType || "").toLowerCase(),
      ),
  },
  {
    title: "Luxury cars",
    match: (car) => normalizeBodyType(car.bodyType) === "Luxury" || Number(car.price || 0) >= 65000,
  },
  {
    title: "Sedans",
    match: (car) => normalizeBodyType(car.bodyType) === "Sedan",
  },
  {
    title: "SUVs",
    match: (car) => normalizeBodyType(car.bodyType) === "SUV",
  },
  {
    title: "Wagons",
    match: (car) => normalizeBodyType(car.bodyType) === "Wagon",
  },
  {
    title: "Convertibles",
    match: (car) => normalizeBodyType(car.bodyType) === "Convertible",
  },
];

function formatPrice(price) {
  return `$${Number(price || 0).toLocaleString()}`;
}

function normalizeBodyType(bodyType = "") {
  const value = bodyType.toLowerCase();

  if (value.includes("suv") || value.includes("crossover")) return "SUV";
  if (value.includes("truck")) return "Truck";
  if (value.includes("convertible")) return "Convertible";
  if (value.includes("wagon")) return "Wagon";
  if (value.includes("electric")) return "Electric";
  if (value.includes("luxury")) return "Luxury";
  return "Sedan";
}

function buildSpecs(car) {
  const price = Number(car.price || 0);
  const year = Number(car.year || 2024);
  const bodyType = normalizeBodyType(car.bodyType);
  const fuelType = car.fuelType || "Gasoline";
  const premium = price >= 65000;
  const electric = fuelType.toLowerCase().includes("electric");
  const hybrid = fuelType.toLowerCase().includes("hybrid");
  const suv = bodyType === "SUV";
  const truck = bodyType === "Truck";

  const engineType = electric
    ? "Dual electric motor"
    : hybrid
      ? "Hybrid 2.5L I4"
      : premium
        ? "Turbocharged gas V6"
        : "Gas 2.0L I4";
  const horsepower = electric
    ? premium
      ? "402 hp"
      : "266 hp"
    : premium
      ? "382 hp"
      : hybrid
        ? "208 hp"
        : "203 hp";
  const mpg = electric
    ? "112 MPGe"
    : hybrid
      ? "44 City / 41 Hwy"
      : suv
        ? "25 City / 32 Hwy"
        : "31 City / 40 Hwy";
  const driveType = truck || suv || premium ? "All Wheel Drive" : "Front Wheel Drive";
  const seats = truck || suv ? "5" : bodyType === "Convertible" ? "4" : "5";
  const wheelSize = premium ? "20-inch alloy wheels" : suv ? "19-inch alloy wheels" : "18-inch alloy wheels";

  return {
    highlights: [
      ["Starting price", formatPrice(price)],
      ["Consumer rating", premium ? "4.9 / 5" : "4.8 / 5"],
      ["Engine type", engineType],
      ["MPG", mpg],
      ["Horsepower", horsepower],
      ["Drive type", driveType],
      ["Seating capacity", seats],
      ["Basic warranty", `${Math.max(2, 2029 - year)} yr / 50,000 mi`],
    ],
    engine: [
      ["Engine", engineType],
      ["Transmission", electric ? "Single-speed automatic" : "8-speed automatic"],
      ["Torque", electric ? "317 lb-ft" : premium ? "369 lb-ft" : "184 lb-ft"],
      ["Fuel system", electric ? "Battery electric" : hybrid ? "Hybrid direct injection" : "Direct injection"],
      ["Drivetrain", driveType],
    ],
    "tires-wheels": [
      ["Wheels", wheelSize],
      ["Tire type", premium ? "Performance all-season" : "All-season"],
      ["Front tire size", premium ? "245/40R20" : "225/45R18"],
      ["Rear tire size", premium ? "245/40R20" : "225/45R18"],
      ["Spare tire", electric ? "Tire repair kit" : "Temporary spare"],
    ],
    safety: [
      ["Airbags", "Front, side, and curtain airbags"],
      ["Rear camera", "Standard"],
      ["Blind spot monitor", premium || suv ? "Standard" : "Available"],
      ["Lane keeping assist", "Standard"],
      ["Automatic emergency braking", "Standard"],
    ],
    brakes: [
      ["Brake type", "4-wheel disc brakes"],
      ["Front brakes", premium ? "Ventilated performance disc" : "Ventilated disc"],
      ["Rear brakes", "Solid disc"],
      ["ABS", "Standard"],
      ["Brake assist", "Standard"],
    ],
    measurements: [
      ["Length", truck ? "232.0 in" : suv ? "185.0 in" : "192.1 in"],
      ["Width", truck ? "80.0 in" : suv ? "74.0 in" : "72.4 in"],
      ["Height", truck ? "75.6 in" : suv ? "66.1 in" : "56.9 in"],
      ["Wheelbase", truck ? "145.0 in" : suv ? "108.9 in" : "111.2 in"],
      ["Cargo volume", suv ? "37.6 cu.ft." : truck ? "52.8 cu.ft." : "15.1 cu.ft."],
    ],
  };
}

function buildComparisonGroups(cars) {
  return popularCategoryConfig.map((category) => {
    const categoryCars = cars
      .filter(category.match)
      .sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    const pairs = [];

    for (let index = 0; index < categoryCars.length - 1; index += 2) {
      pairs.push([categoryCars[index], categoryCars[index + 1]]);
    }

    return {
      title: category.title,
      pairs: pairs.slice(0, 6),
    };
  });
}

const sections = [
  { id: "highlights", title: "Highlights" },
  { id: "engine", title: "Engine" },
  { id: "tires-wheels", title: "Tires & Wheels" },
  { id: "safety", title: "Safety" },
  { id: "brakes", title: "Brakes" },
  { id: "measurements", title: "Measurements" },
];

function CompareCars() {
  const navigate = useNavigate();
  const location = useLocation();
  const isResultPage = location.pathname.includes("/results");
  const [allCars, setAllCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState(() =>
    location.pathname.includes("/results")
      ? JSON.parse(localStorage.getItem(comparisonStorageKey) || "[]").slice(0, 2)
      : [],
  );
  const [draftSelections, setDraftSelections] = useState([
    { make: "", model: "", year: "" },
    { make: "", model: "", year: "" },
  ]);
  const [hideSimilarities, setHideSimilarities] = useState(false);
  const [openComparisonGroups, setOpenComparisonGroups] = useState({});
  const [openSections, setOpenSections] = useState({
    highlights: true,
    engine: false,
    "tires-wheels": false,
    safety: false,
    brakes: false,
    measurements: false,
  });

  const comparisonSlots = useMemo(
    () => [...selectedCars, ...emptySlots].slice(0, 2),
    [selectedCars],
  );
  const selectedCount = selectedCars.filter(Boolean).length;

  const carSpecs = useMemo(
    () => selectedCars.map((car) => buildSpecs(car)),
    [selectedCars],
  );
  const comparisonGroups = useMemo(
    () => buildComparisonGroups([...allCars, ...selectedCars]),
    [allCars, selectedCars],
  );

  useEffect(() => {
    let ignore = false;

    async function loadCars() {
      const data = await getCars();

      if (!ignore && data.success) {
        setAllCars(data.cars || []);
      }
    }

    loadCars();

    return () => {
      ignore = true;
    };
  }, []);

  const removeCar = (carId) => {
    const nextCars = selectedCars.filter((car) => String(car.id) !== String(carId));
    setSelectedCars(nextCars);
    localStorage.setItem(comparisonStorageKey, JSON.stringify(nextCars));
  };

  const getMakes = () =>
    [...new Set(allCars.map((car) => car.make).filter(Boolean))].sort();

  const getModels = (make) =>
    [
      ...new Set(
        allCars
          .filter((car) => !make || car.make === make)
          .map((car) => car.model)
          .filter(Boolean),
      ),
    ].sort();

  const getYears = (make, model) =>
    [
      ...new Set(
        allCars
          .filter((car) => (!make || car.make === make) && (!model || car.model === model))
          .map((car) => car.year)
          .filter(Boolean),
      ),
    ].sort((a, b) => Number(b) - Number(a));

  const updateSelectedCar = (slotIndex, draft) => {
    const matchedCar = allCars.find(
      (car) =>
        car.make === draft.make &&
        car.model === draft.model &&
        String(car.year) === String(draft.year),
    );

    if (!matchedCar) {
      return;
    }

    const nextCars = [...selectedCars];
    nextCars[slotIndex] = matchedCar;
    const compactCars = nextCars.filter(Boolean).slice(0, 2);

    setSelectedCars(compactCars);
    localStorage.setItem(comparisonStorageKey, JSON.stringify(compactCars));
  };

  const handleSelectionChange = (slotIndex, field, value) => {
    setDraftSelections((current) => {
      const nextSelections = [...current];
      const currentDraft = nextSelections[slotIndex];
      const nextDraft = {
        ...currentDraft,
        [field]: value,
      };

      if (field === "make") {
        nextDraft.model = "";
        nextDraft.year = "";
      }

      if (field === "model") {
        nextDraft.year = "";
      }

      nextSelections[slotIndex] = nextDraft;

      if (nextDraft.make && nextDraft.model && nextDraft.year) {
        updateSelectedCar(slotIndex, nextDraft);
      }

      return nextSelections;
    });
  };

  const toggleSection = (sectionId) => {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  const toggleComparisonGroup = (title) => {
    setOpenComparisonGroups((current) => ({
      ...current,
      [title]: !current[title],
    }));
  };

  const getRowsForSection = (sectionId) => {
    const rows = (carSpecs[0]?.[sectionId] || []).map((row, index) => ({
      label: row[0],
      index,
    }));

    if (!hideSimilarities || selectedCount < 2) {
      return rows;
    }

    return rows.filter((row) => {
      const values = selectedCars.map(
        (_, carIndex) => carSpecs[carIndex][sectionId][row.index][1],
      );
      return new Set(values).size > 1;
    });
  };

  const chooseComparison = (firstCar, secondCar) => {
    const nextCars = [firstCar, secondCar].filter(Boolean).slice(0, 2);
    setSelectedCars(nextCars);
    localStorage.setItem(comparisonStorageKey, JSON.stringify(nextCars));
    navigate("/compare-cars/results");
  };

  const resultTitle =
    selectedCount >= 2
      ? `${selectedCars[0].title} vs. ${selectedCars[1].title}`
      : "Your car comparison";

  if (isResultPage) {
    return (
      <main className="compare-page compare-result-page">
        <div className="compare-container">
          <nav className="compare-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/research">Research</Link>
            <span>/</span>
            <Link to="/compare-cars">Compare cars</Link>
            <span>/</span>
            <b>{resultTitle}</b>
          </nav>

          <section className="compare-result-hero">
            <div>
              <h1>{resultTitle}</h1>
              <p>Review each vehicle side by side across price, engine, safety, brakes, wheels, and measurements.</p>
            </div>

            <button className="compare-outline-btn" onClick={() => navigate("/compare-cars")}>
              Back to compare
            </button>
          </section>

          {selectedCount === 0 ? (
            <section className="compare-empty-result">
              <h2>No cars selected yet</h2>
              <p>Choose a popular comparison or add cars from Shop All first.</p>
              <button onClick={() => navigate("/compare-cars")}>Choose cars</button>
            </section>
          ) : (
            <>
              <section className="result-car-grid" aria-label="Compared cars">
                {selectedCars.slice(0, 2).map((car) => (
                  <article className="result-car-card" key={car.id}>
                    <button
                      className="remove-compare"
                      aria-label={`Remove ${car.title}`}
                      onClick={() => removeCar(car.id)}
                    >
                      <FiX />
                    </button>

                    <div className="result-car-image">
                      <img src={car.imageUrl} alt={car.title} />
                    </div>

                    <div className="result-car-body">
                      <Link to={`/cars/detail/${car.id}`}>{car.title}</Link>
                      <strong>{formatPrice(car.price)}</strong>
                      <span>{car.bodyType || "Vehicle"}</span>
                    </div>
                  </article>
                ))}
              </section>

              <section className="compare-specs">
                <div className="compare-tools">
                  <label className="similarity-toggle">
                    <span>Hide similarities</span>
                    <input
                      type="checkbox"
                      checked={hideSimilarities}
                      onChange={(event) => setHideSimilarities(event.target.checked)}
                    />
                  </label>
                </div>

                {sections.map((section) => {
                  const rows = getRowsForSection(section.id);

                  return (
                    <div className="spec-section" key={section.id}>
                      <button
                        className="spec-section-header"
                        onClick={() => toggleSection(section.id)}
                      >
                        <span>{section.title}</span>
                        <FiChevronDown className={openSections[section.id] ? "open" : ""} />
                      </button>

                      {openSections[section.id] && (
                        <div className="spec-table">
                          {rows.length === 0 ? (
                            <p className="all-similar">All visible values are similar.</p>
                          ) : (
                            rows.map((row) => (
                              <div className="spec-row" key={`${section.id}-${row.label}`}>
                                <div className="spec-label">{row.label}</div>

                                {comparisonSlots.map((car, carIndex) => (
                                  <div
                                    className="spec-value"
                                    key={`${section.id}-${row.label}-${car?.id || carIndex}`}
                                  >
                                    {car
                                      ? carSpecs[carIndex]?.[section.id]?.[row.index]?.[1] || "-"
                                      : "-"}
                                  </div>
                                ))}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            </>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="compare-page">
      <div className="compare-container">
        <nav className="compare-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/research">Research & reviews</Link>
          <span>/</span>
          <b>Compare cars side by side</b>
        </nav>

        <section className="compare-intro">
          <h1>Compare cars</h1>
          <p>Choose two cars to compare side-by-side.</p>
        </section>

        <section className="compare-start-grid" aria-label="Selected cars">
          {comparisonSlots.map((car, index) =>
            car ? (
              <article className="compare-select-card" key={car.id}>
                <button
                  className="remove-compare"
                  aria-label={`Remove ${car.title}`}
                  onClick={() => removeCar(car.id)}
                >
                  <FiX />
                </button>

                <div className="compare-select-image">
                  <img src={car.imageUrl} alt={car.title} />
                </div>

                <div className="compare-select-body">
                  <div className="selected-car-summary">
                    <span>{index === 0 ? "First car" : "Second car"}</span>
                    <h2>{car.title}</h2>
                  </div>

                  <label>
                    <span>Make</span>
                    <select
                      value={car.make || ""}
                      onChange={(event) =>
                        handleSelectionChange(index, "make", event.target.value)
                      }
                    >
                      <option value="">Choose a make</option>
                      {getMakes().map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Model</span>
                    <select
                      value={car.model || ""}
                      onChange={(event) =>
                        handleSelectionChange(index, "model", event.target.value)
                      }
                    >
                      <option value="">Choose a model</option>
                      {getModels(car.make).map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Year</span>
                    <select
                      value={car.year || ""}
                      onChange={(event) =>
                        handleSelectionChange(index, "year", event.target.value)
                      }
                    >
                      <option value="">Choose a year</option>
                      {getYears(car.make, car.model).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            ) : (
              <article
                className="compare-select-card empty"
                key={`empty-${index}`}
              >
                <div className="compare-select-image">
                  <img src="/img/car.jpg" alt="Car placeholder" />
                </div>

                <div className="compare-select-body">
                  <h2>{index === 0 ? "Add first car" : "Add second car"}</h2>

                  <label>
                    <span>Make</span>
                    <select
                      value={draftSelections[index].make}
                      onChange={(event) =>
                        handleSelectionChange(index, "make", event.target.value)
                      }
                    >
                      <option value="">Choose a make</option>
                      {getMakes().map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Model</span>
                    <select
                      value={draftSelections[index].model}
                      disabled={!draftSelections[index].make}
                      onChange={(event) =>
                        handleSelectionChange(index, "model", event.target.value)
                      }
                    >
                      <option value="">Choose a model</option>
                      {getModels(draftSelections[index].make).map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Year</span>
                    <select
                      value={draftSelections[index].year}
                      disabled={!draftSelections[index].model}
                      onChange={(event) =>
                        handleSelectionChange(index, "year", event.target.value)
                      }
                    >
                      <option value="">Choose a year</option>
                      {getYears(
                        draftSelections[index].make,
                        draftSelections[index].model,
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </article>
            ),
          )}
        </section>

        <div className="compare-action-row">
          <button
            className="see-comparison-btn"
            disabled={selectedCount < 2}
            onClick={() => navigate("/compare-cars/results")}
          >
            See the comparison
          </button>
        </div>

        <section className="popular-section">
          <div className="popular-heading">
            <p>Trending matchups</p>
            <h2>Popular car matchups</h2>
          </div>

          <div className="comparison-list">
            {comparisonGroups.map((category) => (
              <details key={category.title} open={!!openComparisonGroups[category.title]}>
                <summary
                  onClick={(event) => {
                    event.preventDefault();
                    toggleComparisonGroup(category.title);
                  }}
                >
                  {category.title}
                </summary>

                <div className="comparison-links">
                  {category.pairs.length > 0 ? (
                    category.pairs.map(([firstCar, secondCar]) => (
                      <button
                        key={`${firstCar.id}-${secondCar.id}`}
                        onClick={() => chooseComparison(firstCar, secondCar)}
                      >
                        {firstCar.title} vs. {secondCar.title}
                      </button>
                    ))
                  ) : (
                    <button onClick={() => navigate("/cars/all")}>
                      Browse cars in this category
                    </button>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

export default CompareCars;
