import styled from 'styled-components/native';

export const StatusWrapper = styled.View<{background: string}>`
  background-color: ${props => props.background};
  padding-horizontal: 8px;
  padding-vertical: 4px;
  margin-vertical: 16px;
  border-radius: 100px;
`;
