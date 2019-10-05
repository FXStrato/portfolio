import styled from 'styled-components';
// First section of site

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: calc(100vh - 46px);
  align-items: center;
`;


const Text = styled.h1`
`

export default () => (
  <Wrapper>
    <Text>Hi, I'm Jeff. I'm a Front End Engineer.</Text>
  </Wrapper>
);
