// pm2 start ecosystem.config.js --only admin
module.exports = {
  apps: [
    {
      name: 'nuxt-dev',
      script: 'npm',
      args: 'run dev'
    },
    {
      name: 'admin',
      script: 'npm',
      args: 'run start'
    },
    {
      name: 'admin-next',
      script: 'npm',
      args: 'run start'
    }
  ]
}
