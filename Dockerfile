FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install --legacy-peer-dep

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
