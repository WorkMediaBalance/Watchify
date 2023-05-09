pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                script {
                    def buildNumber = currentBuild.number
                    def dockerImage = docker.build("runtogether/watchify/$buildNumber", "")
                    echo "빌드 : $buildNumber"
                    // version.txt 파일에서 현재 버전 가져오기

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