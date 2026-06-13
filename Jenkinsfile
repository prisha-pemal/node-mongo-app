pipeline {

    agent any

    environment {

        IMAGE_NAME = "dockerhubuser/nodeapp"

        CONTAINER_NAME = "nodeapp"

    }

    triggers {

        githubPush()

    }

    stages {

        stage('Checkout') {

            steps {

                git branch: 'main',
                url: 'https://github.com/prisha-pemal/node-mongo-app.git'

            }
        }

        stage('Install Dependencies') {

            steps {

                bat 'npm install'

            }
        }

        stage('Run Tests') {

            steps {

                bat 'npm test'

            }
        }

        stage('Build Docker Image') {

            steps {

                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'

            }
        }

        stage('Docker Login') {

            steps {

                withCredentials([
                usernamePassword(
                credentialsId:'dockerhub-creds',
                usernameVariable:'USER',
                passwordVariable:'PASS'
                )]) {

                    sh '''
                    echo $PASS | docker login \
                    -u $USER \
                    --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {

            steps {

                sh '''
                docker push \
                $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Deploy') {

            steps {

                sh '''
                docker stop $CONTAINER_NAME || true

                docker rm $CONTAINER_NAME || true

                docker run -d \
                --name $CONTAINER_NAME \
                -p 3000:3000 \
                $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }
    }

    post {

        success {

            echo 'Deployment Successful'

        }

        failure {

            echo 'Deployment Failed'

        }
    }
}