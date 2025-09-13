# Projet React – Gestion Étudiants et Tuteurs

Ce projet est une application web développée en **React** pour le frontend et **Express.js + MySQL** pour le backend.  
L’application permet de gérer les étudiants, les tuteurs, et d’effectuer un **matchmaking** entre eux selon les matières, niveaux et disponibilités.

---

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Démarrage](#démarrage)
- [Fonctionnalités](#fonctionnalités)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Technologies utilisées

- **Frontend :**
  - React.js
  - Framer Motion
  - FontAwesome Icons
  - React Router DOM

- **Backend :**
  - Node.js / Express.js
  - Sequelize ORM
  - MySQL
  - Cors

---
<!-- env -->
Cree la base de donnee tutoringdb

DB_NAME=tutoringdb
DB_USER=root
DB_PASSWORD=newpassword123
DB_HOST=localhost
PORT=3000


## Installation

1. **Cloner le projet :**

```bash
git clone https://github.com/votre-utilisateur/votre-projet.git
cd votre-projet

Installer le frontend :

cd frontend/my-app
npm install


cd ../../backend
npm install