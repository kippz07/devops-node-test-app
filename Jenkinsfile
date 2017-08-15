node('master') {
    
    git credentialsId: '9fca6f6e-bb77-4462-bb38-a25fac2d5ef1', url: 'git@github.com:kippz07/devops-node-test-app.git'
    
    stage('testing') {
        sshagent(['0b25bf4f-a4a8-4922-8d4c-6d88c1b3369c']) {
            sh 'ssh ubuntu@ec2-18-220-104-193.us-east-2.compute.amazonaws.com rm -rf app'
            sh 'scp -r . ubuntu@ec2-18-220-104-193.us-east-2.compute.amazonaws.com:/home/ubuntu/app'
            sh '''ssh ubuntu@ec2-18-220-104-193.us-east-2.compute.amazonaws.com << EOF
                export DB_HOST=mongodb://18.220.196.83/test
                cd app
                // ./environment/box_app/provision.sh
                berks vender cookbooks
                sudo chef-client --local-mode --runlist 'recipe[node-server]'
                npm install
                npm test'''
        }
        
        
    }
     
    stage('deployment') {
        sshagent(['0b25bf4f-a4a8-4922-8d4c-6d88c1b3369c']) {
            sh 'ssh ubuntu@ec2-52-15-176-248.us-east-2.compute.amazonaws.com rm -rf app'
            sh 'scp -r . ubuntu@ec2-52-15-176-248.us-east-2.compute.amazonaws.com:/home/ubuntu/app'
            sh '''ssh ubuntu@ec2-52-15-176-248.us-east-2.compute.amazonaws.com << EOF
                export DB_HOST=mongodb://18.220.196.83/test
                cd app
                ./environment/box_app/provision.sh
                npm install
                pm2 stop app.js
                pm2 start app.js'''
        }
    }
}