import styled from "styled-components";
import logoimg from "../image/apueda-logo-ff3e34.png"

const Logo = () => {
  return <Logoimg />;
};
const Logoimg = styled.div`
  width: 4vw;
  height: 4vw;
  background-image: url(${logoimg});
  background-size: cover;
  background-repeat: no-repeat;
`;
export default Logo;
