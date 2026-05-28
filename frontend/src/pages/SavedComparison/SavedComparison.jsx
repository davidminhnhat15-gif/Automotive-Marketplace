import "./SavedComparison.css";

function SavedComparison() {
  const comparison = JSON.parse(localStorage.getItem("savedComparison")) || [];

  return (
    <main className="saved-page">
      <h1>Saved Comparison</h1>

      {comparison.length === 0 ? (
        <p className="empty-text">No cars added for comparison yet.</p>
      ) : (
        <div className="compare-grid">
          {comparison.map((car) => (
            <div className="saved-card" key={car.id}>
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>{car.price}</p>
              <p>{car.engine}</p>
              <p>{car.fuel}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default SavedComparison;
