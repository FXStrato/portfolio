import { createGlobalStyle } from 'styled-components';
import Landing from './landing';
import Work from './work';

// Adding a global style to the whole site
const GlobalStyle = createGlobalStyle`
    body {
        background-color: rgb(24, 26, 27);
        color: rgb(214, 211, 205);
        margin: 0;
    }
`;

// Main application wrapper
export default () => (
    <main>
        <GlobalStyle/>
        <Landing/>
        <Work/>
    </main>
);
