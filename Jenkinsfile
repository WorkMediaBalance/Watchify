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
                    def BUILD_NUMBER = currentBuild.number // script 안에서만 가능하다. (플러그인 필요)
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

                    dir('BACKEND/watchify/src/main/resources'){
                        sh """
                            sed -i 's/DB_USER/"$DB_USER"/g' application.yml
                            sed -i 's/DB_PW/"$DB_PW"/g' application.yml
                            sed -i 's/DB_HOST/"$DB_HOST"/g' application.yml
                            sed -i 's/SERVER_HOST/"$SERVER_HOST"/g' application.yml
                        """
                    }

                    dir('BACKEND/watchify/src/main/resources'){
                        sh """
                            sed -i 's/THREE_S_ACCESSKEY/"$THREE_S_ACCESSKEY"/g' application-dev.yml
                            sed -i 's~THREE_S_SECRETKEY~'"$THREE_S_SECRETKEY"'~g' application-dev.yml
                            sed -i 's/THREE_S_BUCKET/"$THREE_S_BUCKET"/g' application-dev.yml
                            sed -i 's/FCM_JSON/"$FCM_JSON"/g' application-dev.yml
                        """
                    }

                    dir('BACKEND/watchify') { // 해당 directory로 들어가기 위해서는 cd는 안되고 대신 dir를 사용해야한다.
                        sh 'chmod +x gradlew'
                        sh './gradlew clean build -x test'
                    }

                    sh 'docker build -t $repository:backend$BUILD_NUMBER ./BACKEND/watchify'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:backend$BUILD_NUMBER'

                    dir('BACKEND/watchify/src/main/resources'){
                        sh """
                            sed -i 's/"$DB_USER"/DB_USER/g' application.yml
                            sed -i 's/"$DB_PW"/DB_PW/g' application.yml
                            sed -i 's/"$DB_HOST"/DB_HOST/g' application.yml
                            sed -i 's/"$SERVER_HOST"/SERVER_HOST/g' application.yml
                        """
                    }

                    dir('BACKEND/watchify/src/main/resources'){
                        sh """
                            sed -i 's/"$THREE_S_ACCESSKEY"/THREE_S_ACCESSKEY/g' application-dev.yml
                            sed -i 's~"$THREE_S_SECRETKEY"~'THREE_S_SECRETKEY'~g' application-dev.yml
                            sed -i 's/"$THREE_S_BUCKET"/THREE_S_BUCKET/g' application-dev.yml
                            sed -i 's/"$FCM_JSON"/FCM_JSON/g' application-dev.yml
                        """
                    }
                }
            }
        }

        stage('ReadOnlyBACKEND Build'){
            steps{
                echo 'ReadOnlyBACKEND Building'
                script {
                    def BUILD_NUMBER = currentBuild.number

                    dir('ReadOnlyBackend/watchify/src/main/resources'){
                        sh """
                            sed -i 's/DB_USER/"$DB_USER"/g' application.yml
                            sed -i 's/DB_PW/"$DB_PW"/g' application.yml
                            sed -i 's/READONLYDB_HOST/"$READONLYDB_HOST"/g' application.yml
                            sed -i 's/SERVER_HOST/"$SERVER_HOST"/g' application.yml
                        """
                    }

                    dir('ReadOnlyBackend/watchify/src/main/resources'){
                        sh """
                            sed -i 's/THREE_S_ACCESSKEY/"$THREE_S_ACCESSKEY"/g' application-dev.yml
                            sed -i 's~THREE_S_SECRETKEY~'"$THREE_S_SECRETKEY"'~g' application-dev.yml
                            sed -i 's/THREE_S_BUCKET/"$THREE_S_BUCKET"/g' application-dev.yml
                            sed -i 's/FCM_JSON/"$FCM_JSON"/g' application-dev.yml
                        """
                    }

                    dir('ReadOnlyBackend/watchify') { // 해당 directory로 들어가기 위해서는 cd는 안되고 대신 dir를 사용해야한다.
                        sh 'chmod +x gradlew'
                        sh './gradlew clean build -x test'
                    }

                    sh 'docker build -t $repository:readonlybackend$BUILD_NUMBER ./ReadOnlyBackend/watchify'
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:readonlybackend$BUILD_NUMBER'

                    dir('ReadOnlyBackend/watchify/src/main/resources'){
                        sh """
                            sed -i 's/"$DB_USER"/DB_USER/g' application.yml
                            sed -i 's/"$DB_PW"/DB_PW/g' application.yml
                            sed -i 's/"$READONLYDB_HOST"/READONLYDB_HOST/g' application.yml
                            sed -i 's/"$SERVER_HOST"/SERVER_HOST/g' application.yml
                        """
                    }

                    dir('ReadOnlyBackend/watchify/src/main/resources'){
                        sh """
                            sed -i 's/"$THREE_S_ACCESSKEY"/THREE_S_ACCESSKEY/g' application-dev.yml
                            sed -i 's~"$THREE_S_SECRETKEY"~'THREE_S_SECRETKEY'~g' application-dev.yml
                            sed -i 's/"$THREE_S_BUCKET"/THREE_S_BUCKET/g' application-dev.yml
                            sed -i 's/"$FCM_JSON"/FCM_JSON/g' application-dev.yml
                        """
                    }

                }
            }
        }

        stage('AI Build') {
            steps {
                echo 'AI Building'
                script {
                    def BUILD_NUMBER = currentBuild.number
                    // Django 보안 설정을 위하여 envfile에 들어가서 변경 > image 생성 > 다시 되돌리는 순서대로 진행
                    dir('AI/watchifyAI'){
                        sh """
                            sed -i 's/DB_NAME/"$DB_NAME"/g' settings.py
                            sed -i 's/DB_USER/"$DB_USER"/g' settings.py
                            sed -i 's/DB_PW/"$DB_PW"/g' settings.py
                            sed -i 's/DB_HOST/"$DB_HOST"/g' settings.py
                            sed -i 's/DB_PORT/"$DB_PORT"/g' settings.py
                        """
                    }
                    sh 'docker build -t $repository:ai$BUILD_NUMBER ./AI' // frontend 파일 생성
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin' // docker hub 로그인
                    sh 'docker push $repository:ai$BUILD_NUMBER' //docker push
                    dir('AI/watchifyAI'){
                        sh """
                            sed -i 's/"$DB_NAME"/DB_NAME/g' settings.py
                            sed -i 's/"$DB_USER"/DB_USER/g' settings.py
                            sed -i 's/"$DB_PW"/DB_PW/g' settings.py
                            sed -i 's/"$DB_HOST"/DB_HOST/g' settings.py
                            sed -i 's/"$DB_PORT"/DB_PORT/g' settings.py
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
                    def credentialId = env.CREDENTIAL_ID
                    def gitId = env.GIT_USER
                    def gitpassword = env.GIT_PASSWORD
                    // git pull을 미리 받음
                    withCredentials([usernamePassword(credentialsId: credentialId, passwordVariable: gitpassword, usernameVariable: gitId)]) {
                        sh 'git remote set-url origin https://sdc00035:diligent0924!@lab.ssafy.com/s08-final/S08P31A207.git'
                        sh 'git stash'
                        sh 'git switch main'
                        sh 'git pull origin main'
                    }
                    // kubfiles 내의 yaml 파일을 최신 버젼으로 변경
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

                        sh """
                            sed -i 's/watchify:readonlybackend\\([^:]*\\)/watchify:readonlybackend${BUILD_NUMBER}/g' readonlyback-service.yaml
                            git add readonlyback-service.yaml
                            git commit -m 'Update back-service tag to readonlyback-service${BUILD_NUMBER}'
                        """
                    }
                    // git main에 실제로 올린다. ( main )
                    withCredentials([usernamePassword(credentialsId: credentialId, passwordVariable: gitpassword, usernameVariable: gitId)]) {
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