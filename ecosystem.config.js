module.exports = {
  apps: [
    {
      name: 'website',
      script: 'npm run start',
      watch: false
    }
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '51.210.243.88',
      ref: 'origin/master',
      repo: 'git@github.com:ValJed/website.git',
      path: '/var/www/website',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}
