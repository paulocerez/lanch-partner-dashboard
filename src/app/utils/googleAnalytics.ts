import ReactGA from "react-ga4";
// initialize GA on the server

// function to initialize Google Analytics
const initializeGA = (): void => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string);
};


// function to track GA events
const trackGAEvent = (category: string, action: string, label: string) => {
  // Send GA4 Event
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

// function to set the firebase userid per event
const setGAUserId = (userId: string): void => {
  ReactGA.set({ user_id: userId });
};

export default initializeGA;
export { initializeGA, trackGAEvent, setGAUserId };