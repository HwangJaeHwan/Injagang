# InJaGang (인터뷰와 자소서를 강하게 인자강)
<br/>

![Untitled](https://github.com/Minsoek96/Injagang/assets/125581005/b1d08a5d-842a-4b27-9f74-ac4046816a0a)


<br/>

## 목차
1. [팀원 소개](#팀원-소개)
2. [사이트 특징](#사이트-특징)
3. [서비스 가치 & 가설](#서비스-가치--가설)
4. [ERD](#erd)
5. [주요 기능](#주요-기능)
   - [접근 권한 인증](#접근-권한-인증)
   - [유저 자소서 관리](#유저-자소서-관리-특정-유저)
   - [자소서 템플릿](#자소서-템플릿-관리자)
   - [자소서 첨삭 게시판](#자소서-첨삭-게시판-모든-유저)
   - [피드백](#피드백-모든-유저)
   - [모의 면접](#모의-면접-특정-유저)
6. [Tech Stack](#기술-스택)

<br/>

## 🙋‍♂️팀원 소개

| 백민석(FE) | 황재환(BE) |
| --- | --- |
| <img src="https://avatars.githubusercontent.com/u/125581005?s=64&v=4" width="300" height="300"/> | <img src="https://avatars.githubusercontent.com/u/58110333?v=4" width="300" height="300"/> |
| https://github.com/Minsoek96?tab=repositories | https://github.com/HwangJaeHwan |

<br/>

## 사이트 특징 

<br/>

**기업별 자소서 템플릿 제공**   
> 다양한 기업에 맞춘 자소서 템플릿을 제공하여,   
지원자가 해당 기업의 요구에 맞는 자소서를 작성할 수 있다.

**템플릿 기반의 자소서 작성지원**  
> 템플릿을 기반으로 자소서를 작성할 수 있도록 도와주는 기능을 제공한다.  
  사용자는 간편하게 자소서를 작성할 수 있다.

**자소서 피드백에 특화된 게시판**
> 작성된 자소서에 대해 다른 사용자로부터 피드백을 받을 수 있는 게시판을 운영한다.  
   이를 통해 다양한 의견을 수렴하여 자소서를 개선할 수 있다.

**타입별 질문 제공 (CS, 상황, 기술, 성격)**
> 실제 면접에서 자주 접하는 다양한 질문 유형을 제공하여,   
> 여러 상황에 효과적으로 대처할 수 있는 능력을 길러준다.

<br/>

## 서비스 가치 & 가설 

<br/>

- **체계적인 면접 연습으로 자신감 향상**
  - 가치 : 구조화된 면접 연습을 통해 자신감을 키울 수 있다.  
  - 가설 : 체계적인 연습은 면접 두려움을 줄이고 성과를 향상시킨다.   

- **유저 간 자소서 피드백으로 품질 향상**  
  - 가치 : 피드백을 통한 자소서의 품질을 개선할 수 있다.  
  - 가설 : 피드백을 받은 자소서는 더 승률이 좋아 질 것이다.  
  
- **커뮤니티를 통한 동기 부여**  
  - 가치 : 유저 간 소통으로 동기 부여를 받을 수 있다.  
  - 가설 : 긍정적 상호작용은 지속적인 자소서 개선과 면접 준비를 촉진한다.  
  
- **객관적인 자소서 평가 기회 제공**  
  - 가치 : 자소서에 특화된 만큼 눈치볼 필요없이 객관적 평가를 요구할 수 있다.  
  - 가설 : 객관적인 평가로 강점과 약점을 파악하여 효과적으로 개선할 수 있다.  
  
- **반복 학습을 통한 능력 강화**  
  - 가치 : 반복 학습을 통한 훈련을 면접 능력을 강화한다.   
  - 가설 : 반복 학습은 지속적인 발전과 높은 성공률을 가져온다.  

<br/>

---


## ERD

---

![인자강 디비 구조도](https://github.com/HwangJaeHwan/Injagang/assets/58110333/769886ad-0006-484d-a6ad-c5b128a8ea55)

## 주요 기능
---

### 접근 권한 인증
  - 토큰 검증을 통한 인증 처리
  - AccessToken + RefreshToken
  - 권한별 서비스 이용 제어
  - 잘못된 정보 검증
    
![접근권한](https://github.com/Minsoek96/Injagang/assets/125581005/ecaaced2-2c70-4c9f-8ef4-14283f201978)


### 유저 자소서 관리 ( 특정 유저 )
 - 자소서 작성하기
 - 자소서 삭제하기
 - 자소서 수정하기
 - ADMIN 기업별 자소서 질문 문항 템플릿 제공(커스텀가능)

![자소서](https://github.com/Minsoek96/Injagang/assets/125581005/a822a103-5728-4c35-a39c-e9501b1de38b)

    
### 자소서 템플릿( 관리자 )
 - 기업별 자소서 질문 문항 작성하기
 - 질문 문항 삭제하기
   
![템플릿](https://github.com/Minsoek96/Injagang/assets/125581005/7575344e-dd23-4c32-860a-f9b929e06683)


### 자소서 첨삭 게시판 ( 모든 유저 ) 
 - 게시글 자소서 첨부 하기
 - 게시글 자소서 삭제 하기
 - 게시글 자소서 수정 하기
 - 제목별, 닉네임별 자소서 내용 탐색하기
 

### 피드백 ( 모든 유저 )
 - 첨부 자소서 문항별 첨삭하기
 - 문항별 피드백 작성하기
 - 피드백 삭제하기
 - 피드백 수정하기

![게시판](https://github.com/Minsoek96/Injagang/assets/125581005/0da76966-98dc-4860-aaa0-34f0ec3265e1)


### 모의 면접 ( 특정 유저 )
 - 모의 면접 질문 관리자 제공 
 - 자신만의 모의 면접 질문 설정
 - 관리자 랜덤 면접 질문 설정 (타입 별 갯수지정)
 - 면접 질문 문항별 스피칭
 - 면접 질문 문항별 녹화
 - 면접 질문 문항별 저장

![면접](https://github.com/Minsoek96/Injagang/assets/125581005/f1400b82-39a6-46fa-986a-3a243feab6b1)

![랜덤면접](https://github.com/Minsoek96/Injagang/assets/125581005/3f011e6d-96ed-4dec-bf28-7aae0f7f9570)

## 🛠Tech Stack

<div>

| Area | Tech Stack |
|:----:|:----------:|
| **Frontend** | <img src="https://img.shields.io/badge/next.js-000000.svg?&style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"> <img src="https://img.shields.io/badge/typescript-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/styled--components-DB7093.svg?&style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components"> <img src="https://img.shields.io/badge/redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=white" alt="Redux"> <img src="https://img.shields.io/badge/redux--thunk-764ABC.svg?&style=for-the-badge&logo=redux&logoColor=white" alt="Redux Thunk"> |
| **Backend** | <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white" alt="Java"> <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring"> <img src="https://img.shields.io/badge/h2-4479A1?style=for-the-badge&logo=h2&logoColor=white" alt="H2"> <img src="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT"> <img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis"> |

</div>

