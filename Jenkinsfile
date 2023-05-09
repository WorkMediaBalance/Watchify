pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                sh 'pwd'
                echo 'this is'
                sh 'exit'
                sh 'pwd'
                script {
                    VERSION = sh(returnStdout: true, script: 'cat version.txt').trim()
                    echo "현재 버전: $VERSION"
                }
                script {
                    NEW_VERSION = VERSION.toInteger() + 1
                    sh "echo $NEW_VERSION > version.txt"
                    echo "새로운 버전: $NEW_VERSION"
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