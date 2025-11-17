FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the production bundle using Vite
RUN npm run build


# ---------- 2) Production Image ----------
FROM nginx:stable-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from build stage to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config to support SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for nginx
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]