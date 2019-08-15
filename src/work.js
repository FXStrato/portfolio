import styled from 'styled-components';

// First section of site

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
`;

const MainText = styled.h1`
`;

export default () => (
    <Wrapper>
        <MainText>Work Experience</MainText>
        <ul>
            <li>Payscale</li>
            <li>AT&T</li>
        </ul>
    </Wrapper>
)