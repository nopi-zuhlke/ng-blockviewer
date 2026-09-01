#!/bin/sh
set -e

: "${BACKEND_BASE_URL:=http://localhost:3000}"

cat > /usr/share/nginx/html/config.json <<EOF
{
  "backendBaseUrl": "${BACKEND_BASE_URL}"
}
EOF
