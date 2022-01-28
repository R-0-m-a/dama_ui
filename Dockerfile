# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.18.1-alpine as build

# Set environment variables for configuration FIREBASE from arguments
ARG FB_API_KEY
ARG FB_DATABASE_URL
ARG FB_AUTH_DOMAIN
ARG FB_PROJECT_ID
ARG FB_STORAGE_BUCKET
ARG FB_MESSAGING_SENDER_ID
ARG FB_APP_ID
ARG FB_MEASUREMENT_ID

ENV FIREBASE_API_KEY=$FB_API_KEY
ENV FIREBASE_DATABASE_URL=$FB_DATABASE_URL
ENV FIREBASE_AUTH_DOMAIN=$FB_AUTH_DOMAIN
ENV FIREBASE_PROJECT_ID=$FB_PROJECT_ID
ENV FIREBASE_STORAGE_BUCKET=$FB_STORAGE_BUCKET
ENV FIREBASE_MESSAGING_SENDER_ID=$FB_MESSAGING_SENDER_ID
ENV FIREBASE_APP_ID=$FB_APP_ID
ENV FIREBASE_MEASUREMENT_ID=$FB_MEASUREMENT_ID

# Set the working directory
WORKDIR /usr/local/app
# Add the source code to app
COPY ./ /usr/local/app/
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build --prod
# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/dama-ui /usr/share/nginx/html
# Expose port 80
EXPOSE 80
