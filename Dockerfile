FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Run your tests or start your app as needed
# CMD ["npx", "playwright", "test"]