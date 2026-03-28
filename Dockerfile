FROM nginx:alpine

# Copy your app
COPY src/ /usr/share/nginx/html/

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]