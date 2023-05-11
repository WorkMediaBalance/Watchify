pipeline {
    environment{
        repository = "runtogether/watchify"
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub-jenkins') // jenkins에 등록해 놓은 docker hub credentials 이름
    }
    agent any
    stages {
        stage('Frontend Build') {
            steps {
                echo 'Frontend Building'
                script {
                    def BUILD_NUMBER = currentBuild.number
                    sh 'docker build -t $repository:frontend$BUILD_NUMBER ./frontend' // frontend 파일 생성

//                     dir('BACKEND/watchify') {
//                         sh 'chmod +x gradlew'
//                         sh './gradlew clean build -x test'
//                     }

//                     sh 'docker build -t $repository:backend$BUILD_NUMBER ./BACKEND/watchify'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:frontend$BUILD_NUMBER' //docker push
//                     sh 'docker push $repository:backend$BUILD_NUMBER'


                }
            }
        }

        stage('BACKEND Build'){
            steps{
                echo 'BACKEND Building'
                script {
                    def BUILD_NUMBER = currentBuild.number

                    dir('BACKEND/watchify') {
                        sh 'chmod +x gradlew'
                        sh './gradlew clean build -x test'
                    }

                    sh 'docker build -t $repository:backend$BUILD_NUMBER ./BACKEND/watchify'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:backend$BUILD_NUMBER'

                }
            }
        }
        stage('Gitops Dir') {
            steps {
                echo "Gitops Dir"
                script{
                    dir("BACKEN")
                }

                echo "Gitops push"

            }
        }

        stage('Gitops Change'){
            steps{
                echo "Gitops Change"
                script{

                }
            }
        }

        stage('Gitops push'){
            steps{
                echo "Gitops push"
                script{

                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploy"

            }
        }
    }
}