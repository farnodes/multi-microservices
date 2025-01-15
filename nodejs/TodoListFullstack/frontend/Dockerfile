FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000


CMD ["sh", "-c", "npm run dev --host=0.0.0.0 && tail -f /dev/null"]

