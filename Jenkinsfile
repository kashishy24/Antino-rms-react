// pipeline { 
// agent any

//     tools {

//             nodejs '14.20.0'

//     }



//     stages {

//         stage('build app rms fe') {

//             steps {

//                script {

//                   echo 'Building Application.....'

//                   sh "node --version"

//                }

//             }

//         }



//         stage('deploy') {

//             steps {

//                 script {

//                    echo 'deploying docker image to Antino Server.........'



//                    def shellCmd = "bash /root/rms-fe-scripts/build_script.sh"
//                    def antino = "root@216.48.189.150"

//                     sh "ssh -o StrictHostKeyChecking=no ${antino} ${shellCmd}"


//             }

//         }

//     }
//     }
// }


pipeline {
    agent any

    environment {
        SSHUSERNAME = "root"
        STAGING_SCRIPTPATH = "/root/antino-rms/frontend/development"
        PRODUCTION_SCRIPTPATH = "/root/antino-rms/frontend/production"
        IP = "216.48.189.150"
    }

    stages{
        stage('Build & Deploy to Staging') {
            steps{
              sshagent (credentials: ['antino-new']) {
                sh "ssh -o StrictHostKeyChecking=no ${SSHUSERNAME}@${IP} 'cd ${STAGING_SCRIPTPATH} && git fetch origin && git checkout dev && git pull origin && bash -x deploy-staging.sh 2>&1'"
              }
            }
        }
    }
    // stages{
    //     stage('Build & Deploy to Production') {
    //         steps{
    //           sshagent (credentials: ['antino-new']) {
    //             sh "ssh -o StrictHostKeyChecking=no ${SSHUSERNAME}@${IP} 'cd ${SCRIPTPATH} && git fetch origin && git checkout main && git pull origin && bash -x deploy-staging.sh 2>&1'"
    //           }
    //         }
    //     }
    // }
}
