import { createGlobalStyle } from 'styled-components';
import Landing from './landing';

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
    </main>
);
