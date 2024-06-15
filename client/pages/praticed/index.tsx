import Image from "next/image";
import { it } from "node:test";
import styled from "styled-components";

import { v4 as uuid4 } from "uuid";

const imageList = [
  {
    id: uuid4(),
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    text: "TypeScript",
  },
  {
    id: uuid4(),
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzPo00C5cdyO2YIxRna2JMepkjGdfgGjimJw&s",
    text: "Next.js",
  },
  {
    id: uuid4(),
    url: "https://velog.velcdn.com/images/yhko1992/post/97a1ef22-e541-41d9-bd94-8f0658d3bf53/image.png",
    text: "Styled",
  },
  {
    id: uuid4(),
    url: "https://repository-images.githubusercontent.com/180328715/fca49300-e7f1-11ea-9f51-cfd949b31560",
    text: "Zustand",
  },
  {
    id: uuid4(),
    url: "https://miro.medium.com/v2/resize:fit:513/0*uDVm_lpP4hH14Uli.png",
    text: "React Query",
  },
  {
    id: uuid4(),
    url: "https://next-auth.js.org/img/logo/logo-sm.png",
    text: "Next Auth",
  },
  {
    id: uuid4(),
    url: "https://user-images.githubusercontent.com/16843090/101181820-f3a63780-3612-11eb-9d3a-05452f2b0ad8.png",
    text: "Axios",
  },
  {
    id: uuid4(),
    url: "https://velog.velcdn.com/images/bbatto5302/post/554ccf58-b238-4ff8-ab71-661887ddf8de/image.png",
    text: "MSW",
  },
  {
    id: uuid4(),
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW-cSr3s_B-fQrAuCXvyNfVZTirOOsgtuXIw&s",
    text: "Vercel",
  },
];

export default function Page() {
  return (
    <Container>
      {imageList.map(item => (
        <ImageWrrapper>
          <Image src={item.url} width={130} height={130} alt="image" />
          <h2>{item.text}</h2>
        </ImageWrrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  border: 2.2px solid #000;
  border-radius: 12px;
  padding-block: 30px;
  padding-inline: 20px;
  display: grid;
  width: 850px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 30px;
  color: #000000;
`;

const ImageWrrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  font-weight: 800;
  font-size: 20px;
  gap: 11px;

  img {
    border: 2.2px solid #dfdada;
    border-radius: 12px;
    padding: 15px;
  }
`;
