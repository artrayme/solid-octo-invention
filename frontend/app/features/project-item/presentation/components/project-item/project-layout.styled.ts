import styled from 'styled-components/native';
import {colors} from '../../../../../common/constants/colors';

export const MainWrapper = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  padding-vertical: 12px;
  padding-right: 12px;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 16px;
  background-color: ${colors.milkWhite};
`;
