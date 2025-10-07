properties([
    disableConcurrentBuilds(abortPrevious: true), // Kill older builds
    buildDiscarder(logRotator(numToKeepStr: '1')), // Keep only last build
    pipelineTriggers([
        pollSCM('') // Adjust polling as needed
    ])
])


pipeline {
    agent any

    stages {

        stage('Requirments') 
        {
            steps {
                script {
                    sh 'echo $PATH'
                    sh 'which git || echo "git not found"'
                }
            }
        }

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://gitea.techa.me/techa-gitea-admin/Techa-Admin.git'
            }
        }

        stage('Install') {
            steps {
                script {
                    try {
                        sh 'sudo pnpm install'
                    } catch (err) {
                        error("Install failed: ${err}")
                    }
                }
            }
        }

        stage('Run') {
            steps {
                script {
                    try {
                        sh 'sudo pnpm run dev'
                        echo 'Run completed successfully ✅'
                    } catch (err) {
                        error("Run failed ❌: ${err}")
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Build finished SUCCESSFULLY 🎉'
        }
        failure {
            echo 'Build FAILED ❌'
        }
    }
}