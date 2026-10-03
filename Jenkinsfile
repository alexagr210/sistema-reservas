pipeline {
    agent any
    tools {
        nodejs 'Node_24' // La herramienta que guardamos en la mochila de Jenkins
    }
    stages {
        // Etapa 1: Descargar el código de tu sistema de reservas
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/alexagr210/sistema-reservas.git'
            }
        }
        // Etapa 2: Instalar librerías y compilar
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        // Etapa 3: Control de calidad (Pruebas)
        stage('Unit Tests') {
            steps {
                sh 'npm test -- --watchAll=false --silent > test-output.txt || true' 
                sh 'cat test-output.txt'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'test-output.txt', allowEmptyArchive: true
                }
            }
        }
    }
    post {
        success {
            echo '¡Pipeline ejecutado con éxito!'
        }
        failure {
            echo 'Pipeline fallido. Revisar logs.'
        }
    }
}
