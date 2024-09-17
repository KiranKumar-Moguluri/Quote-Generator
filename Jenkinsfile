pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the repository
                git url: 'https://github.com/KiranKumar-Moguluri/Quote-Generator.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Run tests
                sh 'npm test'
            }
        }
    }

    post {
        always {
            // Archive test results (if you generate any)
            junit '**/test-results.xml'
        }
        failure {
            // Send notification on failure
            mail to: 'kirankumarm131998@gmail.com',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.JOB_NAME}.\nPlease check!"
        }
    }
}
