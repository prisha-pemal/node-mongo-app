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
                 bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% -f public/Dockerfile .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    bat '''
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                bat 'docker push %IMAGE_NAME%:%BUILD_NUMBER%'
            }
        }

        stage('Deploy') {
            steps {

                bat '''
                docker stop %CONTAINER_NAME%
                '''

                bat '''
                docker rm %CONTAINER_NAME%
                '''

                bat '''
                docker run -d --name %CONTAINER_NAME% -p 3000:3000 %IMAGE_NAME%:%BUILD_NUMBER%
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

        always {
            cleanWs()
        }
    }
}