import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formatDateTime = (datetime) => {
  const d = new Date(datetime);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 => 12
  return `${day}-${month}-${year} at ${hours}:${minutes} ${ampm}`;
};


const MainDashboard = () => {
  const [userOnboardingData, setUserOnboardingData] = useState(null);
  const [durationInDays, setDurationInDays] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onboardingComplete = sessionStorage.getItem('hasCompletedOnboarding');

    if (!onboardingComplete) {
      navigate('/onboarding');
    } else {
      const storedData = sessionStorage.getItem('userOnboardingData');
      const storedUser = JSON.parse(sessionStorage.getItem('user'));

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserOnboardingData(parsedData);

        // Calculate duration in days
        const startDate = new Date(parsedData.startDate);  // Assuming startDate exists
        const endDate = new Date(parsedData.endDate);      // Assuming endDate exists
        const differenceInTime = endDate - startDate;
        const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
        setDurationInDays(Math.abs(days));
      }

      if (storedUser && storedUser.username) {
        setUsername(storedUser.username);
      }
    }
  }, [navigate]);

  const handleBackToOnboarding = () => {
    navigate('/onboarding');
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Calculate number of activities safely
  const numberOfActivities = userOnboardingData?.activities?.length || 0;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold py-2">
          Hello {username || 'User'}!
        </h1>
        <h2 className="mb-6 py-2 font-semibold">Ready for the trip?</h2>
        <h3 className="py-2 font-semibold text-xl">Your Upcoming Trip</h3>

        <div>
          <h1 className="py-3 text-5xl font-extrabold">
            {userOnboardingData?.destination?.toUpperCase() || 'Your Destination'}
          </h1>
          <div className="mt-2">
            {userOnboardingData?.startDate && userOnboardingData?.endDate ? (
              <p className="text-md font-medium">
                {formatDate(userOnboardingData.startDate)} - {formatDate(userOnboardingData.endDate)}
              </p>
            ) : (
              <p className="text-md font-medium text-gray-500">
                Trip dates not available
              </p>
            )}
          </div>


          {userOnboardingData ? (
            <div className="mt-16 flex flex-row gap-5">
              {/* 
            <p className="text-lg">
              <strong>Destination:</strong> {userOnboardingData.destination}
            </p>
            */}
              <div>
                <p className='font-extrabold'>{durationInDays !== null ? `${durationInDays} days` : 'Loading duration...'}</p>

                <p className='font-semibold'>Duration</p>
              </div>
              <div>
                <p className='font-extrabold'>{userOnboardingData.groupType}</p>

                <p className='font-semibold'>Group</p>
              </div>
              <div>
                <p className='font-extrabold'>{numberOfActivities}</p>

                <p className='font-semibold'>Activities</p>
              </div>
            </div>
          ) : (
            <p>Loading your personalized data...</p>
          )}
        </div>

        <div className="mt-8 space-y-4">
          {userOnboardingData?.source && userOnboardingData?.destination && (
            <div>
              <p className="font-extrabold">{userOnboardingData.source} ➔ {userOnboardingData.destination}</p>
              <p className="font-semibold">Flight</p>
            </div>
          )}
          {userOnboardingData?.boardingDateTime && (
            <div>
              <p className="font-extrabold">
                {formatDateTime(userOnboardingData.boardingDateTime)}
              </p>
              <p className="font-semibold">Boarding Time</p>
            </div>
          )}
        </div>

        <button
          onClick={handleBackToOnboarding}
          className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Onboarding
        </button>

      </div>
    </div>
  );
};

export default MainDashboard;
