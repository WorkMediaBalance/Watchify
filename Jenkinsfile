pipeline {
    environment{
        BUILD_NUMBER = currentBuild.number
        repository = "runtogether/watchify"
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub-jenkins') // jenkins에 등록해 놓은 docker hub credentials 이름
        dockerImage = ''
    }
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                script {
                    dockerImage = docker.build("runtogether/watchify/$buildNumber", "frontend/")
                    echo "빌드 : $buildNumber"
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:$BUILD_NUMBER' //docker push
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