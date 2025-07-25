pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/Rafael140495/teste-api-ebac'
            }
        }
        stage('Instalar dependências') {
            steps {
                bat 'npm install'
            }
        }
        stage('Subir servidor') {
              steps {
                // Iniciar o servidor em background
                bat 'start /b npm start'
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
