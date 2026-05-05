FROM node:20-slim
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]
