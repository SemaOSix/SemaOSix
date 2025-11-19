
export interface TripDetails {
  visitorName: string;
  hostName: string;
  city: string;
  arrivalDate: string;
  departureDate: string;
  interests: string[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface Event {
  title: string;
  time: string;
  location: string;
  description: string;
  type: 'food' | 'activity' | 'culture' | 'party' | 'romantic' | 'other';
}

export interface DayPlan {
  dayTitle: string; // e.g. "Day 1"
  date: string;
  theme: string;
  events: Event[];
}

export interface ItineraryData {
  tripTitle: string;
  days: DayPlan[];
}

export interface ItineraryResponse {
  structuredData: ItineraryData | null;
  rawText: string; // Fallback
  sources: GroundingSource[];
}

export enum ViewState {
  HOME = 'HOME',
  PLANNER = 'PLANNER',
  ITINERARY = 'ITINERARY'
}

export interface InterestOption {
  id: string;
  label: string;
  icon: string;
}
