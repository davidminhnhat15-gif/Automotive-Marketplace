import "./Research.css";
import { useNavigate } from "react-router-dom";

function Research() {
  const navigate = useNavigate();

  const guides = [
    {
      title: "Best EVs & Hybrids",
      text: "Explore efficient electric and hybrid vehicles.",
      path: "/cars/electric",
      img: "/img/styles/electric.png",
    },
    {
      title: "Best SUVs",
      text: "Find spacious and reliable SUVs for daily use.",
      path: "/cars/suv",
      img: "/img/styles/suv.png",
    },
    {
      title: "Best Sedans",
      text: "Compare comfortable sedans with great value.",
      path: "/cars/sedan",
      img: "/img/styles/sedan.png",
    },
  ];

  const tools = [
    {
      title: "Research Cars",
      text: "Browse the full inventory and filter by body style, price, make, and fuel type.",
      path: "/cars/all",
    },
    {
      title: "Compare Cars",
      text: "Pick two vehicles and review specs side-by-side before making a decision.",
      path: "/compare-cars",
    },
    {
      title: "Buying Guide",
      text: "Learn what to check before buying, from budget to safety and ownership cost.",
      path: "/buying-guide",
    },
  ];

  return (
    <main className="research-page">
      <section className="research-hero">
        <p>Veloce Research</p>
        <h1>Research Before You Buy</h1>
        <span>
          Compare vehicles, explore expert picks, and learn what matters before
          choosing your next car.
        </span>
      </section>

      <section className="research-section">
        <h2>Popular Research Tools</h2>

        <div className="tool-grid">
          {tools.map((tool) => (
            <div className="tool-card" key={tool.title}>
              <h3>{tool.title}</h3>
              <p>{tool.text}</p>
              <button onClick={() => navigate(tool.path)}>Start</button>
            </div>
          ))}
        </div>
      </section>

      <section className="research-section alt">
        <div className="research-title-row">
          <h2>Expert Picks</h2>
          <button onClick={() => navigate("/cars/all")}>View All</button>
        </div>

        <div className="guide-grid">
          {guides.map((guide) => (
            <div className="guide-card" key={guide.title}>
              <div className="guide-img">
                <img src={guide.img} alt={guide.title} />
              </div>

              <div>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <button onClick={() => navigate(guide.path)}>Explore</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="research-article">
        <div>
          <h2>How to choose the right car</h2>
          <p>
            Start with your budget, driving needs, fuel preference, safety
            features, and long-term ownership cost.
          </p>
          <button onClick={() => navigate("/cars/all")}>Browse Cars</button>
        </div>
      </section>
    </main>
  );
}

export default Research;
