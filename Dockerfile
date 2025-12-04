# ========= Stage 1 : BUILD ============
FROM node:20-alpine AS builder

# Definir le repertoire de travail
WORKDIR /app

#Copier les packages.json et package-lock.json Ce sont les fichier generer par le framework / vite
#On les copue en premier pour profiter du cache DOCKER
COPY package*.json ./

#installer toutes les dependances (dev + prod)
#Necessaire pour le build
RUN npm ci

#COPIER TOUT LE CODE SOURCE
COPY . .

#Builder l'application (genere le dossier /dist pour vite)
#Commande dependant du framework
RUN npm run build




#======== Stage 2 : Production ========
FROM nginx:alpine

#Copier les fichier build depuis le stage builder
#Vers le dossier par defaut de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

#Copier la configuration Nginx personnalisee
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
