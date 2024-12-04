node {
    def app

    stage('Clone repository') {
        git branch: 'main', url: 'https://github.com/yeonju000/NoGeutNoGeut.git' // main 브랜치 클론
    }

    stage('Build image') {
        // Docker 이미지 빌드
        app = docker.build("yeonju7547/open2024")
    }

    stage('Test image') {
        // 이미지 내부에서 테스트 실행
        app.inside {
            sh 'npm install'  // 의존성 설치
        }
    }

    stage('Push image') {
        // Docker Hub에 푸시
        docker.withRegistry('https://registry.hub.docker.com', 'yeonju7547') {
            app.push("${env.BUILD_NUMBER}") // 빌드 번호 태그
            app.push("latest")              // latest 태그
        }
    }
}

