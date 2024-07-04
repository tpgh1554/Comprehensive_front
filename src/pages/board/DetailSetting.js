import { Container, ContainerBack, Exit } from "../../style/ModalStyle.js";
const DetailSetting = () => {
  return (
    <ContainerBack style={{ zIndex: "100" }}>
      <Container>
        <div>수정</div>
        <div>삭제</div>
      </Container>
    </ContainerBack>
  );
};
export default DetailSetting;
