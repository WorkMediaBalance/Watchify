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
                    writeFile file: 'version.txt', text: NEW_VERSION.toString()
                    echo "새로운 버전: $NEW_VERSION"
                    VERSION = sh(returnStdout: true, script: 'cat version.txt').trim()
                    echo "이후 버젼: $VERSION"
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