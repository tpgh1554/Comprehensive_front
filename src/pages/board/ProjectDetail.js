import { useEffect } from "react";
import BoardLayout from "../../components/BoardLayout";
import AxiosApi from "../../api/AxiosApi";
const ProjectDetail = () => {
  useEffect(() => {
    const projectDetail = async (id) => {
      try {
        const rsp = await AxiosApi.getProjectDetal(id);
        console.log(rsp.data);
        // setBoardList(rsp.data); // 필터링된 데이터를 상태에 저장
      } catch (e) {
        console.log(e);
      }
    };
    projectDetail();
  }, []);
  return <BoardLayout></BoardLayout>;
};
export default ProjectDetail;
