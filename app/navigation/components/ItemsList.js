'use client'

import { useState, useEffect } from 'react';

export default function ItemsList({ searchQuery, businessTypeFilter, tourPriceRange, locationFilter }) {
    const [businesses, setBusinesses] = useState([]);
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          const businessResponse = await fetch('/api/business/getAllBusinesses');
          const tourResponse = await fetch('/api/tours/getAllTours');
          if (!businessResponse.ok || !tourResponse.ok) throw new Error('Failed to fetch');
          
          const businessesData = await businessResponse.json();
          const toursData = await tourResponse.json();
          
          setBusinesses(businessesData.data);
          setTours(toursData.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);
  
    useEffect(() => {
      function filterData() {
        let filteredBusinesses = businesses.filter(business =>
          (!businessTypeFilter || (business.BusinessTypes && business.BusinessTypes.b_type_id === businessTypeFilter)) &&
          (!locationFilter.district || business.district === locationFilter.district) &&
          (!locationFilter.canton || business.canton === locationFilter.canton) &&
          (!locationFilter.province || business.province === locationFilter.province)
        );
  
        let filteredTours = tours.filter(tour =>
          (!tourPriceRange || (tour.price_person >= tourPriceRange[0] && tour.price_person <= tourPriceRange[1])) &&
          (!locationFilter.district || tour.district === locationFilter.district) &&
          (!locationFilter.canton || tour.canton === locationFilter.canton) &&
          (!locationFilter.province || tour.province === locationFilter.province)
        );
  
        setBusinesses(filteredBusinesses);
        setTours(filteredTours);
      }
  
      filterData();
    }, [searchQuery, businessTypeFilter, tourPriceRange, locationFilter, businesses, tours]);
  
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              <h2>Businesses</h2>
              {businesses.map(business => (
                <div key={business.business_id}>
                  <h3>{business.name}</h3>
                  {/* Render more business details here */}
                </div>
              ))}
            </div>
            <div>
              <h2>Tours</h2>
              {tours.map(tour => (
                <div key={tour.tour_id}>
                  <h3>{tour.name}</h3>
                  {/* Render more tour details here */}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

