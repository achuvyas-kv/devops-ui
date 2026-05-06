FROM node:18-bullseye

WORKDIR /app

# Copy only manifests first for better caching
COPY package.json package-lock.json ./

# Follow the user's exact install steps
RUN npm install postcss@8.4.31 --save-exact \
  && npm install --legacy-peer-deps

# Now copy the rest of the app
COPY . .

# CRA dev server default port
EXPOSE 3000

# Ensure the dev server is reachable from outside the container
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["sh", "-lc", "NODE_OPTIONS=--openssl-legacy-provider npm start"]
