#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "==> Pulling latest code"
git pull origin main

echo "==> Installing dependencies"
npm ci

echo "==> Building"
npm run build

echo "==> Running migrations"
npm run db:migrate

echo "==> Restarting app"
pm2 startOrReload ecosystem.config.js --update-env
pm2 save

echo "==> Done"