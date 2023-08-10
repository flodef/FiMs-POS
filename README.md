# Présentation

Ce projet est destiné à faciliter l'utilisation d'une caisse enregistreuse.

Il est constitué d'une application web facilement accessible en ligne depuis un navigateur, sur mobile, tablette ou ordinateur.

Il est également possible de l'utiliser hors-ligne, en chargeant l'application puis en laissant l'onglet du navigateur ouvert.

L'application mobile est disponible en production à l'adresse suivante : [pos.fims.fi](https://pos.fims.fi)

Elle est également disponible en développent à l'adresse suivante : [pos-dev.fims.fi](https://pos-dev.fims.fi)

# S'approprier le projet

Le projet étant open source, il est possible de le cloner et de l'utiliser pour ses propres besoins.

## Création des données

### Importer les données de démonstration

Les données nécessaires pour utiliser l'application sont stockées dans un fichier Google Sheets. Il est donc nécessaire d'avoir un compte Google.

Ensuite, il faut importer le fichier de données de démonstration dans son propre Google Drive, en allant sur le lien suivant : [https://docs.google.com/spreadsheets/d/1XW4zcU3maFGeOu8tznoDHiHnd0qj0Fxy_DVq2Vkrcnw/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1XW4zcU3maFGeOu8tznoDHiHnd0qj0Fxy_DVq2Vkrcnw/edit?usp=sharing)

Une fois le fichier ouvert, cliquer sur le menu **Fichier** puis **Créer une copie**.

### Créer son propre fichier de données

#### Catégories

L'onglet **Catégories** contient la liste des catégories de produits, ainsi que les taxes afférentes.

Afin d'avoir une interface épurée, il est recommandé de créer un maximum de 6 catégories.

#### Monnaies

Par défaut, la seule monnaie disponible est l'Euro. Il est possible d'ajouter d'autres monnaies, en ajoutant une ligne en dessous. Il est également possible d'ajouter la même monnaie avec une mercuriale différente (par exemple, pour afficher des prix différents pour les locaux et les touristes).

Il est également possible de modifier le nom de la devise, son symbole, la valeur maximale lors d'un achat ainsi que le nombre de décimales à afficher.

#### Produits

L'onglet **Produits** contient la liste des produits, avec la catégorie associée, le nom du produit et son prix.

Il est possible d'ajouter des prix différents pour un même produit. Pour cela, il faut avoir au préalable ajouté une autre monnaie (voir chapitre ci-dessus).

Il faut ensuite ajouter une nouvelle colonne tout à droite : clic droit dans la colonne puis **Insérer une colonne à droite**. Puis ajouter le nom de la devise en haut de la colonne en la sélectionnant.

#### Paiements

L'onglet **Paiements** contient la liste des moyens de paiements possibles.

Pour les virements ainsi que les paiements en monnaie numérique nécessitant un QR code, il est possible d'ajouter une adresse vers laquelle envoyer le paiement.

Il est enfin possible de cacher une méthode de paiement en cochant la colonne **Caché**.

#### Paramètres

L'onglet **Paramètres** contient les différents paramètres de l'application :

-   le nom du commerce
-   un message de remerciement à afficher après un paiement
-   une mercuriale quadratique à utiliser lors d'un paiement (la mercuriale quadratique est une fonction mathématique permettant de calculer le prix d'un produit en fonction de la quantité achetée)
-   la dernière date de mise à jour des données (se calcule automatiquement, à ne pas modifier)

### Partager le fichier de données

#### Donner accès au fichier de données

Une fois le fichier de données créé, il faut le partager afin que l'application puisse y accéder.

Pour cela, cliquer sur le menu **Fichier** puis **Partager** et **Partager avec d'autres**.

Dans le popup qui s'ouvre, cliquer sur **Restreint** sous **Accès général** puis **Tout le monde ayant le lien**.

#### Demander une autorisation d'accès

Afin que l'application puisse accéder au fichier de données, il est nécessaire de demander une autorisation d'accès.

Alternativement, vous pouvez déployer très facilement votre propre application. Dans ce cas-là, passez au chapitre suivant **Création de l'application**

Pour demander une autorisation d'accès, cliquer sur le bouton **Copier le lien** puis envoyer par email

-   le lien copié vers le fichier Google Sheet
-   un identifiant de votre choix

à l'adresse suivante : [flo@fims.fi](mailto:flo@fims.fi&subject=Accès%20au%20fichier%20de%20données%20FiMs%20POS).

#### Accéder à l'application

Après traitement de votre demande (environ 1 jour), vous recevrez un mail de confirmation avec l'adresse d'accès. Celle-ci sera : pos.fims.fi/Votre_Identifiant

## Déploiement de l'application

Le déploiement de l'application permet, entre autres :

-   de s'affranchir d'une demande d'autorisation d'accès
-   de choisir son propre domaine / site web
-   d'être autonome et indépendant

Il sera nécessaire de créer sa propre clé d'accès au fichier de données sur [Google console](https://console.cloud.google.com/)

### Paramètres d'accès au fichier de données

#### Récupération de l'identifiant du fichier

L'identifiant est inclus dans l'adresse web du fichier Google Sheet contenant les données.
Exemple : dans https://docs.google.com/spreadsheets/d/1XW4zcU3maFGeOu8tznoDHiHnd0qj0Fxy_DVq2Vkrcnw/edit#gid=0, l'identifiant du fichier est **1XW4zcU3maFGeOu8tznoDHiHnd0qj0Fxy_DVq2Vkrcnw** (compris entre `.../d/` et `/edit#gid=...`)

#### Récupération de la clé d'accès au fichier

Aller sur https://console.cloud.google.com/

Dans le menu en haut à gauche, sélectionner le menu **Api & Services** puis sous-menu **Credentials**.

Une fois dans la page **Credentials**, cliquer tout en haut de la page sur **+ Create Credentials** , puis **API key**.

La clé est affichée dans un popup où vous pouvez la copier.

### Déployer avec Vercel

Pour simplement créer l'application, il est préférable d'utiliser le processus automatisé de [Vercel](https://vercel.com) :

[![Créer avec Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/flodef/FiMs-POS&project-name=FiMs-POS&repository-name=FiMs-POS)

Une fois sur Vercel, créer un répertoire git en cliquant sur **Create**.

Le projet va ensuite automatiquement se déployer.

Une fois déployé, il suffit de cliquer sur la capture d'écran du projet. Cela va ouvrir une nouvelle page dans le navigateur avec l'application.

La page principale est une application de démonstration. Pour accéder à vos données, il va falloir paramétrer l'application avec vos identifiants.

### Paramétrer l'application

Afin de paramétrer l'application, il faut accéder au Dashboard en cliquant sur **Continue to Dashboard**.

Une fois dans le Dashboard, cliquer sur le projet puis aller dans les variables d'environnement : menu **Settings**, puis sous-menu **Environment Variables**.

Il y a 2 paramètres à entrer afin d'accéder aux données contenues dans le fichier Google Sheet :

-   GOOGLE_SPREADSHEET_ID : l'identifiant pointant vers le fichier
-   GOOGLE_API_KEY : la clé permettant l'accès vers le fichier

Pour ce faire :

-   entrer dans le champ **Key** : `GOOGLE_SPREADSHEET_ID` et dans le champ **Value** : _Votre_Identifiant_Fichier_
-   entrer dans le champ **Key** : `GOOGLE_API_KEY` et dans le champ **Value** : _Votre_Clé_Accès_Fichier_

### Application des paramètres

Une fois les paramètres saisis, il est nécessaire de mettre à jour l'application afin d'appliquer les paramètres.

Aller dans le menu **Deployments**. Une ligne s'affiche avec les différentes versions déployées. Il faut ouvrir le menu de la dernière version, la plus en haut, en cliquant tout à droite, sur les trois points horizontaux.

Sélectionner le menu **Redeploy**, puis dans le popup qui s'ouvre, cliquer sur le bouton **Redeploy**.

Attendre que le déploiement se fasse (environ 1 minute), puis ouvrir l'application en cliquant sur la capture d'écran ou le bouton **Visit**.

Et voilà 🥳🥳🥳

## Comment modifier le projet

### Cloner le projet

Cloner le code source du projet en ouvrant un terminal de commande puis en utilisant la commande suivante :

```bash
git clone https://github.com/flodef/FiMs-POS.git
```

Alternativement, il est possible de télécharger le code source en cliquant sur le bouton **Code** puis **Download ZIP** depuis la page du projet sur Github : https://github.com/flodef/FiMs-POS

### Installer les dépendances

Une fois le projet cloné, il faut installer les dépendances en utilisant la commande suivante :

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Lancer le projet en local

Pour lancer le projet en local, il faut utiliser la commande suivante :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Ouvrir ensuite un navigateur web à l'adresse http://localhost:3000

### Modifier le code

Le code source est dans le répertoire `app`.

Le fichier `app/page.tsx` contient le code de la page principale.

Le fichier `app/components/` contient les composants utilisés par la page principale.

Vous pouvez modifier le code source et voir les modifications en temps réel dans le navigateur.

### Déployer le projet

Une fois les modifications effectuées, il faut les déployer.

Pour ce faire, il faut utiliser la commande suivante :

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Une fois le projet construit, il faut le déployer en utilisant la commande suivante :

```bash
npm run start
# or
yarn start
# or
pnpm start
```

Ouvrir ensuite un navigateur web à l'adresse http://localhost:3000

### Publier les modifications

Une fois le projet déployé, il faut publier les modifications sur Github.

Pour ce faire, il faut utiliser la commande suivante :

```bash
git add .
git commit -m "message de commit"
git push
```

Alternativement, vous pouvez utiliser l'interface graphique de Github Desktop ou celle de votre environnement de développement.

### Déployer sur Vercel

Une fois les modifications publiées sur Github, il faut déployer le projet sur Vercel.

Pour ce faire, il faut utiliser la commande suivante :

```bash
vercel
```

Une fois la commande lancée, il faut suivre les instructions.

Alternativement, vous pouvez utiliser l'interface graphique de Vercel afin de lier votre compte Github et déployer le projet automatiquement à chaque commit.

## En savoir plus sur Next.js

Pour en savoir plus sur Next.js, vous pouvez consulter les ressources suivantes :

-   [Next.js Documentation](https://nextjs.org/docs) - apprenez les fonctionnalités et l'API de Next.js.
-   [Learn Next.js](https://nextjs.org/learn) - un tutoriel intéractif Next.js.

# Contribuer au projet

Toutes contributions, retours ou idées sont les bienvenus. 🙏🏻🙏🏻🙏🏻
