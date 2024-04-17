'use client'

import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const BusinessAndToursSearch = ({ initialQuery = '' }) => {
    const [businesses, setBusinesses] = useState([]);
    const [tours, setTours] = useState([]);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [isLoading, setIsLoading] = useState(false);
    const [businessTypes, setBusinessTypes] = useState({});
    const [showTours, setShowTours] = useState(true);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const businessResponse = await fetch('/api/business/getAllBusinesses').then(response => response.json());
            const tourResponse = await fetch('/api/tours/getAllTours').then(response => response.json());

            if (businessResponse.data && tourResponse.data) {
                setBusinesses(businessResponse.data);
                setTours(tourResponse.data);
                extractAndSetBusinessTypes(businessResponse.data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    const extractAndSetBusinessTypes = (businessData) => {
        const types = {};
        businessData.forEach(business => {
            const { BusinessTypes } = business;
            if (BusinessTypes && !types[BusinessTypes.b_type_id]) {
                types[BusinessTypes.b_type_id] = { name: BusinessTypes.name, checked: true };
            }
        });
        setBusinessTypes(types);
    };

    const handleCheckboxChange = (typeId) => {
        setBusinessTypes(prevTypes => ({
            ...prevTypes,
            [typeId]: {
                ...prevTypes[typeId],
                checked: !prevTypes[typeId].checked
            }
        }));
    };

    const toggleShowTours = () => {
        setShowTours(!showTours);
    };

    const filterData = (data, query) => {
        return data.filter(item => {
            return (
                Object.keys(item).some(key =>
                    String(item[key]).toLowerCase().includes(query.toLowerCase())
                ) && businessTypes[item.b_type_id]?.checked
            );
        });
    };

    const handleSearch = debounce((query) => {
        setSearchQuery(query);
    }, 300);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={initialQuery}
            />
            <div>
                {Object.entries(businessTypes).map(([typeId, { name, checked }]) => (
                    <label key={typeId}>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheckboxChange(typeId)}
                        /> {name}
                    </label>
                ))}
                <label>
                    <input
                        type="checkbox"
                        checked={showTours}
                        onChange={toggleShowTours}
                    /> Tours
                </label>
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div>
                        <h2>Businesses</h2>
                        {filterData(businesses, searchQuery).map(business => (
                            <div key={business.business_id}>{business.name}</div>
                        ))}
                    </div>
                    {showTours && (
                        <div>
                            <h2>Tours</h2>
                            {tours.map(tour => (
                                <div key={tour.tour_id}>{tour.name}</div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BusinessAndToursSearch;
