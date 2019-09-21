import styled from 'styled-components';
import bgDesktop from './img/bg-desktop.png';
// First section of site

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
`;

const Picture = styled.div`
  @media (max-width: 769px) {
    display: none;
  }
  @media (min-width: 769px) {
    background: url(${bgDesktop}) no-repeat center;
    background-size: cover;
    height: 100%;
    max-width: 500px;
  }
  margin-top: 0;
  margin-bottom: 0;
`;

const Text = styled.h1`
@media (max-width: 769px) {
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}
`

export default () => (
  <Wrapper className="row">
    <Picture className="col" />
    <div className="col">
      <Text>Hi, I'm Jeff. I'm a Front End Engineer.</Text>
    </div>
  </Wrapper>
);
