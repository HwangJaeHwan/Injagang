pipeline {
    agent any

    stages {
        stage('Prepare Redis') {
            steps {
                sh '''
                    docker network create test-network || true
                    docker rm -f redis || true
                    docker run -d --name redis --network test-network redis:7
                '''
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'gradle:8.5-jdk17'
                    args '--network test-network'
                    reuseNode true
                }
            }

            steps {
                sh '''
                    chmod +x ./gradlew
                    sh './gradlew clean test -Dspring.profiles.active=test --stacktrace'
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f redis || true'
        }
    }
}