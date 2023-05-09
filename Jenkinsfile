pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                script {
                     def buildNumber = currentBuild.number
                     echo "빌드 : $buildNumber"
                    // version.txt 파일에서 현재 버전 가져오기
                    def versionFile = readFile('version.txt').trim()
                    def currentVersion = versionFile.toInteger()
                    echo "현재 버전: $currentVersion"

                    // 빌드 및 테스트 수행

                    // 버전 증가 후 version.txt에 저장
                    def newVersion = currentVersion + 1
                    writeFile file: 'version.txt', text: newVersion.toString()
                    echo "새로운 버전: $newVersion"
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