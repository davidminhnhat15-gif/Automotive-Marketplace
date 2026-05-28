import "./BuyingGuide.css";
import { Link } from "react-router-dom";

const guideSections = [
  {
    title: "1. Paperwork & History",
    items: [
      {
        label: "VIN Check",
        text: "Check the Vehicle Identification Number on a service like CARFAX to uncover hidden accidents, flood damage, salvage titles, or open recalls.",
      },
      {
        label: "Service Records",
        text: "Request the physical logbook or receipts to ensure the vehicle has received regular oil changes and scheduled maintenance.",
      },
    ],
  },
  {
    title: "2. Exterior & Bodywork",
    items: [
      {
        label: "Panel Alignment",
        text: "Walk around the vehicle and check the gaps between the doors, hood, and trunk. Uneven gaps can indicate the car has been in an accident and poorly repaired.",
      },
      {
        label: "Paint & Rust",
        text: "Look for paint color variations or overspray, and check under the wheel wells and door sills for rust or blistering.",
      },
      {
        label: "Glass & Lights",
        text: "Inspect all windows and mirrors for cracks. Turn on all exterior and interior lights to verify that headlights, taillights, turn signals, and brake lights are fully functional.",
      },
    ],
  },
  {
    title: "3. Tires & Suspension",
    items: [
      {
        label: "Tread Depth & Wear",
        text: "Check that tires are wearing evenly. Uneven wear often means the car has a suspension problem or poor wheel alignment.",
      },
      {
        label: "Test the Bounce",
        text: "Push down firmly on each corner of the car. It should bounce once and settle. If it continues to bounce, the struts or shocks are likely worn out.",
      },
    ],
  },
  {
    title: "4. Under the Hood",
    items: [
      {
        label: "Fluids",
        text: "Pull the oil dipstick; the oil should be amber or brown. If it is milky, like chocolate milk, it points to a blown head gasket. Check the coolant reservoir for rusty residue or signs of an oil leak.",
      },
      {
        label: "Belts & Hoses",
        text: "Visually inspect the serpentine belt for signs of fraying or major cracks.",
      },
      {
        label: "Safety Restraints",
        text: "Pull the seatbelts all the way out. They should retract smoothly and lock when you tug them sharply.",
      },
    ],
  },
  {
    title: "5. Test Drive",
    items: [
      {
        label: "Starting",
        text: "The car should start easily when the engine is completely cold. Listen for any knocking, tapping, or grinding noises.",
      },
      {
        label: "Driving Feel",
        text: "Drive the car on both city streets and the highway. The car should track straight on a flat road without pulling to one side.",
      },
      {
        label: "Brakes",
        text: "Test the brakes in a safe spot. The car should come to a straight, smooth stop without grinding noises, squeaking, or a spongy brake pedal.",
      },
      {
        label: "Electronics",
        text: "Turn on the air conditioning, heater, radio, windows, and wipers to make sure all cabin accessories work as intended.",
      },
    ],
  },
];

function BuyingGuide() {
  return (
    <main className="buying-guide-page">
      <div className="buying-guide-container">
        <nav className="buying-guide-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/research">Research</Link>
          <span>/</span>
          <b>Buying Guide</b>
        </nav>

        <section className="buying-guide-hero">
          <p>Used car inspection checklist</p>
          <h1>What to check before buying a car</h1>
          <span>
            A proper vehicle inspection breaks down into a few core areas:
            history, bodywork, tires, mechanical condition, and the test drive.
          </span>
        </section>

        <section className="inspection-overview">
          <div>
            <strong>5</strong>
            <span>inspection areas</span>
          </div>
          <div>
            <strong>15+</strong>
            <span>checks to complete</span>
          </div>
          <div>
            <strong>1</strong>
            <span>confident decision</span>
          </div>
        </section>

        <section className="guide-layout">
          <aside className="guide-sidebar">
            <h2>Checklist</h2>
            {guideSections.map((section) => (
              <a key={section.title} href={`#${section.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}`}>
                {section.title}
              </a>
            ))}
          </aside>

          <article className="guide-article">
            {guideSections.map((section) => (
              <section
                className="guide-section-card"
                id={section.title.toLowerCase().replaceAll(" ", "-").replaceAll(".", "")}
                key={section.title}
              >
                <h2>{section.title}</h2>

                <div className="guide-check-list">
                  {section.items.map((item) => (
                    <div className="guide-check-item" key={item.label}>
                      <span>{item.label}</span>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="guide-section-card resource-card">
              <h2>Helpful resources</h2>
              <p>
                For tips on how to inspect body panels and spot hidden
                collision damage:
              </p>

              <div className="youtube-resource-card">
                <div className="youtube-video-frame">
                  <iframe
                    src="https://www.youtube.com/embed/yirKKCep_5w"
                    title="Simple Checks You Should Do before Buying ANY Car"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="youtube-video-copy">
                  <span>YouTube Shorts</span>
                  <h3>Simple Checks You Should Do before Buying ANY Car</h3>
                  <p>
                    A quick visual guide you can use before inspecting a used
                    car in person.
                  </p>
                  <a
                    href="https://youtube.com/shorts/yirKKCep_5w?si=3paET4bISK8OgS74"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
}

export default BuyingGuide;
