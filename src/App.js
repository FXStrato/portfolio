import { createGlobalStyle } from 'styled-components';
import Landing from './landing';
import bgMobile from './img/bg-mobile.png';

// Adding a global style to the whole site
const GlobalStyle = createGlobalStyle`
  body {
      @media (max-width: 768px) {
        background: url(${bgMobile}) no-repeat center;
        background-size: cover;
        height: 100%;
      }
      background-color: rgb(24, 26, 27);
      color: rgb(214, 211, 205);
      margin: 0;
  }
`;

// Main application wrapper
export default () => (
  <main>
    <GlobalStyle />
    <Landing />
  </main>
);
