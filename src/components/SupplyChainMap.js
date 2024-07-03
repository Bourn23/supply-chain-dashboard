// src/components/SupplyChainMap.js
// TODO:
// make this component fully functional and integrated with the rest of the application, you would need to:
// Implement real data fetching from your backend API.
// Add more interactive features, such as filtering supply chain points or displaying different types of information on the map.
// Implement error handling and loading states for when the map or data is loading.
// Add custom icons for different types of supply chain points or statuses.

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledPopup = styled(Popup)`
  .leaflet-popup-content-wrapper {
    background-color: #f8f9fa;
    color: #333;
    border-radius: 4px;
    padding: 1px;
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
  }
`;

const SupplyChainMap = () => {
  const [supplyChainPoints] = useState([
    { id: 1, position: [51.505, -0.09], name: 'London Hub', status: 'Operational' },
    { id: 2, position: [40.7128, -74.0060], name: 'New York Distribution', status: 'Delayed' },
    { id: 3, position: [35.6762, 139.6503], name: 'Tokyo Manufacturing', status: 'Alert' },
  ]);

  return (
    <MapWrapper>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {supplyChainPoints.map((point) => (
          <Marker key={point.id} position={point.position}>
            <StyledPopup>
              <h3>{point.name}</h3>
              <p>Status: {point.status}</p>
            </StyledPopup>
          </Marker>
        ))}
      </MapContainer>
    </MapWrapper>
  );
};

export default SupplyChainMap;