# Manuel du développeur pour l'application web Bracket Blitz

## Table des matières
[Introduction](#introduction)
1. Client
   1. [Composants](#composants)
   2. [Routes](#routes)
   3. [Services](#services)
   4. [Guard](#guard)
   5. [Modeles de donnees](#modeles-de-donnees)
2. Serveur
   1. [Controleurs](#controleurs)
   2. [Routes serveurs](#routes-serveurs)
   3. [Modeles de donnees serveur](#modeles-de-donnees-serveur)
   4. [Middlewares](#middlewares)
   5. [Configuration](#configuration)

## Introduction
Cette documentation est destinée aux développeurs qui souhaitent comprendre et travailler sur cette application web basée sur la MEAN stack. La MEAN stack est un ensemble de technologies qui sont de code libre, incluant MongoDB, Express.js, Angular et Node.js, qui permettent de construire des applications web modernes et performantes. Nous avons choisi entre autres ces technologies pour la simplicité du code en arrière plan, notamment MongoDB qui permet d'éviter de faire de vraies requêtes SQL. Toutefois, il est possible de changer pour PostgreSQL au besoin.

Cette documentation couvre l'ensemble des fonctionnalités de l'application, y compris les composants, les routes, les modèles de données, ainsi que les procédures d'installation et de déploiement.

## Installation

### Prérequis
- Node.js https://nodejs.org/en/download/
- MongoDB https://www.mongodb.com/try/download/community
- Angular CLI https://angular.io/cli
- IDE (Visual Studio Code, WebStorm, etc.)
- Git
- Un navigateur web (Chrome, Firefox, etc.)
- Un terminal (Windows PowerShell, Git Bash, etc.)
- Un compte GitHub

### Installation du projet
1. Clonez le dépôt git de l'application : `git clone https://github.com/darkhappy/bracketmaker.git`
2. Ouvrez un terminal sur votre IDE ou dans le dossier de votre projet.
3. Allez dans le répertoire client de l'application : `cd client`
4. Installez les dépendances de l'application : `npm install`
5. Allez dans le répertoire server de l'application : `cd ../server`
6. Installez les dépendances de l'application : `npm install`
7. Faites maintenant `npm start` dans le répertoire server pour démarrer le serveur.
8. Même chose dans le répertoire client pour démarrer l'application.
9. L'application est maintenant disponible à l'adresse `http://localhost:4200/`

# Client
## Composants
Une application basée sur Angular est composée de composants. Un composant est une classe qui contient des données et des méthodes. Les données sont des propriétés du composant, et les méthodes sont des fonctions qui peuvent être appelées par le composant. Les composants sont liés à des gabarits, qui sont des fichiers HTML qui contiennent des directives Angular. Les directives Angular sont des balises spécifiques qui permettent d'interagir avec les composants. Les composants sont liés à des fichiers CSS qui contiennent des styles CSS qui sont appliqués au gabarit du composant. Chaque composant contient donc trois fichiers : un fichier TypeScript, un fichier HTML et un fichier CSS.

Pour créer un nouveau composant, vous pouvez utiliser la commande `ng generate component <nom-du-composant>`.

```
client
|_ src
    |_ app
        |_ <nom-du-composant>
            |_ <nom-du-composant>.component.ts
            |_ <nom-du-composant>.component.html
            |_ <nom-du-composant>.component.css
```

Si vous voulez plus d'informations sur les composants Angular, vous pouvez consulter la documentation officielle : https://angular.io/guide/architecture-components

Nous avons fait le chois de diviser tous les composants en trois catégories : les composants de l'affichage de base, les composants par module et les composants partagés:

```
client
|_ src
    |_ app
        |_ layout
        |_ modules
        |_ shared
```

Ces trois dossiers sont sous le dossier `src/app`.
### Composants de l'affichage de base (layout)
Le dossier « layout » contient les composants de l'affichage de base, qui sont les composants qui sont affichés sur toutes les pages de l'application. Ces composants sont l'en-tête, le pied de page et le menu de navigation. Le dossier « modules » contient les composants par module, qui sont les composants qui sont affichés sur certaines pages de l'application.

### Composants par module
Le dossier « modules » contient les composants par module, qui sont les composants qui sont affichés sur certaines pages de l'application. Ces composants sont les composants de chaque module de l'application. Chaque module est une fonctionnalité de l'application. Par exemple, le module d'authentification (auth) contient les composants d'authentification, d'inscription, de modification de profil, etc. Le module de gestion des tournois « tournaments » contient les composants de création de tournois, de modification de tournois, de gestion des participants, etc.

### Composants partagés
Le dossier « shared » contient les composants partagés, qui sont les composants qui sont utilisés par plusieurs modules de l'application. Par exemple, le composant de formulaire de connexion est utilisé par le module d'authentification et le module de gestion des tournois. Le composant de formulaire de création de tournois est utilisé par le module de gestion des tournois et le module de gestion des matchs.

## Routes
Les routes de bases sont définies dans le fichier `src/app/app-routing.module.ts`. Chaque route est liée à un composant. Par exemple, la route `/login` est liée au composant `LoginComponent`. Si vous voulez plus d'informations sur les routes, vous pouvez consulter la documentation officielle : https://angular.io/guide/router.
Chaque composant peut avoir plusieurs routes. Par exemple, le composant `TournamentComponent` a les routes `/tournaments`, `/tournaments/:id` et `/tournaments/:id/:tab`. La route `/tournaments` est liée à la page d'accueil de l'application, qui affiche tous les tournois. La route `/tournaments/:id` est liée à la page de gestion d'un tournoi, qui affiche les informations du tournoi et permet de gérer les participants. La route `/tournaments/:id/:tab` est liée à la page de gestion d'un tournoi, qui affiche les informations du tournoi et permet de gérer les matchs.

## Services
Les services sont des classes qui contiennent des données et des méthodes. Les données sont des propriétés du service, et les méthodes sont des fonctions qui peuvent être appelées par les composants. Les services sont liés à des fichiers TypeScript qui contiennent des fonctions qui peuvent être appelées par les composants.
Pour chaque type de données, nous avons un service. Par exemple, nous avons un service pour les utilisateurs, un service pour les tournois, etc. Ces services sont définis dans le dossier `src/app/data/services`. Si vous voulez plus d'informations sur les services, vous pouvez consulter la documentation officielle : https://angular.io/guide/architecture-services

Pour appeler un service, vous devez d'abord l'importer dans le composant :
```ts
import { UserService } from 'src/app/data/services/user.service';
class MyComponent {
   constructor(private userService: UserService) { }
}
```

Puis vous pouvez appeler une fonction du service :
```ts
this.userService.getUsers().subscribe((users: User[]) => {
   this.users = users;
});
```

Pour créer un nouveau service, vous pouvez utiliser la commande `ng generate service <nom-du-service>`.

## Guard
Les « guards » sont des classes qui contiennent des fonctions qui peuvent être appelées par les routes. Ces fonctions sont appelées avant que la route ne soit chargée. Si la fonction retourne `true`, la route est chargée. Si la fonction retourne `false`, la route n'est pas chargée. Les « guards » sont définis dans le dossier `src/app/core/guards`. Si vous voulez plus d'informations sur les « guards », vous pouvez consulter la documentation officielle : https://angular.io/guide/router#milestone-5-route-guards

Pour appeler un guard, vous devez d'abord l'importer dans le fichier de route :
```ts
import { AuthGuard } from 'src/app/core/guards/auth.guard';
const routes: Routes = [
   {
      path: 'tournaments',
      component: TournamentsComponent,
      canActivate: [AuthGuard]
   },
   {
      path: 'tournaments/:id',
      component: TournamentComponent,
      canActivate: [AuthGuard]
   },
   {
      path: 'tournaments/:id/:tab',
      component: TournamentComponent,
      canActivate: [AuthGuard]
   }
];
```

Pour créer un nouveau guard, vous pouvez utiliser la commande `ng generate guard <nom-du-guard>`.

## Modeles de donnees
Les modèles de données sont des interfaces qui définissent les propriétés d'un objet. Par exemple, l'interface `User` définit les propriétés d'un utilisateur. Les modèles de données sont définis dans le dossier `src/app/data/schemas`. Si vous voulez plus d'informations sur les modèles de données, vous pouvez consulter la documentation officielle : https://angular.io/guide/architecture-components#data-modeling--classes

Exemple de modèle de données :
```typescript
export interface User {
   _id: string;
   username: string;
   email: string;
   password: string;
   role: string;
   tournaments: string[];
}
```
Après cela,  vous pourrez utiliser ces objets dans les fichiers .ts pour recevoir les données de l'API et les mettre dans cette objet pour ensuite pouvoir l'utiliser.
#  Serveur

## Controleurs
Les contrôleurs sont des classes qui contiennent des fonctions qui peuvent être appelées par les services. Ces fonctions sont appelées pour effectuer des opérations sur les données. Par exemple, la fonction `createTournament` du contrôleur `TournamentController` est appelé pour créer un tournoi. Les contrôleurs sont définis dans le dossier `/controllers`. Si vous voulez plus d'informations sur les contrôleurs, vous pouvez consulter la documentation officielle : https://angular.io/guide/architecture-services#controllers
Un service envoie une requête HTTP à un contrôleur. Le contrôleur effectue une opération sur les données, et renvoie une réponse HTTP au service. Le service traite la réponse HTTP et renvoie une réponse HTTP au client.

Exemple de contrôleur :
```ts
export class TournamentController {
   public static async createTournament(req: Request, res: Response) {
      const tournament = new Tournament(req.body);
      await tournament.save();
      res.status(200).json(tournament);
   }
}
```

## Routes serveurs
Les routes sont définies dans le fichier `routes.js`. Chaque route est liée à un contrôleur. Par exemple, la route `/api/tournaments` est liée au contrôleur `TournamentController`.

Exemple de route :
```ts
router.post('/api/tournaments/:d', TournamentController.getTournament);
```
## Modèles de données serveur
Tout comme pour le client, les modèles de données sont des interfaces qui définissent les propriétés d'un objet. Par exemple, l'interface `Tournament` définit les propriétés d'un tournoi. Les modèles de données sont définis dans le dossier `models`. Si vous voulez plus d'informations sur les modèles de données, vous pouvez consulter la documentation officielle : https://angular.io/guide/architecture-components#data-modeling--classes
Nous en avons besoin aussi du côté serveur, car nous utilisons les modèles de données pour définir les propriétés des objets que nous renvoyons au client.

Dans l'exemple suivant, nous créons le schéma tournament:
```js
const mongoose = require('mongoose');
const tournamentSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
   name: String,
   description: String,
   startDate: Date,
   endDate: Date,
   teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
   matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   createdAt: Date,
   updatedAt: Date
});

tournamentSchema.method('toJSON', function() {
   const { __v, id, ...object } = this.toObject();
   object.id = id;
   return object;
});

const Tournament = mongoose.model('Tournament', tournamentSchema);
module.exports = Tournament;
```
Ce schéma sera non seulement un objet que l'on pourra créer en faisant:

```js
Tournament tournament = new Tournament({
   name: 'Tournoi 1',
   description: 'Je suis un tournoi',
   /* Le reste de l'objet */
})
```

Le schéma est aussi statique pour avoir accès aux méthodes de MongoDB:

```js
Tournament.findOne({name: 'Tournoi 1'}).exec((err, tournoi) => {
   console.log(tournoi);
});
```

Dans cet exemple, les modèles utilisent les schémas de mongo. Pour plus d'informations sur les schémas de mongo, vous pouvez consulter la documentation officielle : https://mongoosejs.com/docs/guide.html.

## Middlewares
Les logiciels médiateurs, autrement appelés intergiciels ou « middlewares » sont des fonctions qui sont appelées avant que la route ne soit chargée. Si la fonction retourne `next()`, la route est chargée. Si la fonction retourne `res.status(401).json({ message: 'Unauthorized' })`, la route n'est pas chargée. Les intergiciels sont définis dans le dossier `intergiciels`. Si vous voulez plus d'informations sur les intergiciels, vous pouvez consulter la documentation officielle : https://angular.io/guide/router#milestone-5-route-guards
Il y a un intergiciel pour chaque type de données. Par exemple, il y a un intergiciel pour les utilisateurs, un intergiciel pour les tournois, etc. Ces intergiciels sont utilisés pour vérifier que l'utilisateur est connecté, et qu'il a les droits d'accès à la ressource.

Exemple de code:
```ts
const isAuth = (req, res, next) => {
   let token = req.cookies['SESSIONID'] ?? null;
   if(!token){
      return res.status(401).json({message: "Unauthorized u dumbass"})
   }
   jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if(err){
         console.error(err);
         return res.status(401).json({message: "Unauthorized u they/them"})
      }
      console.log(req.payload)
      req.payload = payload;

      return next();
   });
}
```

## Configuration
Pour configurer votre serveur de façon à ce qu'il puisse communiquer avec la base de données, créez-vous un fichier .env à la racine du dossier serveur et inscrivez vos informations comme suit:
```
SECRET_KEY="votre_clef_secrete"
CONNECTION_STRING="mongodb://127.0.0.1:27017/test" //cela doit etre VOTRE url pour la bd mongo
```