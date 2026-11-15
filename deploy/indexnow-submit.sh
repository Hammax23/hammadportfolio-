#!/usr/bin/env bash
set -euo pipefail

KEY="02b00f43d5f74ab8b3a1ba201c6ecf72"
HOST="www.hammadiftikhar.com"
KEY_URL="https://${HOST}/${KEY}.txt"

curl -sI "$KEY_URL" | head -5
echo "---"

cat > /tmp/indexnow.json <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_URL}",
  "urlList": [
    "https://${HOST}/",
    "https://${HOST}/work",
    "https://${HOST}/about",
    "https://${HOST}/expertise",
    "https://${HOST}/contact",
    "https://${HOST}/history",
    "https://${HOST}/experience",
    "https://${HOST}/process"
  ]
}
EOF

CODE=$(curl -s -o /tmp/indexnow-res.txt -w "%{http_code}" \
  -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  --data-binary @/tmp/indexnow.json)

echo "IndexNow HTTP: ${CODE}"
cat /tmp/indexnow-res.txt
echo
