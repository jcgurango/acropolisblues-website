import styled from 'styled-components';

const Container = (Component) => styled(Component)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
  box-sizing: border-box;
  overflow: auto;
  padding: 0px 24px;
  padding-bottom: 48px;
`;

export const MainContainer = Container('main');

export default Container;

