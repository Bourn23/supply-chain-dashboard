// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import styled from 'styled-components';
// import Header from './components/Header';
// import SupplyChainMap from './components/SupplyChainMap';
// import Watchlist from './components/Watchlist';
// import AnalyticsCharts from './components/AnalyticsCharts';
// import NotificationPanel from './components/NotificationPanel';

// const MainContent = styled.main`
//   padding: 20px;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <MainContent>
//           <Routes>
//             <Route path="/" element={<SupplyChainMap />} />
//             <Route path="/map" element={<SupplyChainMap />} />
//             <Route path="/watchlist" element={<Watchlist />} />
//             <Route path="/analytics" element={<AnalyticsCharts />} />
//             <Route path="/notifications" element={<NotificationPanel />} />
//           </Routes>
//         </MainContent>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import NotificationPanel from './components/NotificationPanel';

const MainContent = styled.main`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<NotificationPanel />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;