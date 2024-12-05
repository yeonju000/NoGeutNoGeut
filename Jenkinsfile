pipeline {
    agent any
    environment {
        PROJECT_ID = 'open-440917'
        CLUSTER_NAME = 'k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = '56c1a024-6364-4e52-9008-344ed61ff6bf'
    }
    stages {
        stage('Clone repository') {
            steps {
                git branch: 'main', url: 'https://github.com/yeonju000/NoGeutNoGeut.git'
            }
        }

        stage('Build image') {
            steps {
                script {
                    // --no-cache 옵션을 사용하여 이미지를 새로 빌드
                    app = docker.build("yeonju7547/open2024:${env.BUILD_ID}", "--no-cache .")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
                    app.inside {
                        sh 'npm install'  // 의존성 설치
                    }
                }
            }
        }

        stage('Push image') {
            when {
                branch 'main'  // main 브랜치일 경우에만 실행
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'yeonju7547') {
                        app.push("${env.BUILD_ID}") // 빌드 ID 태그
                        app.push("latest")              // latest 태그
                    }
                }
            }
        }

        stage('Deploy to GKE') {
            when {
                branch 'main'  // main 브랜치일 경우에만 실행
            }
            steps {
                script {
                    // 배포 파일에서 latest 태그를 빌드 ID로 교체
                    sh "sed -i 's/open2024:latest/open2024:${env.BUILD_ID}/g' nogeut-app-deployment.yaml"

                    // GKE 배포를 위한 Kubernetes 명령어
                    kubernetesDeploy(
                        configs: 'nogeut-app-deployment.yaml',
                        kubeconfigId: 'gke-kubeconfig',
                        enableConfigSubstitution: true
                    )
                }
            }
        }
    }
}

