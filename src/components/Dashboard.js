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
  height: calc(100vh - 80px);
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

const DynamicComponentContainer = styled.div`
  margin-top: 20px;
`;

function Dashboard() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [DynamicComponent, setDynamicComponent] = useState(null);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleCodeGeneration = (code) => {
    try {
      // Use babel-standalone to transform the JSX code into a React component
      const transformedCode = Babel.transform(code, { presets: ['react'] }).code;
      const ComponentFunction = new Function('React', 'styled', 'return ' + transformedCode);
      const NewComponent = ComponentFunction(React, styled);
      setDynamicComponent(() => NewComponent);
    } catch (error) {
      console.error('Error creating dynamic component:', error);
    }
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
      <ChatboxContainer>
        <Chatbox onCodeGeneration={handleCodeGeneration} />
      </ChatboxContainer>
      <DynamicComponentContainer>
        {DynamicComponent && <DynamicComponent />}
      </DynamicComponentContainer>
    </DashboardContainer>
  );
}

export default Dashboard;