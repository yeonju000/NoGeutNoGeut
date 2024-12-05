pipeline {
    agent any
    environment {
        PROJECT_ID = 'open-440917'
        CLUSTER_NAME = 'k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = '56c1a024-6364-4e52-9008-344ed61ff6bf' // kubeconfig 파일 Credential ID
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
                    app = docker.build("yeonju7547/open2024:${env.BUILD_ID}", "--no-cache .")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
                    app.inside {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Push image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials-id') { // Docker Hub 자격 증명 ID
                        app.push("${env.BUILD_ID}")
                        app.push("latest")
                    }
                }
            }
        }

        stage('Deploy to GKE') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // 배포 파일에서 latest 태그를 빌드 ID로 교체
                    sh "sed -i 's/open2024:latest/open2024:${env.BUILD_ID}/g' nogeut-app-deployment.yaml"

                    // Kubernetes CLI Plugin을 통한 배포
                    withKubeConfig([credentialsId: "${CREDENTIALS_ID}", serverUrl: "https://${LOCATION}.${CLUSTER_NAME}.k8s.io"]) {
                        sh 'kubectl apply -f nogeut-app-deployment.yaml'
                    }
                }
            }
        }
    }
}

