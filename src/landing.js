import styled from 'styled-components';

// First section to greet user

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
        <MainText>Hi, I'm Jeff.</MainText>
    </Wrapper>
)