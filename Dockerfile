# Use lightweight Node.js version
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Open port 5000 or use environment variable for Render's assigned port
EXPOSE 5000

# Run the server (ensure process.env.PORT is used in your app)
CMD ["npm", "start"]
