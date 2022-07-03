import React, { useEffect, useState } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  var count = 0;

  function contador() {
    count++;
  }

  useEffect(() => {
    const onSuccess = (location: any) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
      contador();
    };
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const onSuccess = (location: any) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        });
        contador();
      };
      navigator.geolocation.getCurrentPosition(onSuccess);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return location;
}

export default useGeoLocation;
