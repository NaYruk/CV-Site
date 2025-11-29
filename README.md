# 🕹️ Portfolio Terminal - Arcade Edition

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> Un portfolio interactif inspiré des bornes d'arcade rétro, combinant une interface terminal immersive avec une expérience utilisateur unique.

## ✨ Caractéristiques

### 🎮 Interface Double Vue
- **Vue Arcade** : Une borne d'arcade nostalgique avec effet de zoom cinématique
- **Terminal Interactif** : Un terminal Unix-like entièrement fonctionnel
- Transition fluide entre les deux vues avec animations personnalisées

### 💻 Terminal Fonctionnel
- **10+ commandes disponibles** : `help`, `whoami`, `projects`, `socials`, `education`, etc.
- **Autocomplétion intelligente** (Tab) : Suggestions de commandes en temps réel
- **Historique de commandes** : Navigation avec ↑↓, persistance en localStorage
- **Effets sonores rétro** : Sons de frappe authentiques (espace, touche standard, entrée)
- **Animation de boot** : Séquence de démarrage arcade complète au premier lancement
- **Responsive design** : Avertissements adaptatifs pour petits écrans

### 🎨 Design & Effets Visuels
- Police DOS authentique (Perfect DOS VGA 437)
- Effet scanline CRT réaliste
- Animations de chargement progressives
- Thème arcade vintage avec palette de couleurs rétro
- Curseur carré clignotant style terminal

## 🚀 Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (v18+ recommandé)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/NaYruk/CV-Site.git
cd CV-Site

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:5173](http://localhost:5173)

### Build Production

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

## 📁 Structure du Projet

```
CV-Site/
├── public/
│   ├── fonts/              # Police DOS VGA
│   ├── img/                # Assets visuels (arcade, background)
│   └── sounds/             # Effets sonores (clavier, touches)
├── src/
│   ├── commands/           # Commandes du terminal
│   │   ├── help.tsx        # Aide et liste des commandes
│   │   ├── whoami.tsx      # Informations personnelles
│   │   ├── projects.tsx    # Portfolio de projets
│   │   ├── socials.tsx     # Liens réseaux sociaux
│   │   ├── education.tsx   # Parcours scolaire
│   │   ├── tree.tsx        # Arborescence du portfolio
│   │   └── ...             # Autres commandes (date, echo, clear, hack)
│   ├── components/
│   │   ├── Terminal.tsx    # Composant terminal principal
│   │   └── ArcadeView.tsx  # Vue borne d'arcade
│   ├── types/
│   │   └── HistoryItem.ts  # Types TypeScript
│   ├── utils/
│   │   └── loadingMessages.tsx  # Animations de chargement
│   ├── App.tsx             # Composant racine
│   └── main.tsx            # Point d'entrée
└── package.json
```

## 🎯 Commandes Disponibles

### Commandes Principales
| Commande | Description |
|----------|-------------|
| `help` | Affiche la liste des commandes disponibles |
| `whoami` | Informations personnelles et compétences |
| `projects` | Portfolio des projets réalisés (TICFE, Minishell, Cub3D) |
| `socials` | Liens vers GitHub, LinkedIn, Instagram |
| `education` | Parcours scolaire et formation |
| `tree` | Structure arborescente du portfolio |

### Commandes Utilitaires
| Commande | Description |
|----------|-------------|
| `date` | Affiche la date et l'heure actuelles |
| `echo [texte]` | Affiche le texte fourni |
| `clear` | Efface le contenu du terminal |
| `hack` | Animation de "hacking" ludique |
| `exit` / `quit` | Retour à la vue arcade |

### Raccourcis Clavier
- `Tab` : Autocomplétion des commandes
- `↑` / `↓` : Navigation dans l'historique
- `Esc` : Retour à la borne d'arcade
- `Enter` : Exécuter une commande

## 🛠️ Technologies Utilisées

### Frontend
- **React 19.2.0** - Framework UI moderne avec React Compiler
- **TypeScript 5.9.3** - Typage statique pour plus de robustesse
- **Vite 7.2.2** (Rolldown) - Build tool ultra-rapide

### Développement
- **ESLint** - Linting et qualité de code
- **React Hooks** - Gestion d'état moderne (useState, useEffect, useRef)
- **localStorage** - Persistance de l'historique des commandes

### Features Avancées
- **Babel React Compiler** - Optimisations automatiques
- **CSS Custom** - Animations et effets personnalisés
- **Audio API** - Effets sonores interactifs

## 🎨 Projets Mis en Avant

### 🏆 TICFE Assist
**1er Prix Hackathon Bourgogne-Franche-Comté**
- Auto-complétion de formulaires de remboursement TICFE
- Stack : Django, Python, API REST, PostgreSQL
- [Voir le projet](https://github.com/TICFE-DJANGO/TICFE)

### 📟 Minishell
**Projet École 42 - Tronc Commun**
- Recréation d'un shell type Bash en C
- Gestion des pipes, redirections, variables d'environnement
- [Voir le projet](https://github.com/NaYruk/Minishell)

### 🪖 Cub3D
**Projet École 42 - Tronc Commun**
- FPS style Wolfenstein 3D avec raycasting
- Mathématiques avancées et rendu 3D en C
- [Voir le projet](https://github.com/SefgaultBros/Cub3D)

## 📝 Scripts NPM

```bash
npm run dev      # Serveur de développement avec hot-reload
npm run build    # Build de production optimisé (TypeScript + Vite)
npm run preview  # Prévisualisation du build de production
npm run lint     # Analyse du code avec ESLint
```

## 🌐 Déploiement

Le projet est optimisé pour être déployé sur :
- **Vercel** / **Netlify** (recommandé pour projets Vite)
- **GitHub Pages**
- Tout service supportant les sites statiques

### Build et Déploiement
```bash
npm run build
# Le dossier dist/ contient les fichiers optimisés prêts pour le déploiement
```

## 🎓 Contexte Éducatif

Ce portfolio a été créé dans le cadre de la formation à [École 42 Mulhouse](https://42mulhouse.fr/), démontrant :
- Maîtrise de React et TypeScript
- Créativité dans le design UI/UX
- Capacité à créer des expériences utilisateur immersives
- Compétences en développement front-end moderne

## 👨‍💻 Auteur

**Marc Milliot**
- 🎓 Étudiant à École 42 Mulhouse
- 💼 Développeur Junior Full-Stack
- 🔍 Recherche stage/alternance en développement

### Liens
- [GitHub](https://github.com/NaYruk)
- [LinkedIn](https://www.linkedin.com/in/marc-milliot-a61651383)
- [Instagram](https://www.instagram.com/marc.milliot)

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 🙏 Remerciements

- École 42 Mulhouse pour la formation
- Inspirations : terminaux Unix, bornes d'arcade vintage
- Communauté React et TypeScript

---

<div align="center">

**Made with ❤️ and lots of ☕**

*"Insert coin to continue..."*

</div>
