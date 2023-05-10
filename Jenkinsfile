pipeline {
    environment{
        repository = "runtogether/watchify"
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub-jenkins') // jenkins에 등록해 놓은 docker hub credentials 이름
    }
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                script {
                    def BUILD_NUMBER = currentBuild.number
                    sh 'pwd'
                    sh 'docker build -t $repository:frontend$BUILD_NUMBER ./frontend' // frontend 파일 생성
                    sh 'chmod +x ./BACKEND/watchify/gradlew'
                    sh 'sudo su'
                    sh './BACKEND/watchify/gradlew clean build'
                    sh 'exit'
                    sh 'docker build -t $repository:backend$BUILD_NUMBER ./BACKEND/watchify' // backend 파일 생성
                    echo "docker build finished"
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:frontend$BUILD_NUMBER' //docker push
                    sh 'docker push $repository:backend$BUILD_NUMBER'
                }
            }
        }
        stage('Test') {
            steps {
                echo "Test"
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploy"

            }
        }
    }
}