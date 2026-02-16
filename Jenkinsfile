pipeline {
    agent any

    tools {
        nodejs 'NodeJS-21'
    }

    parameters {
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run browser in headless mode'
        )
        string(
            name: 'TAG',
            defaultValue: '',
            description: 'Cucumber tag expression (e.g., @smoke, @regression)'
        )
    }

    environment {
        HEADLESS = "${params.HEADLESS != null ? params.HEADLESS : true}"
        TAG = "${params.TAG ?: ''}"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running WDIO tests - Headless: ${HEADLESS}, Tag: ${TAG}"
                bat 'npm test'
            }
        }

        stage('Publish Report') {
            steps {
                echo 'Publishing Cucumber HTML Report...'
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: '.tmp/report',
                    reportFiles: 'index.html',
                    reportName: 'Cucumber Test Report',
                    reportTitles: 'WDIO Demo - Login Scenarios'
                ])
            }
        }
    }

    post {
        always {
            echo 'Archiving test artifacts...'
            archiveArtifacts artifacts: '.tmp/report/**/*', allowEmptyArchive: true
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Tests failed. Check the Cucumber HTML report for details.'
        }
        cleanup {
            cleanWs()
        }
    }
}
