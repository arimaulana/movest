FROM node:12.16.3-alpine AS development

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# RUN npm ci --only=development
# RUN npm install --only=development
# Have issue, cannot install only dev here, so for a workaround, install all here. (and we cannot see the performance benefit of multistage here)
RUN npm ci

# Copy local code to the container image.
COPY . .
