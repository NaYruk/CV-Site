# Image Node.js Alpine
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port 5001
EXPOSE 5001

# Démarrer le serveur
CMD ["npm", "start"]
