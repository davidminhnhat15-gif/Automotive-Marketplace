import "./Sell.css";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Sell() {
  const navigate = useNavigate();
  const location = useLocation();
  const heroRef = useRef(null);
  const [openVinModal, setOpenVinModal] = useState(false);
  const [listingMessage, setListingMessage] = useState("");
  const [sellerCar, setSellerCar] = useState({
    make: "",
    model: "",
    trim: "",
    year: "",
    mileage: "",
    fuelType: "",
    city: "",
    price: "",
    phone: "",
    imageUrl: "",
  });
  const cities = [
    "Ha Noi",
    "Ho Chi Minh",
    "Hai Phong",
    "Da Nang",
    "Quang Ninh",
  ];
  const makes = [
    "Toyota",
    "Honda",
    "Hyundai",
    "Kia",
    "Nissan",
    "Mazda",
    "Ford",
    "BMW",
    "Mercedes-Benz",
    "Tesla",
    "VinFast",
  ];
  const fuelTypes = ["Gasoline", "Hybrid", "Electric", "Plug-in Hybrid"];
  const years = Array.from({ length: 16 }, (_, index) => String(2026 - index));

  const handleListingChange = (field, value) => {
    setSellerCar((current) => ({ ...current, [field]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      handleListingChange("imageUrl", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateListing = (event) => {
    event.preventDefault();

    if (
      !sellerCar.make ||
      !sellerCar.model ||
      !sellerCar.year ||
      !sellerCar.mileage ||
      !sellerCar.fuelType ||
      !sellerCar.city ||
      !sellerCar.price ||
      !sellerCar.imageUrl
    ) {
      setListingMessage("Please fill in all required vehicle details.");
      return;
    }

    const listing = {
      id: `seller-${Date.now()}`,
      title: `${sellerCar.year} ${sellerCar.make} ${sellerCar.model}`,
      make: sellerCar.make,
      model: sellerCar.model,
      trim: sellerCar.trim,
      year: Number(sellerCar.year),
      price: Number(sellerCar.price),
      mileage: Number(sellerCar.mileage),
      bodyType: "used",
      condition: "Used",
      fuelType: sellerCar.fuelType,
      location: sellerCar.city,
      city: sellerCar.city,
      phone: sellerCar.phone,
      imageUrl: sellerCar.imageUrl,
      description: `${sellerCar.trim || sellerCar.model} listed by a private seller in ${sellerCar.city}.`,
      createdAt: new Date().toISOString(),
    };

    const currentListings = JSON.parse(
      localStorage.getItem("veloce_seller_cars") || "[]",
    );

    localStorage.setItem(
      "veloce_seller_cars",
      JSON.stringify([listing, ...currentListings]),
    );

    setListingMessage("Your used car listing is live.");
    navigate("/cars/all?condition=Used");
  };

  useEffect(() => {
    if (location.state?.scrollToTop) {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState({}, "");
    }
  }, [location.state]);

  const reviews = [
    {
      text: "Provides security and assurance that all details are handled professionally. Will use again!",
      name: "Kathryn Nguyen, Ha Noi",
      img: "/img/user1.jpg",
    },
    {
      text: "The most enjoyable process I’ve ever had buying a vehicle. Super smooth!",
      name: "Tony Pham, Da Nang",
      img: "/img/user2.jpg",
    },
    {
      text: "First time using this platform and I’m impressed. Easy and fast process.",
      name: "Quoc Huy Nguyen, Ho Chi Minh",
      img: "/img/user3.jpg",
    },
    {
      text: "Great experience selling my car. Everything went smoothly!",
      name: "Phuong Linh Pham, Quang Ninh",
      img: "/img/user4.jpg",
    },
  ];

  const loopReviews = [...reviews, ...reviews];

  const works = [
    [
      "01",
      "🚗",
      "List Your Car",
      "Create a standout listing and show your car to serious buyers.",
    ],
    [
      "02",
      "💬",
      "Interact with Buyers",
      "Chat, schedule test drives, and manage offers in one place.",
    ],
    [
      "03",
      "🛒",
      "Sell Completely Online",
      "We help with checkout, documents, and secure payment transfer.",
    ],
    [
      "04",
      "💸",
      "Get Paid",
      "Complete the transfer and receive money safely to your bank account.",
    ],
  ];

  const services = [
    [
      "🛡️",
      "Fraud Prevention",
      "Buyer verification and smart tools help protect you from scams.",
    ],
    [
      "💳",
      "Secure Payment",
      "We verify the buyer’s payment before the vehicle is transferred.",
    ],
    ["📄", "Title Transfer", "Guidance for safe and legal ownership transfer."],
    [
      "🤝",
      "Sale Facilitation",
      "We help you complete key selling requirements smoothly.",
    ],
    [
      "🛒",
      "Online Checkout",
      "Your buyer can complete the purchase online with less hassle.",
    ],
    [
      "✅",
      "Seller Support",
      "Extra help when something needs attention during the sale.",
    ],
  ];

  const faqs = [
    {
      q: "Why should I sell my car with Veloce?",
      a: [
        "Schedule an inspection with Veloce or your preferred location.",
        "Transparent valuation based on market data.",
        "Fast paperwork processing and secure payment.",
        "Your personal information is fully protected.",
      ],
    },
    {
      q: "How does the car selling process work?",
      a: [
        "Step 1: Enter your car details and request a valuation.",
        "Step 2: Receive a suggested price based on your vehicle.",
        "Step 3: Connect with buyers and finalize the deal.",
        "Step 4: Get paid securely after ownership transfer.",
      ],
    },
    {
      q: "Why can I get a higher price when selling my car?",
      a: [
        "No middleman fees.",
        "Access to multiple buyers increases competition.",
        "Smart pricing based on real market data.",
      ],
    },
    {
      q: "What documents do I need to prepare before selling my car?",
      a: [
        "Vehicle registration document.",
        "Personal ID or passport.",
        "Insurance if available.",
        "Ownership or title documents.",
      ],
    },
    {
      q: "What payment methods are available for car transactions?",
      a: ["Secure bank transfer after ownership transfer is completed."],
    },
  ];

  return (
    <main className="sell-page">
      <section className="sell-hero" ref={heroRef}>
        <div className="sell-card">
          <div className="sell-logo-text">PRIVATE SELLER Exchange</div>

          <h1>Sell Your Car</h1>
          <p className="listing-fee">Listing fee: $9–$49*</p>

          <form className="sell-listing-form" onSubmit={handleCreateListing}>
            <div className="sell-form-grid">
              <label>
                Make
                <select
                  value={sellerCar.make}
                  onChange={(event) =>
                    handleListingChange("make", event.target.value)
                  }
                >
                  <option value="">Choose make</option>
                  {makes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Model
                <input
                  placeholder="Example: Camry"
                  value={sellerCar.model}
                  onChange={(event) =>
                    handleListingChange("model", event.target.value)
                  }
                />
              </label>

              <label>
                Trim
                <input
                  placeholder="Example: SE"
                  value={sellerCar.trim}
                  onChange={(event) =>
                    handleListingChange("trim", event.target.value)
                  }
                />
              </label>

              <label>
                Year
                <select
                  value={sellerCar.year}
                  onChange={(event) =>
                    handleListingChange("year", event.target.value)
                  }
                >
                  <option value="">Choose year</option>
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Mileage
                <input
                  type="number"
                  min="0"
                  placeholder="Example: 42000"
                  value={sellerCar.mileage}
                  onChange={(event) =>
                    handleListingChange("mileage", event.target.value)
                  }
                />
              </label>

              <label>
                Fuel
                <select
                  value={sellerCar.fuelType}
                  onChange={(event) =>
                    handleListingChange("fuelType", event.target.value)
                  }
                >
                  <option value="">Choose fuel</option>
                  {fuelTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                City
                <select
                  value={sellerCar.city}
                  onChange={(event) =>
                    handleListingChange("city", event.target.value)
                  }
                >
                  <option value="">Choose city</option>
                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Asking price
                <input
                  type="number"
                  min="1"
                  placeholder="Example: 15900"
                  value={sellerCar.price}
                  onChange={(event) =>
                    handleListingChange("price", event.target.value)
                  }
                />
              </label>

              <label>
                Phone
                <input
                  placeholder="096xxxxxxx"
                  value={sellerCar.phone}
                  onChange={(event) =>
                    handleListingChange("phone", event.target.value)
                  }
                />
              </label>

              <label className="sell-image-field">
                Car image
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {sellerCar.imageUrl && (
              <img
                className="sell-image-preview"
                src={sellerCar.imageUrl}
                alt="Car preview"
              />
            )}

            {listingMessage && <p className="sell-form-message">{listingMessage}</p>}

            <button className="sell-main-btn" type="submit">
              Publish Used Car
            </button>
          </form>

          <p className="signin-text">
            Already have an ad?{" "}
            <button type="button" onClick={() => navigate("/auth")}>
              Sign In
            </button>
          </p>
        </div>
      </section>

      <section className="works-section">
        <div className="section-header">
          <span>Simple Process</span>
          <h2>How it Works</h2>
          <p>
            List your car, talk with buyers, sell online, and get paid safely.
          </p>
        </div>

        <div className="works-grid">
          {works.map((item) => (
            <div className="work-card" key={item[0]}>
              <span className="step-badge">Step {item[0]}</span>
              <div className="work-icon">{item[1]}</div>
              <h3>{item[2]}</h3>
              <p>{item[3]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section">
        <div className="section-header">
          <span>Seller Protection</span>
          <h2>Explore Our Services</h2>
          <p>
            We support your sale from verification to payment and title
            transfer.
          </p>
        </div>

        <div className="services-grid">
          {services.map((item) => (
            <div className="service-card" key={item[1]}>
              <div className="service-icon">{item[0]}</div>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="trusted-section">
        <h2>Trusted by Car Owners Across the Country</h2>

        <div className="review-slider">
          <div className="review-track">
            {loopReviews.map((item, index) => (
              <div className="review-card" key={index}>
                <p>"{item.text}"</p>

                <div className="review-user">
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Sell? List Your Car Now.</h2>
          <p>Add your car details, upload a photo, and publish it as a used listing.</p>

          <button
            type="button"
            onClick={() =>
              heroRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          >
            Create Used Listing
          </button>

          <small>
            Already have an ad?{" "}
            <button type="button" onClick={() => navigate("/auth")}>
              Sign In
            </button>
          </small>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions About Selling a Car</h2>

        {faqs.map((item, i) => (
          <details key={i}>
            <summary>{item.q}</summary>

            <div className="faq-answer">
              {item.a.map((line, index) => (
                <p key={index}>- {line}</p>
              ))}
            </div>
          </details>
        ))}
      </section>
      {openVinModal && (
        <div className="vin-modal-overlay">
          <div className="vin-modal">
            <div className="vin-modal-header">
              <h3>Where Can I Find My VIN?</h3>
              <button onClick={() => setOpenVinModal(false)}>×</button>
            </div>

            <div className="vin-modal-body">
              <h4>What is a VIN?</h4>
              <p>
                A Vehicle Identification Number (VIN) is a unique number for
                your car. It is 17 characters long and will look like this:
              </p>

              <div className="vin-example">JTEZT17RX58088469</div>

              <h4>Where is it located?</h4>
              <p>You can find your VIN on the car itself.</p>

              <div className="vin-location-grid">
                <div>
                  <img
                    src="/img/vin-located.png"
                    alt=""
                    className="vin-location-img"
                  />
                </div>
              </div>
            </div>

            <div className="vin-modal-footer">
              <button onClick={() => setOpenVinModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Sell;
