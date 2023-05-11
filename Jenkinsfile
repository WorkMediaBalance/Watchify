pipeline {
    environment{
        repository = "runtogether/watchify"
        DOCKERHUB_CREDENTIALS = credentials('Dockerhub-jenkins') // jenkins에 등록해 놓은 docker hub credentials 이름
    }
    agent any
    stages {
//         stage('Frontend Build') {
//             steps {
//                 echo 'Frontend Building'
//                 script {
//                     def BUILD_NUMBER = currentBuild.number
//                     sh 'docker build -t $repository:frontend$BUILD_NUMBER ./frontend' // frontend 파일 생성
//                     sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
//                     sh 'docker push $repository:frontend$BUILD_NUMBER' //docker push
//                 }
//             }
//         }
//
//         stage('BACKEND Build'){
//             steps{
//                 echo 'BACKEND Building'
//                 script {
//                     def BUILD_NUMBER = currentBuild.number
//
//                     dir('BACKEND/watchify') {
//                         sh 'chmod +x gradlew'
//                         sh './gradlew clean build -x test'
//                     }
//
//                     sh 'docker build -t $repository:backend$BUILD_NUMBER ./BACKEND/watchify'
//                     sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
//                     sh 'docker push $repository:backend$BUILD_NUMBER'
//
//                 }
//             }
//         }
        stage('Gitops Dir') {
            steps {
                echo "Gitops Dir"
                script{
                    withCredentials([usernamePassword(credentialsId: 'c76be613-6684-47c5-8b0e-1547e7f184f0', passwordVariable: 'diligent0924!', usernameVariable: 'sdc00035')]) {
                        sh 'git remote set-url origin https://sdc00035:diligent0924!@lab.ssafy.com/s08-final/S08P31A207.git'
                        sh 'git switch main'
                        sh 'git pull origin main'
                    }
                    dir("kubefiles"){
                        def BUILD_NUMBER = currentBuild.number
                        sh """
                            sed -i 's/watchify:frontend\\([^:]*\\)/watchify:frontend${BUILD_NUMBER}/g' my-service.yaml
                            git add my-service.yaml
                            git commit -m 'Update my-service tag to ${BUILD_NUMBER}'
                        """
//                         def yamlFile = 'my-service.yaml'
//                         def yaml = readYaml(file: yamlFile)
//                         def pattern = /:frontend\d+/
//                         sh 'yaml["spec"]'
//                         yaml['spec']['template']['spec']['containers'].each { container ->
//                             if (container['name'] == 'my-service') {
//                                 sh 'container["image"]'
//                                 container['image'] = container['image'].replace(pattern, ':frontend$BUILD_NUMBER')
//                             }
//                         }

                        // YAML 파일 쓰기
//                         writeYaml(file: yamlFile, data: yaml, overwrite: true)

                        // gitops에 변경사항은 저장되어야 한다.
//                         sh 'git config --global user.email "sdc00035@naver.com"'
//                         sh 'git config --global user.name "sdc00035"'
//                         sh 'git add .'
//                         sh 'git commit -m ":hammer: Refactor: version-$BUILD_NUMBER로 변경"'
                    }

                    withCredentials([usernamePassword(credentialsId: 'c76be613-6684-47c5-8b0e-1547e7f184f0', passwordVariable: 'diligent0924!', usernameVariable: 'sdc00035')]) {
                        sh 'git remote set-url origin https://sdc00035:diligent0924!@lab.ssafy.com/s08-final/S08P31A207.git'
                        sh 'git switch main'
                        sh 'git pull origin main'
                        sh 'git push origin main'
                    }
                    echo 'git OK'
                }

            }
        }

        stage('Gitops Change'){
            steps{
                echo "Gitops Change"
//                 script{
//
//                 }
            }
        }

        stage('Gitops push'){
            steps{
                echo "Gitops push"
//                 script{
//
//                 }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploy"

            }
        }
    }
}