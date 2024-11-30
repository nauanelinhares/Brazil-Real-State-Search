import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const TypographyStyled = styled(Typography)`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: 24px;
  padding: 16px;
`;

export { StyledModal, TypographyStyled };


export default style;