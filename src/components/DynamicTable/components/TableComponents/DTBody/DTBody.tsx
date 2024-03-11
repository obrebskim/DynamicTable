import styled from "styled-components";

type Props = { children: JSX.Element | JSX.Element[] };

const DTBody = ({ children }: Props) => {
  return <DTBodyStyled>{children}</DTBodyStyled>;
};

export default DTBody;

const DTBodyStyled = styled.tbody`
  min-height: 16rem;
`;
