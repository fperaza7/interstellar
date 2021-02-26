#Step 1
FROM node:latest as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Step 2
FROM nginx:stable-alpine
COPY --from=build-step app/dist/interstellar-frontend/ /usr/share/nginx/html
