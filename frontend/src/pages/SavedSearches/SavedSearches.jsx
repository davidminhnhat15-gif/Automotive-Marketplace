import "./SavedSearches.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteSavedSearch,
  getSavedSearches,
} from "../../services/savedSearchesService";

function SavedSearches() {
  const navigate = useNavigate();
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadSavedSearches() {
      const data = await getSavedSearches();

      if (!ignore) {
        if (data.success) {
          setSavedSearches(data.savedSearches || []);
        } else {
          setMessage(data.message || "Please sign in to view saved searches.");
        }

        setLoading(false);
      }
    }

    loadSavedSearches();

    return () => {
      ignore = true;
    };
  }, []);

  const handleOpenSearch = (search) => {
    const params = new URLSearchParams();

    ["make", "model", "bodyType", "fuelType", "minPrice", "maxPrice", "search"].forEach(
      (key) => {
        if (search[key]) params.append(key, search[key]);
      },
    );

    navigate(`/cars/${search.bodyType || "all"}${params.toString() ? `?${params}` : ""}`);
  };

  const handleDelete = async (id) => {
    const data = await deleteSavedSearch(id);

    if (data.success) {
      setSavedSearches((searches) =>
        searches.filter((search) => String(search.id) !== String(id)),
      );
    }

    setMessage(data.message || "Saved searches updated.");
  };

  return (
    <main className="saved-page">
      <h1>Saved Searches</h1>

      {loading ? (
        <p className="empty-text">Loading saved searches...</p>
      ) : savedSearches.length === 0 ? (
        <p className="empty-text">
          {message || "You have no saved searches yet."}
        </p>
      ) : (
        <div className="message-list">
          {message && <p className="empty-text">{message}</p>}

          {savedSearches.map((search) => (
            <div className="message-card" key={search.id}>
              <h3>{search.name}</h3>
              <p>
                {[search.make, search.model, search.bodyType, search.fuelType]
                  .filter(Boolean)
                  .join(" / ") || "All cars"}
              </p>
              <small>
                {search.minPrice ? `$${Number(search.minPrice).toLocaleString()}+` : ""}
                {search.maxPrice ? ` up to $${Number(search.maxPrice).toLocaleString()}` : ""}
              </small>
              <div className="saved-actions">
                <button className="btn-outline" onClick={() => handleOpenSearch(search)}>
                  Open search
                </button>
                <button className="btn-purple" onClick={() => handleDelete(search.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default SavedSearches;
