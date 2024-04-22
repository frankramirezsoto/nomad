"use client";

import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { Box, Card, Skeleton, Stack } from "@chakra-ui/react";
import { IoSearchCircleSharp } from "react-icons/io5";
import BusinessCard from "./BusinessCard";
import TourCard from "./TourCard";

const BusinessAndToursSearch = ({ initialQuery = "" }) => {
  const [businesses, setBusinesses] = useState([]);
  const [tours, setTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  const [isLoadingBusinesses, setIsLoadingBusinesses] = useState(true);
  const [businessTypes, setBusinessTypes] = useState({});
  const [showTours, setShowTours] = useState(true);
  const [priceLimits, setPriceLimits] = useState({ min: 0, max: 1000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState({
    min: 0,
    max: 1000,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const tourResponse = await fetch("/api/tours/getAllTours").then(
        (response) => response.json()
      );
      if (tourResponse.data) {
        setTours(tourResponse.data);
        // Update initial price range based on fetched data if necessary
        const maxPrice = Math.max(
          ...tourResponse.data.map((tour) => tour.price_person)
        );
        setPriceLimits({ min: 0, max: maxPrice });
        setSelectedPriceRange({ min: 0, max: maxPrice });
      }
      setIsLoadingTours(false);
      const businessResponse = await fetch(
        "/api/business/getAllBusinesses"
      ).then((response) => response.json());
      if (businessResponse.data) {
        setBusinesses(businessResponse.data);
      }
      setIsLoadingBusinesses(false);

      if (businessResponse.data && tourResponse.data) {
        extractAndSetBusinessTypes(businessResponse.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoadingBusinesses(false);
    setIsLoadingTours(false);
  };

  const extractAndSetBusinessTypes = (businessData) => {
    const types = {};
    businessData.forEach((business) => {
      const { BusinessTypes } = business;
      if (BusinessTypes && !types[BusinessTypes.b_type_id]) {
        types[BusinessTypes.b_type_id] = {
          name: BusinessTypes.name,
          checked: true,
        };
      }
    });
    setBusinessTypes(types);
  };

  const handleCheckboxChange = (typeId) => {
    setBusinessTypes((prevTypes) => ({
      ...prevTypes,
      [typeId]: {
        ...prevTypes[typeId],
        checked: !prevTypes[typeId].checked,
      },
    }));
  };

  const toggleShowTours = () => {
    setShowTours(!showTours);
  };

  const handlePriceChange = (value, type) => {
    setSelectedPriceRange((prev) => ({ ...prev, [type]: Number(value) }));
  };

  const filteredToursPricing = tours.filter(
    (tour) =>
      tour.price_person >= selectedPriceRange.min &&
      tour.price_person <= selectedPriceRange.max
  );

  const filterBusinessData = (data, query) => {
    return data.filter((item) => {
      return (
        Object.keys(item).some((key) =>
          String(item[key]).toLowerCase().includes(query.toLowerCase())
        ) && businessTypes[item.b_type_id]?.checked
      );
    });
  };
  const filterTourData = (data, query) => {
    if (!query) return data;
    return data.filter((item) => {
      return Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const filteredBusinesses = filterBusinessData(businesses, searchQuery);
  const filteredTours = filterTourData(filteredToursPricing, searchQuery);

  const handleSearch = debounce((query) => {
    setSearchQuery(query);
  }, 300);

  return (
    <Box className="grid grid-cols-1 lg:grid-cols-4 gap-5">
      {/* Filters */}
      <Card className="card" p={7} rounded="3xl">
        <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
          <div className="absolute py-2 ps-2">
            <IoSearchCircleSharp size={50} color="teal" className="absolute" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={initialQuery}
            className="ps-16 pe-5 rounded-full w-full h-16 bg-transparent py-2 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-400 focus:border-teal-200"
          />
        </div>
        {isLoadingTours && isLoadingBusinesses ? (
          <Stack mt={30}>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            <div className="mb-5">
              <ul className="list-style-none ms-0 mt-5">
                {Object.entries(businessTypes).map(
                  ([typeId, { name, checked }]) => (
                    <li>
                      <label key={typeId}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCheckboxChange(typeId)}
                          className="accent-teal-600"
                        />{" "}
                        {name}
                      </label>
                    </li>
                  )
                )}

                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={showTours}
                      onChange={toggleShowTours}
                      className="accent-teal-600"
                    />{" "}
                    Tours
                  </label>
                </li>
              </ul>
            </div>
            {showTours ? (
              <div className="border border-1 rounded-lg p-5 text-sm">
                <p className="text-gray-500">*Tours only</p>
                <div>
                  <label>Tour Minimum Price: ${selectedPriceRange.min}</label>
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={selectedPriceRange.max}
                    value={selectedPriceRange.min}
                    onChange={(e) => handlePriceChange(e.target.value, "min")}
                  />
                </div>
                <div>
                  <label>Tour Maximum Price: ${selectedPriceRange.max}</label>
                  <input
                    type="range"
                    min={selectedPriceRange.min}
                    max={priceLimits.max}
                    value={selectedPriceRange.max}
                    onChange={(e) => handlePriceChange(e.target.value, "max")}
                  />
                </div>
              </div>
            ) : null}
          </>
        )}
      </Card>

      {isLoadingTours ? (
        <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <Skeleton
            className="min-h-72"
          />
          <Skeleton
            className="min-h-72"
          />
          <Skeleton
            className="min-h-72"
          />
          <Skeleton
            className="min-h-72"
          />
        </div>
      ) : (
        <Box className="col-span-3">
          {showTours && !(filteredTours.length === 0) && (
            <div className="mb-7">
              <h2 className="text-2xl md:text-xl pl-2 my-2 mb-5 border-l-4  font-bold border-teal-400  dark:text-gray-200">
                Tours
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredTours.map((tour) => (
                  <TourCard tour={tour} />
                ))}
              </div>
            </div>
          )}
          {!isLoadingBusinesses ? (
            !(filteredBusinesses.length === 0) && (
              <div>
                <h2 className="text-2xl md:text-xl pl-2 my-2 mb-5 border-l-4  font-bold border-teal-400  dark:text-gray-200">
                  Hotels, Restaurants & More...
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredBusinesses.map((business) => (
                    <BusinessCard business={business}></BusinessCard>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              <Skeleton
                className="min-h-72"
                sx={{ transition: "transform 0.3s ease-in-out" }}
                _hover={{ transform: "scale(1.1)" }}
              />
              <Skeleton
                className="min-h-72"
                sx={{ transition: "transform 0.3s ease-in-out" }}
                _hover={{ transform: "scale(1.1)" }}
              />
              <Skeleton
                className="min-h-72"
                sx={{ transition: "transform 0.3s ease-in-out" }}
                _hover={{ transform: "scale(1.1)" }}
              />
              <Skeleton
                className="min-h-72"
                sx={{ transition: "transform 0.3s ease-in-out" }}
                _hover={{ transform: "scale(1.1)" }}
              />
            </div>
          )}
        </Box>
      )}
    </Box>
  );
};

export default BusinessAndToursSearch;
