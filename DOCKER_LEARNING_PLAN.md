# Plan d'apprentissage Docker - Infrastructure complète

## Vue d'ensemble du projet

Tu vas créer une infrastructure Docker complète pour ton site CV avec :
- Frontend React/Vite servi par nginx
- Backend API Node.js/Express
- Base de données PostgreSQL
- Redis pour le cache
- Nginx reverse proxy
- Interface d'administration DB

---

## Phase 1: Les bases - Dockerfile pour le Frontend

### Concepts à apprendre
- Qu'est-ce qu'un Dockerfile
- Les instructions de base: `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, `EXPOSE`
- Multi-stage builds (optimisation)
- Différence entre `CMD` et `ENTRYPOINT`

### Ce que tu dois créer
**Fichier**: `Dockerfile`

**Structure attendue**:
```dockerfile
# Stage 1: Build
FROM node:XX-alpine AS builder
# Installer les dépendances
# Builder l'app React

# Stage 2: Production
FROM nginx:alpine
# Copier le build depuis le stage précédent
# Configurer nginx
```

### Points importants
- Utiliser `.dockerignore` pour exclure `node_modules`, `.git`, etc.
- Optimiser l'ordre des layers pour le cache Docker
- Utiliser une image Alpine (légère)

---

## Phase 2: Docker Compose - Orchestration basique

### Concepts à apprendre
- Qu'est-ce que Docker Compose
- Fichier `docker-compose.yml` (syntaxe YAML)
- Services, networks, volumes
- Variables d'environnement
- Port mapping (3000:80)

### Ce que tu dois créer
**Fichier**: `docker-compose.yml`

**Services à définir**:
```yaml
services:
  frontend:
    build: .
    ports:
      - "3000:80"
```

### Commandes Docker Compose à connaître
```bash
docker-compose up           # Démarrer tous les services
docker-compose up -d        # Démarrer en arrière-plan
docker-compose down         # Arrêter et supprimer les conteneurs
docker-compose build        # Reconstruire les images
docker-compose logs -f      # Voir les logs en temps réel
docker-compose ps           # Voir les services actifs
```

---

## Phase 3: Backend API + Base de données

### Concepts à apprendre
- Communication entre conteneurs (networks)
- Variables d'environnement pour la configuration
- Volumes pour la persistance des données
- `depends_on` pour l'ordre de démarrage
- Health checks

### Ce que tu dois créer

#### 3.1 Backend API
**Dossier**: `backend/`
**Fichiers**:
- `backend/Dockerfile`
- `backend/package.json`
- `backend/src/index.js` (serveur Express basique)

**Endpoints à créer**:
- `GET /api/health` - Check si l'API est alive
- `GET /api/profile` - Retourner des données depuis la DB
- `POST /api/contact` - Sauvegarder un message en DB

#### 3.2 PostgreSQL
**Service dans docker-compose.yml**:
```yaml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: cvsite
    POSTGRES_USER: user
    POSTGRES_PASSWORD: password
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

### Points importants
- Le backend doit se connecter à postgres via le nom du service
- Les volumes permettent de garder les données même si on supprime le conteneur
- Utiliser un fichier `.env` pour les secrets

---

## Phase 4: Redis pour le cache

### Concepts à apprendre
- Qu'est-ce que Redis (in-memory cache)
- Cas d'usage du cache
- TTL (Time To Live)

### Ce que tu dois créer
**Service dans docker-compose.yml**:
```yaml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
```

**Utilisation dans le backend**:
- Cacher les réponses d'API
- Stocker des sessions utilisateur (bonus)

---

## Phase 5: Nginx Reverse Proxy

### Concepts à apprendre
- Qu'est-ce qu'un reverse proxy
- Routage des requêtes
- Configuration nginx
- Pourquoi c'est utilisé en production

### Ce que tu dois créer
**Fichier**: `nginx/nginx.conf`

**Configuration**:
```nginx
server {
    listen 80;

    # Route /api vers le backend
    location /api {
        proxy_pass http://backend:3001;
    }

    # Route / vers le frontend
    location / {
        proxy_pass http://frontend:80;
    }
}
```

**Service dans docker-compose.yml**:
```yaml
nginx:
  image: nginx:alpine
  ports:
    - "8080:80"
  volumes:
    - ./nginx/nginx.conf:/etc/nginx/nginx.conf
  depends_on:
    - frontend
    - backend
```

---

## Phase 6: Interface d'administration

### Ce que tu dois créer
**Service Adminer** (interface web pour PostgreSQL):
```yaml
adminer:
  image: adminer
  ports:
    - "8081:8080"
  depends_on:
    - postgres
```

**Accès**: `http://localhost:8081`

---

## Phase 7: Développement vs Production

### Concepts à apprendre
- Différence entre dev et prod
- Hot reload en développement
- Optimisations de production
- Multi-fichiers docker-compose

### Ce que tu dois créer
**Fichiers**:
- `docker-compose.dev.yml` - Avec hot reload, volumes montés
- `docker-compose.prod.yml` - Images optimisées, pas de volumes de code

**Commandes**:
```bash
# Développement
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## Phase 8: Optimisations et bonnes pratiques

### Checklist des optimisations
- [ ] `.dockerignore` bien configuré
- [ ] Multi-stage builds pour réduire la taille
- [ ] Images Alpine quand possible
- [ ] Layers Docker bien ordonnés (cache optimal)
- [ ] Secrets dans `.env`, jamais en dur
- [ ] Health checks sur les services critiques
- [ ] Restart policies (restart: unless-stopped)
- [ ] Logs configurés correctement
- [ ] Networks isolés par fonction

### Sécurité
- [ ] Ne jamais commit les `.env`
- [ ] Utiliser des users non-root dans les conteneurs
- [ ] Limiter les resources (CPU, mémoire)
- [ ] Scan des vulnérabilités: `docker scan <image>`

---

## Architecture finale

```
                    Internet
                        |
                   [Nginx Reverse Proxy :8080]
                        |
                /-------+-------\
                |               |
        [Frontend :80]    [Backend API :3001]
                                |
                        /-------+-------\
                        |               |
                [PostgreSQL :5432]  [Redis :6379]
                        |
                  [Adminer :8081]
```

---

## Commandes Docker essentielles à connaître

### Images
```bash
docker images                    # Lister les images
docker build -t myapp .          # Builder une image
docker rmi <image>               # Supprimer une image
docker image prune               # Nettoyer les images inutilisées
```

### Conteneurs
```bash
docker ps                        # Conteneurs actifs
docker ps -a                     # Tous les conteneurs
docker stop <container>          # Arrêter un conteneur
docker rm <container>            # Supprimer un conteneur
docker logs <container>          # Voir les logs
docker exec -it <container> sh   # Entrer dans un conteneur
```

### Volumes
```bash
docker volume ls                 # Lister les volumes
docker volume rm <volume>        # Supprimer un volume
docker volume prune              # Nettoyer les volumes inutilisés
```

### Nettoyage
```bash
docker system prune              # Tout nettoyer
docker system prune -a           # Tout nettoyer + images inutilisées
```

---

## Fichiers à créer (récapitulatif)

```
CV-Site/
├── Dockerfile                          # Frontend React
├── docker-compose.yml                  # Config de base
├── docker-compose.dev.yml              # Override développement
├── docker-compose.prod.yml             # Override production
├── .dockerignore                       # Fichiers à ignorer
├── .env.example                        # Template des variables
├── nginx/
│   └── nginx.conf                      # Config reverse proxy
├── backend/
│   ├── Dockerfile                      # Backend API
│   ├── package.json
│   └── src/
│       └── index.js                    # Serveur Express
└── DOCKER_LEARNING_PLAN.md            # Ce fichier
```

---

## Ressources utiles

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Docker Hub](https://hub.docker.com/) - Images officielles

---

## Prochaines étapes

1. Commence par la Phase 1: Créer le `Dockerfile` pour le frontend
2. Test avec `docker build -t cv-site-frontend .`
3. Passe à la Phase 2: `docker-compose.yml` basique
4. Ajoute les services un par un (Phases 3-6)
5. Optimise (Phases 7-8)

**Bon courage! N'hésite pas à me demander de l'aide pour chaque phase.**
