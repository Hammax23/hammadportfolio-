#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/hammad-portfolio"
REPO_URL="${REPO_URL:-https://github.com/Hammax23/hammadportfolio-.git}"
DOMAIN="hammadiftikhar.com"
WWW_DOMAIN="www.hammadiftikhar.com"

export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

npm install -g pm2

mkdir -p /var/www/certbot
mkdir -p "$APP_DIR"

if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  git -C "$APP_DIR" fetch --all
  git -C "$APP_DIR" reset --hard origin/master
fi

cd "$APP_DIR"
npm ci
npm run build

cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/hammad-portfolio
ln -sfn /etc/nginx/sites-available/hammad-portfolio /etc/nginx/sites-enabled/hammad-portfolio
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

pm2 start "$APP_DIR/deploy/ecosystem.config.cjs"
pm2 save
pm2 startup systemd -u root --hp /root | tail -n 1 | bash || true

ufw allow OpenSSH
ufw allow "Nginx Full"
ufw --force enable

echo ""
echo "=== Base setup done ==="
echo "1. Put production env at: $APP_DIR/.env.local"
echo "2. Then run: cd $APP_DIR && npm run build && pm2 restart hammad-portfolio"
echo "3. After DNS points here, run:"
echo "   certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --redirect -m CONTACT_EMAIL --agree-tos -n"
