# NoGeutNoGeut
- 2024 서버시스템구축실습 1팀
- 2024 성신여대 컴퓨터공학과 소프트웨어경진대회 은상
- 2024 오픈소스소프트웨어 1팀

---

## 📋 목차
1. [팀원](#팀원)
2. [서비스 소개](#서비스-소개)
3. [데모 영상](#데모-영상)
4. [필수 사항](#필수-사항)  
5. [설치](#설치)  
6. [실행 방법](#실행-방법)  

---

## 👨‍💻 팀원
- 강연주
- 이가림
- 이윤주
- 정주원
- 최이나
  
---

## 📖 서비스 소개 

'노긋노긋’의 사전적 의미는 ‘여럿이 다 또는 매우 메마르지 않고 녹녹한 모양’이다.
이름처럼 본 서비스는 현대 사회에서 상대적으로 소외감을 느낄 수 있는 노인분들이 삶의 활력을 유지할 수 있도록 지원(매칭 서비스)을 제공한다.
매칭 서비스는 회원이 자신의 프로필을 설정한 후 ‘매칭하기’를 실행하면 노인(노인의 보호자)들에게는 대학생 프로필이, 대학생들에게는 노인 프로필을 보여 준다.
회원이 설정한 지역, 관심 분야, 성별 등과 같은 다양한 카테고리로 필터링된 프로필 리스트를 제공하며 매칭을 돕는다.
이를 통해 노인들은 새로운 사회적 관계를 형성하고 소통의 기회를 가질 수 있으며 대학생들은 노인들에게 지원을 제공하며 소중한 인간관계를 형성할 수 있다.

---

## 📖 데모 영상

- 기능: https://youtu.be/Icf1lj9RxMk?feature=shared
- cicd: https://youtu.be/9H3X_X8PFt0?feature=shared
- error trigger: https://youtu.be/w3NiN8Hw3dM?feature=shared

---

## ✅ 필수 사항
- **Node.js** 18 이상  
- **npm** 6 이상  
- Docker (선택 사항)
  
---

## 🚀 설치

### 1. Node.js로 실행
```bash
# Node.js 설치
sudo apt update && sudo apt install -y nodejs npm

# 패키지 설치
npm install
```
### 2. Docker로 설치
```bash
# Docker 이미지 빌드
docker build -t 프로젝트-이름 .

# Docker 컨테이너 실행
docker run -p 3000:3000 프로젝트-이름
```
---

## 🏃 실행 방법

### Node.js로 실행
```bash
node main.js
```
- 기본적으로 http://localhost:3000 에서 서버가 실행됩니다.

### Docker로 실행
```bash
docker run -p 3000:3000 프로젝트-이름
```
