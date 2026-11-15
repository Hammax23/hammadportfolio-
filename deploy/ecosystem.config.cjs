module.exports = {
  apps: [
    {
      name: "hammad-portfolio",
      cwd: "/var/www/hammad-portfolio",
      script: "npm",
      args: "start -- -p 3006",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3006,
      },
    },
  ],
};
