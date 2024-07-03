// src/components/Dashboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import SupplyChainMap from './SupplyChainMap';
import Watchlist from './Watchlist';
import AnalyticsCharts from './AnalyticsCharts';
import Chatbox from './Chatbox';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  height: calc(100vh - 80px); // Adjust based on your header height
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
  overflow: hidden;
`;

const WatchlistContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const AnalyticsContainer = styled.div`
  flex: 2;
  overflow-y: auto;
`;

const ChatboxContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 300px;
  z-index: 1000;
`;

function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [mapData, setMapData] = useState(/* initial map data */);
  const [watchlistData, setWatchlistData] = useState(/* initial watchlist data */);
  const [analyticsData, setAnalyticsData] = useState(/* initial analytics data */);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleChatbotResponse = (response) => {
    // Update state based on chatbot response
    if (response.mapUpdate) {
      setMapData(response.mapUpdate);
    }
    if (response.watchlistUpdate) {
      setWatchlistData(response.watchlistUpdate);
    }
    if (response.analyticsUpdate) {
      setAnalyticsData(response.analyticsUpdate);
    }
  };

  return (
    <DashboardContainer>
      <MapContainer>
        <SupplyChainMap data={mapData} />
      </MapContainer>
      <BottomSection>
        <WatchlistContainer>
          <Watchlist data={watchlistData} onCompanySelect={handleCompanySelect} />
        </WatchlistContainer>
        <AnalyticsContainer>
          {selectedCompany ? (
            <AnalyticsCharts company={selectedCompany} data={analyticsData} />
          ) : (
            <p>Select a company from the watchlist to view analytics.</p>
          )}
        </AnalyticsContainer>
      </BottomSection>
      <ChatboxContainer>
        <Chatbox onResponse={handleChatbotResponse} />
      </ChatboxContainer>
    </DashboardContainer>
  );
}

export default Dashboard;