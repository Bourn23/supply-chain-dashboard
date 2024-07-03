// src/components/Dashboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import SupplyChainMap from './SupplyChainMap';
import Watchlist from './Watchlist';
import AnalyticsCharts from './AnalyticsCharts';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const BottomSection = styled.div`
  display: flex;
  gap: 20px;
`;

const WatchlistContainer = styled.div`
  flex: 1;
`;

const AnalyticsContainer = styled.div`
  flex: 2;
`;

function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  return (
    <DashboardContainer>
      <MapContainer>
        <SupplyChainMap />
      </MapContainer>
      <BottomSection>
        <WatchlistContainer>
          <Watchlist onCompanySelect={handleCompanySelect} />
        </WatchlistContainer>
        <AnalyticsContainer>
          {selectedCompany ? (
            <AnalyticsCharts company={selectedCompany} />
          ) : (
            <p>Select a company from the watchlist to view analytics.</p>
          )}
        </AnalyticsContainer>
      </BottomSection>
    </DashboardContainer>
  );
}

export default Dashboard;