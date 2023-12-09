import React, { Suspense } from "react";
import goodInterView from "@/public/assets/main.jpg";
import interViewScreen from "@/public/assets/면접.png";
import communityScreen from "@/public/assets/커뮤니티.png";

const manualData = [
  {
    main: "인터뷰와 자소서를 강하게 어필하자",
    sub: "당신을 서포트 하겠습니다.",
    imageList: [goodInterView],
  },
  {
    main: "자소서 피드백에 특화된 커뮤니티",
    sub: "자소서를 강력하게",
    imageList: [communityScreen],
  },
  {
    main: "준비된 예상 질문으로 인터뷰 연습",
    sub: "인터뷰를 강력하게",
    imageList: [interViewScreen],
  },
];
const ManualItems = React.lazy(() => import("./ManualItems"));

const Manual = () => {
  const lastSection = manualData.length - 1;
  return (
    <div>
      <Suspense fallback={<p>로딩</p>}>
        {manualData.map((item, index) => (
          <ManualItems
            key={index}
            mainTitle={item.main}
            subTitle={item.sub}
            isArrow={index >= lastSection ? false : true}
            imageList={item.imageList}
          ></ManualItems>
        ))}
      </Suspense>
    </div>
  );
};

export default Manual;
