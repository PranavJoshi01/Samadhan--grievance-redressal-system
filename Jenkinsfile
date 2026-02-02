pipeline {
    agent any

    environment {
        REPO_URL = "https://github.com/PranavJoshi01/Samadhan--grievance-redressal-system"
        BRANCH = "dev"
        COMPOSE_FILE = "docker-compose.yml"
        PROJECT_NAME = "samadhan"
    }

    stages {

        stage('SCM Checkout') {
            steps {
                echo "Checking out source code..."
            }
        }

        stage('Git Clone (Fresh)') {
            steps {
                echo "Cloning latest code..."
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Docker Compose Build') {
            steps {
                echo "Building Docker images using docker-compose..."
                bat "docker-compose -p ${PROJECT_NAME} build"
            }
        }

        stage('Docker Compose Deploy') {
            steps {
                echo "Deploying containers using docker-compose..."

                bat """
                docker-compose -p ${PROJECT_NAME} down
                docker-compose -p ${PROJECT_NAME} up -d
                """
            }
        }

        
    }

}
