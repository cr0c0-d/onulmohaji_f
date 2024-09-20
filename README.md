# 오늘 뭐하지?

<!--프로젝트 대문 이미지-->

![Project Title](/readme/img/banner.jpg)

<!--프로젝트 버튼-->
<!--백엔드 깃허브-->

[![request-back-github-page]][back-github-page-url]

<!-- 백엔드 레포지토리 배지-->

![Back-Repository Commits][back-repository-commit-activity] ![Back-Repository Size][back-repository-size-shield]

<br/>

<!--프론트엔드 깃허브-->

[![request-front-github-page]][front-github-page-url]

<!-- 프론트엔드 레포지토리 배지-->

![Front-Repository Commits][front-repository-commit-activity] ![Front-Repository Size][front-repository-size-shield]

<br />

<!--데모 사이트 배지-->

<!-- [![view-demo-eatingbookscroco]][demo-url-eatingbookscroco] -->

<!--목차-->

# 목차

- [[1] 프로젝트 소개](#1-프로젝트-소개)
  - [제작 동기](#제작-동기)
  - [특징](#특징)
  - [기술 스택](#기술-스택)
- [[2] 구현 기능](#2-구현-기능)
  - [보안 및 인증](#보안-및-인증)
  - [조건별 장소 검색](#조건별-장소-검색)
  - [작성중]
- [[3] 프로젝트 회고 및 개선 사항](#3-프로젝트-회고-및-개선-사항)
- [[4] 연락처](#4-연락처)

<br/>

# [1] 프로젝트 소개

'오늘 뭐하지?'는 사용자가 쉽게 나들이 일정을 계획할 수 있도록 돕는 웹 애플리케이션입니다.

바쁜 일상 속에서 친구나 연인과의 외출을 계획할 때, 무엇을 할지 고민하는 순간이 많습니다. 이 사이트는 사용자가 **선택한 날짜와 지역**에 맞춰 **다양한 활동과 장소**를 추천하여, 더욱 즐겁고 알찬 나들이를 할 수 있도록 지원합니다.

<br/>

## 제작 동기

친구들과의 약속이나 연인과의 데이트를 계획할 때, 여러 가지 선택지 중에서 고르는 일이 쉽지 않았습니다.
<br/>
이러한 고민을 해결하기 위해 '오늘 뭐하지?'를 개발하게 되었습니다.
<br/>
이 사이트는 사용자에게 맞춤형 추천을 제공하고, 일정을 손쉽게 구성할 수 있는 기능을 통해, 나들이 계획에 대한 스트레스를 줄이고자 하는 목표를 가지고 있습니다.

## 특징

### 다양한 카테고리 제공

전시회, 축제, 팝업스토어 등 문화 행사부터, 음식점, 카페, 실내 놀거리, 관광 명소 등 다양한 카테고리의 장소를 추천합니다. 사용자는 자신의 취향에 맞는 활동을 쉽게 선택할 수 있습니다.

### 일정 관리 기능

사용자가 원하는 장소를 간편하게 일정에 추가할 수 있으며, 장소의 순서도 드래그 앤 드롭 방식으로 쉽게 변경할 수 있습니다. 이렇게 구성된 일정은 사용자가 외출 전에 미리 확인할 수 있습니다.

### 카카오맵 연결

일정의 동선을 한눈에 확인할 수 있도록 카카오맵과 연결되어 있습니다. 사용자는 지도를 통해 이동 경로를 시각적으로 확인하고, 길찾기 기능으로 목적지까지 쉽게 안내받을 수 있습니다.

### 장소 검색 기능

특정 장소를 기준으로 가까운 장소를 검색할 수 있는 기능을 제공하여, 사용자가 원하는 활동을 보다 효율적으로 찾아낼 수 있습니다. 예를 들어, 특정 카페 근처의 관광 명소나 음식점을 쉽게 찾을 수 있습니다.

### 일정 공유 기능

사용자가 만든 일정을 다른 회원과 공유할 수 있어, 친구나 가족과 함께 일정을 계획하고 조율할 수 있습니다. 이는 특히 그룹 활동을 계획할 때 유용합니다

<br />

## 기술 스택

### 백엔드

- ![java]
- ![spring-boot]
- ![spring-security]
- ![jjwt]
- ![spring-data-jpa]
- ![queryDSL]

### 프론트엔드

- ![react]
- ![mui]
- ![axios]

### 기타

- ![데이터베이스](https://img.shields.io/badge/데이터베이스-8A2BE2) ![mySql]

 <br/>

# [2] 구현 기능

## 보안 및 인증

- 스프링 시큐리티, JWT: 회원가입 및 로그인 기능 구현

- 액세스 토큰과 리프레시 토큰을 발급하여 보안 강화

- oAuth2 구글, 네이버, 카카오 로그인: 소셜 계정을 이용한 로그인 기능 제공

<br />

## 조건별 장소 검색

![img_search](/readme/img/01_search.gif)

- 날짜, 지역, 거리, 카테고리별 사용자 맞춤형 장소 검색

<br />

## 일정 계획

![img_plan](/readme/img/02_plan.gif)

- 원하는 장소를 일정에 추가하고, 장소 순서를 변경하거나 삭제
- 카카오맵으로 일정의 동선을 확인하고, 장소간 길찾기 링크로 바로 연결 가능

<br />

## 일정 공유

![img_share_plan](/readme/img/03_sharePlan.gif)

- 일정을 다른 회원과 공유하고 함께 계획
- 생성된 공유 링크로 다른 회원이 접속시 참여 가능

<br />

## 나만의 장소 관리

![img_my_place](/readme/img/04_myPlace.gif)

- 내가 원하는 장소를 등록하여 일정에 추가 가능

<br />

## 이하 작성중

<br />

# [3] 프로젝트 회고 및 개선 사항

## 목표 및 검토

### 목표

- [작성중]

### 달성도

- [작성중]

<br />

## 개발 과정에서 아쉬웠던 점

### [작성중]

- [작성중]:

  - [작성중]
  - [작성중]

<br />

# [4] 연락처

- 📧 hyde69ciel@gmail.com
- 📋 [https://cr0c0.tistory.com/](https://cr0c0.tistory.com/)

<!--Url for Badges-->

<!-- 프론트엔드 레포지토리 정보 배지 -->

[front-repository-size-shield]: https://img.shields.io/github/repo-size/cr0c0-d/onulmohaji_f?labelColor=D8D8D8&color=BE81F7
[front-repository-commit-activity]: https://img.shields.io/github/commit-activity/t/cr0c0-d/onulmohaji_f

<!-- 백엔드 레포지토리 정보 배지 -->

[back-repository-size-shield]: https://img.shields.io/github/repo-size/cr0c0-d/onulmohaji?labelColor=D8D8D8&color=BE81F7
[back-repository-commit-activity]: https://img.shields.io/github/commit-activity/t/cr0c0-d/onulmohaji

<!-- 데모 사이트 -->

[readme-eng-shield]: https://img.shields.io/badge/-readme%20in%20english-2E2E2E?style=for-the-badge
[view-demo-shield]: https://img.shields.io/badge/-%F0%9F%98%8E%20view%20demo-F3F781?style=for-the-badge
[view-demo-url]: https://cr0c0-d.github.io
[report-bug-shield]: https://img.shields.io/badge/-%F0%9F%90%9E%20report%20bug-F5A9A9?style=for-the-badge
[report-bug-url]: https://github.com/cr0c0-d/onulmohaji_f/issues
[view-demo-eatingbookscroco]: https://img.shields.io/badge/%F0%9F%92%BB%20%EB%8D%B0%EB%AA%A8%20%EC%82%AC%EC%9D%B4%ED%8A%B8%20%EB%B3%B4%EB%9F%AC%EA%B0%80%EA%B8%B0-skyblue?style=for-the-badge
[demo-url-eatingbookscroco]: https://eatingbooks.dandycr0c0.site/search

<!--Url for Buttons-->

[request-front-github-page]: https://img.shields.io/badge/%F0%9F%93%83%20%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20GitHub%20%ED%8E%98%EC%9D%B4%EC%A7%80-A9D0F5?style=for-the-badge
[request-back-github-page]: https://img.shields.io/badge/%F0%9F%93%83%20%EB%B0%B1%EC%97%94%EB%93%9C%20GitHub%20%ED%8E%98%EC%9D%B4%EC%A7%80-D6C7ED?style=for-the-badge
[front-github-page-url]: https://github.com/cr0c0-d/onulmohaji_f
[back-github-page-url]: https://github.com/cr0c0-d/onulmohaji

<!-- 기술 스택 배지 -->
<!-- 백엔드 -->

[java]: https://img.shields.io/badge/Java-17-blue
[spring-boot]: https://img.shields.io/badge/Spring%20Boot-3.0.2-blue
[spring-security]: https://img.shields.io/badge/Spring%20Security-6.0.1-blue
[jjwt]: https://img.shields.io/badge/JJWT-0.9.1-blue
[spring-data-jpa]: https://img.shields.io/badge/Spring%20Data%20JPA-3.0.2-blue
[queryDSL]: https://img.shields.io/badge/QueryDSL-5.0.0-blue

<!-- 프론트엔드 -->

[react]: https://img.shields.io/badge/React-18.2.0-blue
[mui]: https://img.shields.io/badge/MUI-5.15.16-blue
[axios]: https://img.shields.io/badge/Axios-1.6.7-blue

<!-- 기타 -->

[mySql]: https://img.shields.io/badge/MySQL-8.0-blue
[heroku]: https://img.shields.io/badge/Heroku-4F4F4F?logo=Heroku
[aws]: https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-4F4F4F?logo=amazonaws

<!--URLS-->

[license-url]: LICENSE.md
[contribution-url]: CONTRIBUTION.md
[readme-eng-url]: ../README.md
