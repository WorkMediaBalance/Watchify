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
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:frontend$BUILD_NUMBER' //docker push
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

        stage('AI Build') {
            steps {
                echo 'AI Building'
                script {
                    def BUILD_NUMBER = currentBuild.number
                    dir('AI/watchifyAI'){
                        sh """
                            sed -i 's/DB_NAME/$DB_NAME/g' settings.py
                            sed -i 's/DB_USER/$DB_USER/g' settings.py
                            sed -i 's/DB_PW/$DB_PW/g' settings.py
                            sed -i 's/DB_HOST/$DB_HOST/g' settings.py
                            sed -i 's/DB_PORT/$DB_PORT/g' settings.py
                        """
                    }
                    sh 'docker build -t $repository:ai$BUILD_NUMBER ./AI' // frontend 파일 생성
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:ai$BUILD_NUMBER' //docker push
                    dir('AI/watchifyAI'){
                        sh """
                            sed -i 's/$DB_NAME/DB_NAME/g' settings.py
                            sed -i 's/$DB_USER/DB_USER/g' settings.py
                            sed -i 's/$DB_PW/DB_PW/g' settings.py
                            sed -i 's/$DB_HOST/DB_HOST/g' settings.py
                            sed -i 's/$DB_PORT/DB_PORT/g' settings.py
                        """
                    }
                }
            }
        }

        stage('Gitops Dir') {
            steps {
                echo "Gitops Dir"
                script{
                    def BUILD_NUMBER = currentBuild.number
                    // git pull을 미리 받음
                    withCredentials([usernamePassword(credentialsId: 'c76be613-6684-47c5-8b0e-1547e7f184f0', passwordVariable: 'diligent0924!', usernameVariable: 'sdc00035')]) {
                        sh 'git remote set-url origin https://sdc00035:diligent0924!@lab.ssafy.com/s08-final/S08P31A207.git'
                        sh 'git switch main'
                        sh 'git pull origin main'
                    }
                    dir("kubefiles"){
                        sh """
                            sed -i 's/watchify:frontend\\([^:]*\\)/watchify:frontend${BUILD_NUMBER}/g' my-service.yaml
                            git add my-service.yaml
                            git commit -m 'Update my-service tag to frontend${BUILD_NUMBER}'
                        """
                        sh """
                            sed -i 's/watchify:backend\\([^:]*\\)/watchify:backend${BUILD_NUMBER}/g' back-service.yaml
                            git add back-service.yaml
                            git commit -m 'Update back-service tag to backend${BUILD_NUMBER}'
                        """

                        sh """
                            sed -i 's/watchify:ai\\([^:]*\\)/watchify:ai${BUILD_NUMBER}/g' ai-service.yaml
                            git add ai-service.yaml
                            git commit -m 'Update back-service tag to ai${BUILD_NUMBER}'
                        """

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