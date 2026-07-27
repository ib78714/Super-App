import React, { useState, useEffect } from 'react';

export const MapPage = () => {
  const [coords, setCoords] = useState({ lat: 30.0444, lng: 31.2357 });
  const [loading, setLoading] = useState(false);

  const getLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>تحديد الموقع والخريطة</h2>
      <button 
        onClick={getLocation}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0284c7',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '15px'
        }}
      >
        {loading ? 'جاري تحديد موقعك...' : 'تحديث موقعي الحقيقي'}
      </button>

      <div style={{ width: '100%', height: '500px', borderRadius: '15px', overflow: 'hidden', border: '1px solid #ccc' }}>
        <iframe
          title="Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
        ></iframe>
      </div>
    </div>
  );
};

export default MapPage;