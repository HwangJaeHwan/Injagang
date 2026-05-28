pipeline {
    agent any

    stages {
        stage('Prepare Redis') {
            steps {
                sh '''
                    docker network create test-network || true
                    docker rm -f redis-test || true
                    docker run -d --name redis-test --network test-network redis:7
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
                    ./gradlew clean test -Dspring.profiles.active=test
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f redis-test || true'
        }
    }
}