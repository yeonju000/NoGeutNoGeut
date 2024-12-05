# Build stage
FROM node:18 as builder

# 작업 디렉토리 생성
WORKDIR /nogeut

# Google Cloud SDK 설치
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | gpg --dearmor -o /usr/share/keyrings/cloud.google.gpg \
    && apt-get update -y \
    && apt-get install google-cloud-sdk -y

# 'NogeutNoGeut' 폴더에서 package.json 파일 복사 후 의존성 설치
COPY ./package*.json /nogeut/
RUN npm install

# 'NogeutNoGeut' 폴더의 모든 파일 복사
COPY . /nogeut/

# Production stage
FROM node:18-slim as production

# 작업 디렉토리 설정
WORKDIR /nogeut

# 의존성만 복사 (최종 이미지 크기를 줄이기 위해 빌드 파일 제외)
COPY --from=builder /nogeut /nogeut

# 포트 3030에서 애플리케이션 실행
EXPOSE 3030

# 애플리케이션 실행
CMD ["npm", "start"]

