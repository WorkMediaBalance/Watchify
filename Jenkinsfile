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
                    // counter 변수 생성
                    def counter = counter('my-counter')

                    // 현재 counter값 출력
                    echo "현재 카운터 값: ${counter}"

                    // 카운터 값 1 증가 후 출력
                    counter = counter.next()
                    echo "다음 카운터 값: ${counter}"

                    // 카운터 값 다시 1 증가 후 출력
                    counter = counter.next()
                    echo "다다음 카운터 값: ${counter}"
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