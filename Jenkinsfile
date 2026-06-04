pipeline {
    agent any


    environment {
        APP_VERSION = "1.0.$BUILD_ID"
        APP_NAME = 'relaymentor'
        AWS_DEFAULT_REGION = 'ap-northeast-2'
        AWS_DOCKER_REGISTRY = '992848511974.dkr.ecr.ap-northeast-2.amazonaws.com'
    }

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
                    ./gradlew clean build -Dspring.profiles.active=test
                    mv ./build/libs/*.jar ./build/libs/app.jar
                '''
            }
        }
        stage('Build Docker Image') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args "-u root --entrypoint='' -v /var/run/docker.sock:/var/run/docker.sock"
                }
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'my-aws',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        set -e

                        yum install -y docker

                        aws ecr get-login-password \
                            | docker login \
                                --username AWS \
                                --password-stdin $AWS_DOCKER_REGISTRY

                        docker build \
                            -t $AWS_DOCKER_REGISTRY/$APP_NAME:$APP_VERSION .

                        docker push \
                            $AWS_DOCKER_REGISTRY/$APP_NAME:$APP_VERSION
                    '''
                }
            }
        }


        stage('Deploy AWS ECS') {
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args "-u root --entrypoint=''"
                }
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'my-aws',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        set -e
                        cp ecs/task-definition.json ecs/task-definition-"$APP_VERSION".json
                        sed -i "s/#APP_VERSION#/$APP_VERSION/g" ecs/task-definition-$APP_VERSION.json

                        aws ecs register-task-definition \
                            --cli-input-json file://ecs/task-definition-"$APP_VERSION".json

                        aws ecs update-service \
                            --cluster relaymentor \
                            --service relaymentor-api \
                            --task-definition relaymentor-api \
                            > /dev/null
                    '''
                }
            }
        }
    }

    post {
        always {

            sh '''
                docker rm -f redis || true
                rm ecs/task-definition-"$APP_VERSION".json
            '''
        }
    }
}