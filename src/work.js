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
    <h1>Work Experience</h1>
    <ul>
      <li>Payscale</li>
      <li>AT&T</li>
    </ul>
  </Wrapper>
);
