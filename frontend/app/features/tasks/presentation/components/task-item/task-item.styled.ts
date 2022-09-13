import styled from 'styled-components/native';

export const TaskWrapper = styled.TouchableOpacity<{background: string}>`
  flex-direction: row;
  padding-horizontal: 16px;
  padding-vertical: 8px;
  border-top-right-radius: 36px;
  border-bottom-right-radius: 36px;
  background-color: ${props => props.background};
`;

export const TaskVerticalDecorator = styled.View<{background: string}>`
  border-radius: 4px;
  background-color: ${props => props.background};
  width: 6px;
`;
