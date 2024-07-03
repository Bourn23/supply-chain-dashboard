// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a237e;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
// previous version where each component has its own file
// function Header() {
//   return (
//     <HeaderContainer>
//       <Logo>SC</Logo>
//       <Nav>
//         <NavLink to="/">Home</NavLink>
//         <NavLink to="/map">Map</NavLink>
//         <NavLink to="/analytics">Analytics</NavLink>
//         <NavLink to="/watchlist">Watchlist</NavLink>
//         <NavLink to="/notifications">Notifications</NavLink>
//       </Nav>
//     </HeaderContainer>
//   );
// }

// export default Header;

function Header() {
  return (
    <HeaderContainer>
      <Logo>SC</Logo>
      <Nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/notifications">Notifications</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;