import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ChatBot from "./components/ChatBot/ChatBot";

import Home from "./pages/Home/Home";
import Buy from "./pages/Buy/Buy";
import Sell from "./pages/Sell/Sell";
import SellGuide from "./pages/SellGuide/SellGuide";
import BuyingGuide from "./pages/BuyingGuide/BuyingGuide";
import Research from "./pages/Research/Research";
import CarsPage from "./pages/CarsPage/CarsPage";
import CarDetail from "./pages/CarDetail/CarDetail";

import SavedCars from "./pages/SavedCars/SavedCars";
import SavedSearches from "./pages/SavedSearches/SavedSearches";
import SavedComparison from "./pages/SavedComparison/SavedComparison";
import Messages from "./pages/Messages/Messages";
import Auth from "./pages/Auth/Auth";
import CompareCars from "./pages/CompareCars/CompareCars";
import NotFound from "./pages/NotFound/NotFound";

function CarsPageRoute() {
  const location = useLocation();

  return <CarsPage key={`${location.pathname}${location.search}`} />;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/sell/guide" element={<SellGuide />} />
        <Route path="/buying-guide" element={<BuyingGuide />} />
        <Route path="/research" element={<Research />} />
        <Route path="/cars/:category" element={<CarsPageRoute />} />
        <Route path="/cars/detail/:id" element={<CarDetail />} />
        <Route
          path="/saved-cars"
          element={
            <ProtectedRoute title="Sign in to view saved cars">
              <SavedCars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-searches"
          element={
            <ProtectedRoute title="Sign in to view saved searches">
              <SavedSearches />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-comparison"
          element={
            <ProtectedRoute title="Sign in to view saved comparisons">
              <SavedComparison />
            </ProtectedRoute>
          }
        />
        <Route path="/messages" element={<Messages />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/compare-cars" element={<CompareCars />} />
        <Route path="/compare-cars/results" element={<CompareCars />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <ChatBot />
    </>
  );
}

export default App;
