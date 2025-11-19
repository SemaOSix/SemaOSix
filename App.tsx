
import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { TripPlanner } from './components/TripPlanner';
import { ItineraryView } from './components/ItineraryView';
import { generateItinerary } from './services/geminiService';
import { TripDetails, ItineraryResponse, ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setView(ViewState.PLANNER);
  };

  const handleBackToHome = () => {
    setView(ViewState.HOME);
    setItinerary(null);
    setTripDetails(null);
  };

  const handleReset = () => {
    setView(ViewState.PLANNER);
    setItinerary(null);
    // Keep tripDetails so the form is pre-filled if we were passing props back, 
    // but currently TripPlanner maintains its own local state.
    // In a larger app, we would pass tripDetails into TripPlanner as initial values.
  };

  const handlePlanSubmit = useCallback(async (details: TripDetails) => {
    setTripDetails(details);
    setIsLoading(true);
    try {
      const result = await generateItinerary(details);
      setItinerary(result);
      setView(ViewState.ITINERARY);
    } catch (error) {
      alert("Произошла ошибка при создании маршрута. Пожалуйста, проверьте API ключ или попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Render content based on state
  const renderContent = () => {
    switch (view) {
      case ViewState.HOME:
        return <Hero onStart={handleStart} />;
      
      case ViewState.PLANNER:
        return (
          <TripPlanner 
            onSubmit={handlePlanSubmit} 
            onBack={handleBackToHome}
            isLoading={isLoading}
          />
        );
      
      case ViewState.ITINERARY:
        if (!itinerary || !tripDetails) return null; 
        return (
          <ItineraryView 
            data={itinerary} 
            city={tripDetails.city}
            onReset={handleReset} 
          />
        );
        
      default:
        return <Hero onStart={handleStart} />;
    }
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default App;
