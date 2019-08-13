import styled from 'styled-components';

// First section to greet user

const MainText = styled.h1`
    font-size: 3rem;
    text-align: center;
`;

export default () => (
    <section>
        <MainText>Hi, I'm Jeff.</MainText>
    </section>
)