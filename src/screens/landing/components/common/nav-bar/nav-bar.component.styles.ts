import styled from "styled-components";

export const StyledNav = styled.nav`
  position: sticky;
  top: 0;
  backdrop-filter: blur(20px);
  z-index: 50;
  padding: 2rem 0;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    width: 180px;
  }
  .nav-menu {
    display: flex;
    gap: 2rem;
  }
  ul > li > a,
  .logo {
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    &:hover {
      color: #a099ff;
    }
  }
  .fa-bars {
    color: #fff;
  }
  .nav-links-mobile {
    display: none;
  }
  .menu-icon {
    display: none;
  }
  @media (max-width: 960px) {
    height: 8rem;
    .nav-menu {
      display: flex;
      align-items: stretch;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 90px;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
    }
    nav {
      align-items: stretch;
    }
    .nav-menu.active {
      background-color: #081327;
      left: 0;
      padding: 2rem 3rem 2rem 3rem;
      opacity: 0.9;
      transition: all 0.5s ease;
      z-index: 1;
      justify-content: flex-start;
      margin-top: -10px;
    }
    .nav-links {
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      cursor: pointer;
      text-decoration: none;
      color: #fff;
      &:hover {
        color: #a099ff;
      }
    }
    .navbar-logo {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(25%, 50%);
    }
    .menu-icon {
      display: block;
      position: absolute;
      margin-left: 1rem;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
    }
    .navbar-logo {
      margin-left: -2rem;
    }
    .fa-times {
      color: #fff;
      font-size: 2rem;
    }
    .nav-links-mobile {
      display: block;
      text-align: center;
      padding: 1.5rem;
      margin: 2rem auto;
      border-radius: 4px;
      width: 80%;
      background: #4ad9e4;
      text-decoration: none;
      color: #fff;
      font-size: 1.5rem;
    }
    .nav-links-mobile:hover {
      background: #fff;
      color: #6568f4;
      transition: 250ms;
    }
  }
`;

export const AppButton = styled.button`
  padding: 1.4rem;
  min-width: 160px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(
    89.58deg,
    #44bcf0 -19.85%,
    #818cf8 54.07%,
    #a099ff 120.75%
  );
  border-radius: 5px;
  cursor: pointer;
`;
