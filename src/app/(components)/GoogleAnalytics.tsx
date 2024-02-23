"use client";
// initialize GA on the client

import { useEffect } from "react";
import { initializeGA } from "@/app/utils/google-analytics";

const GoogleAnalytics: React.FC = () => {
    // useEffect initializes GA right when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
      initializeGA();
      window.GA_INITIALIZED = true;
    }
  }, []);

  return null
}

export default GoogleAnalytics;