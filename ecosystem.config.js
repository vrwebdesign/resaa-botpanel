// pm2 start ecosystem.config.js --only panel
module.exports = {
  apps: [
    {
      name: 'panel',
      script: 'npm',
      args: 'run start'
    }
  ]
}
