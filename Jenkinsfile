pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Rafael140495/teste-ebac-ui.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
        stage('Executar testes') {
            steps {
                bat '''set NO_COLOR=1
npm test'''
            }
        }
    }
}