FROM nginx:alpine

# Copy server config (NOT nginx.conf)
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy frontend build
COPY frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
