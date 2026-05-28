import { Link } from "react-router-dom";
import { createElement } from "react";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiBatteryCharging,
  FiGrid,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from "react-icons/fi";

const buyGroups = [
  {
    title: "Cars for Sale",
    links: [
      ["Shop All", "/cars/all", FiShoppingBag],
      ["Sedans", "/cars/sedan", FiActivity],
      ["SUVs", "/cars/suv", FiTruck],
      ["Electric Cars", "/cars/electric", FiBatteryCharging],
      ["Hybrid Cars", "/cars/hybrid", FiGrid],
    ],
  },
  {
    title: "Popular Categories",
    links: [
      ["Luxury Cars", "/cars/luxury", FiStar],
      ["Crossovers", "/cars/crossover", FiTruck],
      ["Wagons", "/cars/wagon", FiGrid],
      ["Convertibles", "/cars/convertible", FiActivity],
    ],
  },
];

const sellGroups = [
  {
    title: "Selling Resources",
    links: [
      ["Sell Your Car", "/sell", FiShoppingBag],
      ["How to Sell Your Car", "/sell/guide", FiShield],
    ],
  },
];

const researchGroups = [
  {
    title: "Tools",
    links: [
      ["Research Cars", "/research", FiBarChart2],
      ["Compare Cars", "/compare-cars", FiGrid],
    ],
  },
  {
    title: "Expert Picks",
    links: [
      ["Best EVs & Hybrids", "/cars/electric", FiBatteryCharging],
      ["Best SUVs", "/cars/suv", FiTruck],
      ["Best Sedans", "/cars/sedan", FiActivity],
    ],
  },
];

const menuContent = {
  buy: {
    eyebrow: "Browse",
    title: "Find the right car faster",
    text: "Search refined categories, compare popular body styles, and jump into curated listings.",
    cta: "View all inventory",
    ctaPath: "/cars/all",
    groups: buyGroups,
  },
  sell: {
    eyebrow: "Sell",
    title: "List with confidence",
    text: "Create a stronger listing, protect the transaction, and reach serious shoppers.",
    cta: "Start selling",
    ctaPath: "/sell",
    groups: sellGroups,
  },
  research: {
    eyebrow: "Research",
    title: "Choose with better data",
    text: "Compare models, explore expert picks, and understand the details before you buy.",
    cta: "Open research tools",
    ctaPath: "/research",
    groups: researchGroups,
  },
};

function MegaMenu({ menu, onClose }) {
  const content = menuContent[menu];

  if (!content) return null;

  return (
    <div className="mega-menu" onMouseLeave={onClose}>
      <div className="mega-menu-inner">
        <div className="mega-groups">
          {content.groups.map((group) => (
            <div className="mega-group" key={group.title}>
              <h4>{group.title}</h4>

              {group.links.map(([label, path, icon]) => (
                <Link to={path} onClick={onClose} key={label}>
                  <span className="mega-link-icon">
                    {createElement(icon)}
                  </span>
                  <span>{label}</span>
                  <FiArrowRight className="mega-link-arrow" />
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mega-feature">
          <span>{content.eyebrow}</span>
          <h3>{content.title}</h3>
          <p>{content.text}</p>
          <Link to={content.ctaPath} onClick={onClose}>
            {content.cta}
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
