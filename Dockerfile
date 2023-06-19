# Stage 1 - the build process
FROM node:18-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2 - the production environment
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
# Install only production dependencies
RUN npm install --only=production
# Non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
# Copy built files from previous stage
COPY --from=build /usr/src/app/dist ./dist
# Permission change for the non-root user
RUN chown -R nestjs:nodejs /usr/src/app
USER nestjs

EXPOSE 3000
CMD ["npm", "run", "start:prod"]

