import styled from 'styled-components';

// First section of site

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: calc(100vh - 46px);
  align-items: center;
  flex-direction: column;
`;

export default () => (
  <Wrapper>
    <h1>Work Experience</h1>
    <div>
      <ul>
        <li>Payscale</li>
        <li>AT&T</li>
      </ul>
    </div>
  </Wrapper>
);
