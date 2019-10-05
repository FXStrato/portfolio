import styled from 'styled-components';
// First section of site

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: calc(100vh - 46px);
  align-items: center;
`;

export default () => (
  <Wrapper>
    <h1>Hi, I'm Jeff. I'm a Front End Engineer.</h1>
  </Wrapper>
);
