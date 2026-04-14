import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ScrollToTop from "../components/ui/ScrollToTop";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { fetchTours,tourCategories } from "../data/tours";

// Import the new component files
import TourPageHero from "../components/tours/TourPageHero";
import TourCategories from "../components/tours/TourCategories";
import TourFilters from "../components/tours/TourFilters";
import ToursGrid from "../components/tours/ToursGrid";
import ToursCTA from "../components/tours/ToursCTA";

import { toast } from "react-toastify";

const ToursPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const [allTours,setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState(categoryParam || "all");
  const [sortBy, setSortBy] = useState("recommended");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchTours();
      setAllTours(data);
      setLoading(false);
    };

    load();
  }, []);

  const filteredTours = useMemo(() => {
    let updatedTours = [...allTours];

    // Filter
    if (activeCategory !== "all") {
      updatedTours = updatedTours.filter(
        (tour) =>
          tour.category?.trim().toLowerCase() ===
          activeCategory?.trim().toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        updatedTours.sort(
          (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
        );
        break;
      case "price-high":
        updatedTours.sort(
          (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
        );
        break;
      case "rating":
        updatedTours.sort(
          (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
        );
        break;
      case "duration":
        updatedTours.sort((a, b) => {
          const aDays = parseInt(a.duration) || 0;
          const bDays = parseInt(b.duration) || 0;
          return aDays - bDays;
        });
        break;
      default:
        updatedTours.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }

    return updatedTours;
  }, [activeCategory, sortBy, allTours]);


  return (
    <Layout>
      <TourPageHero />

      <TourCategories
        categories={tourCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <LoadingSpinner size="lg" text="Fetching tours..." />
          ) : (
            <>
              <TourFilters
                toursCount={filteredTours.length}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <ToursGrid
                tours={filteredTours}
                setActiveCategory={setActiveCategory}
              />
            </>
          )}
        </div>
      </section>

      <ToursCTA />

      <ScrollToTop />
    </Layout>
  );
};

export default ToursPage;
