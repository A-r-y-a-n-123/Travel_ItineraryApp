import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [groupType, setGroupType] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [source, setSource] = useState('');
  const [boardingDateTime, setBoardingDateTime] = useState('');

  const navigate = useNavigate();

  const handleActivityChange = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const days = timeDiff / (1000 * 3600 * 24);
    return days;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (destination && startDate && endDate && groupType && source && boardingDateTime) {
      const userOnboardingData = {
        source,
        destination,
        startDate,
        endDate,
        duration: calculateDuration(),
        groupType,
        activities: selectedActivities,
        boardingDateTime,
      };

      sessionStorage.setItem('userOnboardingData', JSON.stringify(userOnboardingData));
      sessionStorage.setItem('hasCompletedOnboarding', 'true');
      navigate('/dashboard');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-center font-serif">
          Plan your journey your way!
        </h2>
        <h3 className="p-3 font-semibold text-center mb-5">Let's create your personalized travel experience</h3>

        <form onSubmit={handleContinue} className="space-y-6">
          {/* Destination Input */}
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Where would you like to go?
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter destination"
              required
            />
          </div>

          {/* Start Date Input */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Trip Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* End Date Input */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              Trip End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Trip Duration (in days)
            </label>
            <input
              type="text"
              id="duration"
              value={calculateDuration() !== null ? `${calculateDuration()} days` : 'Select start and end dates'}
              readOnly
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>

          {/* Group Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Who are you traveling with?
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {['solo', 'couple', 'family', 'friends'].map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setGroupType(type)}
                  className={`px-4 py-2 border rounded-md ${groupType === type ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Activities Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What activities are you interested in?
            </label>
            <div className="flex flex-wrap gap-3 mt-2">
              {['Sightseeing', 'Shopping', 'Food Tasting', 'Adventure Sports', 'Museums', 'Relaxation'].map((activity) => (
                <label key={activity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedActivities.includes(activity)}
                    onChange={() => handleActivityChange(activity)}
                    className="form-checkbox text-blue-600"
                  />
                  <span>{activity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Source (From) Input */}
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">
              From (Source City)
            </label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your source city"
              required
            />
          </div>

          {/* Boarding DateTime Input */}
          <div>
            <label htmlFor="boardingDateTime" className="block text-sm font-medium text-gray-700">
              Boarding Date & Time
            </label>
            <input
              type="datetime-local"
              id="boardingDateTime"
              value={boardingDateTime}
              onChange={(e) => setBoardingDateTime(e.target.value)}
              className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
