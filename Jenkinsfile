pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim'
            args '-p 3000:3000', '-p 8080:8080'
        }
    }
    stages {
        stage('Build Frontend') {
            steps {
                sh 'cd UI && yarn'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'cd Service && npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'cd UI && ./jenkins/scripts/test.sh'
            }
        }
        stage('Deliver') { 
            steps {
                sh './jenkins/scripts/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}