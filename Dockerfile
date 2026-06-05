FROM node:18 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install postcss@8.4.31 --save-exact \
  && npm install --legacy-peer-deps

COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
