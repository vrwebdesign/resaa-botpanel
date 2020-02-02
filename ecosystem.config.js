// pm2 start ecosystem.config.js --only admin
module.exports = {
  apps: [
    {
      name: 'admin',
      script: 'npm',
      args: 'run start'
    }
  ]
}
