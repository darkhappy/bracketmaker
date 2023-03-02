# Journal de bord

## 1. Semaine du 22 au 28 janvier (Semaine 1)

### Mercredi le 25 janvier

La première semaine a consisté à l’invention du projet. Le projet a été décidé mercredi le 25 janvier et cela consistait à un énorme gestionnaire de tournoi pouvant accueillir n’importe quel type de sport et n’importe quel type de tournoi. L’application allait aussi pouvoir permettre à ses utilisateurs de s’abonner à des tournois en particulier ainsi qu’à des organisateurs pour être à la une des tournois qu’ils allaient créer. Cinq personnes ont décidé de se joindre au projet: Louis-Félix Veillette, Gabriel Dufresne, Jean-Philippe Miguel-Gagnon et Jérémie Perreault.

### Vendredi le 27 janvier

Lors de cette journée, un stagiaire s’est joint à nous pour donner un coup de main. Il s’agissait de Raphaël Rail. Cette journée a beaucoup servi du côté de la conception et de la visualisation de notre application dans les moindres détails. En effet, nous pensions être déjà prêts à débuter la documentation du projet et des interfaces, mais le professeur nous a fait réaliser qui nous manquait beaucoup de choses et qu' il y avait plusieurs questions que l’on ne s’était toujours pas posées.

Quelles seront les parties de notre application que l’on mettra de côté pour les mettre dans une version 2.0 par manque de temps? Quels sont les différents rôles de notre application? Jusqu' où s'arrêteront nos limites afin d’aider l’utilisateur à créer ses tournois par rapport à ses besoins? Est-ce qu’on pourra tous les combler? Sera-t’il possible de s’abonner à des équipes ou à des joueurs? Que se passe t’il pour les abonnées d’un tournoi que celui-ci ait changé de restriction? Toutes étaient des questions très importantes. Évidemment, plusieurs autres questions ont été abordées, notamment si l’on gérait l’horaire du tournoi ainsi que les arénas et les locaux.

La rencontre à cette date a donc finalement consisté à faire une très grande réunion pour parler de notre application de A-Z. Voici les décisions qui ont été prise:

- Il y aura une page de profil pour un organisateur, un utilisateur et un tournoi.
- La gestion des horaires, des locaux/arénas, des commentaires des abonnées et des associations d’organisateurs allaient être dans une version Premium (pas implémenter)
- L’organisateur devra modifier lui-même la progression de son tournoi avec ses interfaces. Nous offrons aucune aide de gestion d'horaires et d'emplacements et sommes limités quant aux changements de dernières minutes d'un organisateur.
- L’application se fera avec la MEAN stack (MongoDB, Express, Angular, Node.js)
- L’application offrira une gestion pour différents types de tournois. Les éliminatoires impairs, pairs et les tournois à la ronde.
- Nous permettrons l’authentification par Google et Discord.
- Un organisateur pourra créer un groupe de tournoi. Ce sera appelé un événement.
- Un utilisateur pourra s’abonner à un tournoi ou à un organisateur. La réception d’une notification sera toutefois dans une version future.

- Les équipes ou les joueurs seront créés par l'organisateur lors de la création du tournoi.

Après la réunion, le premier sprint pouvait enfin commencer.

# Sprint 1

### Louis-Félix Veillette:
- La documentation des normes et des rôles
- Les cas d’utilisations
- Le diagramme entité-relations de la base de données

### Jérémie Perreault:
- La documentation des normes et des rôles
- Les prototypes d’interfaces.

### Gabriel Dufresne:
- La documentation des normes et des rôles
- Les prototypes d’interfaces

### Jean-Philippe et Raphael:
- Les prototypes d’interfaces

## Semaine du 29 janvier au 4 février (Semaine 2)

### Mardi le 31 janvier

Les normes, le diagramme d’entité-relation et, la documentation et les cas d’utilisation était pratiquement fini. Nous nous sommes rendu compte qu'il y aurait seulement deux rôles maintenant, soit des utilisateurs et des visiteurs, car on s’est rendu compte que tous les utilisateurs peuvent créer des tournois. 

### Mercredi le 1 février

Comme l’équipe avait fini les tâches du côté de la documentation, diagrammes et que nous avions appris les matières à propos des serveurs API, certains membres de l’équipe ont décidé de commencer à coder l’environnement de travail du projet et créer les objets utilisés dans la base de données. Pendant ce temps, Raphael et Jean-Philippe finissaient les prototypes d’interfaces, car la tâche était très grande.

# Première rencontre officiel avec le client

### Vendredi le 3 Février 2023

Lors de notre première rencontre avec le client,  nous avons pu lui montrer nos prototypes d’interface et notre diagramme de cas d’utilisation et d’entité. Il a mentionné plusieurs points importants, notamment sur la clarté de notre application sur différents points, ainsi que certains trucs à ajouter. Voici les points que nous devons ajoutés dans notre application:

- Ajouter une interface à l’utilisateur pour lui permettre de voir sa liste d'abonnées pour un tournoi X afin de lui permettre d’en enlever ou d’en bannir.

- Ajouter plus de contenu dans l’accueil de l’application pour permettre au visiteur de bien comprendre les limites de l’application avec une meilleure image ou simplement une meilleure description sans trop en mettre.

- Permettre d’afficher la localisation du tournoi pour les abonnées ainsi qu’une intervalle de dates pour l’utilisateur.
dans la liste

- Ajouter une option à l’utilisateur pour fermer un tournoi.

- Offrir une interface pour voir son historique de tournois.

- Ajouter (si possible) une vidéo démonstrative de notre site web pour les visiteurs.

- Ajouter (si possible) une double authentification par téléphone par exemple.

- Permettre la modification de l’état du tournoi (public, non-répertorié et privé) en changeant aussi en fonction de l’état certaines choses concernant les liens, les partages et les abonnées.

Voici les points à éclaircir dans notre application:

- Remplacer «Mes abonnements et Mes tournois» dans le menu par «Mes tournois et Tournois suivis»

- Trouver un autre nom que «événement», car un événement peut autant être un seul match que plusieurs tournois, selon les visiteurs, alors que pour nous un événement est un regroupement de tournois.

- Changer le vocabulaire «Parcourir» dans l’accueil qui est trop répétitif

### Conclusion: 

Le client s’est montré plutôt satisfait de notre travail globalement. Notre prochaine étape sera de mettre à jour notre documentation si nécessaire et de commencer à implémenter les interfaces. La prochaine étape sera plus précisément l’authentification de l’utilisateur. Il fallait aussi intégrer ce qu’il voulait que l’on change dans le prototype d’interface

Nous avons toutefois décidé de commencer officiellement le prochain sprint mardi prochain pour nous permettre de créer notre journal de bord, établir les normes de routes URL et API de notre serveur et de notre client et créer la base de nos services qui parleront à nos API. Nous voulions aussi créer certains composants de base qui allaient servir à nos interfaces graphiques. Cette étape était importante avant toute chose, car elle établissait la base officielle du développement du projet. C’était comme un GO.

## Semaine du 5 au 11 février (Semaine 3)

### Mardi le 7 février 2023

Pour commencer, il faut savoir que l’on a beaucoup discuté sur la rencontre avec le client. Voici les points que l’on a réglé et modifié:

- Ajouter une interface à l’utilisateur pour lui permettre de voir sa liste d'abonnées pour un tournoi X afin de lui permettre d’en enlever ou d’en bannir.

- Ajouter plus de contenu dans l’accueil de l’application pour permettre au visiteur de bien comprendre les limites de l’application avec une meilleure image ou simplement une meilleure description sans trop en mettre.

- Permettre d’afficher la localisation du tournoi pour les abonnées ainsi qu’une intervalle de dates pour l’utilisateur.

- Ajouter une option à l’utilisateur pour fermer un tournoi.

- Permettre la modification de l’état du tournoi (public, non-répertorié et privé) en changeant aussi en fonction de l’état certaines choses concernant les liens, les partages et les abonnées.

- Remplacer «Mes abonnements et Mes tournois» dans le menu par «Mes tournois et Tournois suivis»

- Trouver un autre nom que «événement», car un événement peut autant être un seul match que plusieurs tournois, selon les visiteurs, alors que pour nous un événement est un regroupement de tournois.

- Changer le vocabulaire «Parcourir» dans l’accueil qui est trop répétitif

Nous n’avons pas touché aux autres, car nous avons jugé que ce n’était pas une priorité pour l’instant. Il est plus important de finir tout ce qui est le noyau de notre application, c’est-à-dire de créer des comptes et des tournois.

Nous pouvions maintenant débuter le prochain sprint. Avant de commencer, nous nous sommes rencontrés pour discuter du dernier sprint pour savoir si tout avait été fait. Effectivement, tout était complet. Le prochain sprint allait consister à la création de la page d’accueil, l'authentification de l’utilisateur, la création du menu, le choix des couleurs et afficher le profil de l’utilisateur en lui permettant d’accéder à ses paramètres. L’équipe a décidé aussi de fonctionner sur Github pour le partage du projet. Chacun devait travailler sur sa branche et faire vérifier son code avant de la mettre sur la branche principale, soit celle que l’on devait montrer au client.

# Sprint 2

### Louis-Félix Veillette:

- L’oubli de mot de passe lors de l’authentification
- La création des paramètres de personnalisation du profil (afficher le courriel, changer le pseudonyme et ajouter une description du profil) 
- Paramètres de changement de mot de passe 

### Jérémie Perreault:

- La connexion au compte d’un utilisateur.

- L’authentification par Google

### Gabriel Dufresne:

- La création/inscription d’un compte utilisateur.

- L’authentification avec Google

### Raphaël Rail:

- Création de la page d’accueil

- Création de la page du profil utilisateur

### Jean-Philippe Miguel-Gagnon:
- Création de la page du profil utilisateur

- Création du frontend pour l’affichage des tournois

- Les paramètres de l’utilisateur (changer son email et son nom d’utilisateur)

Fin du sprint: Mardi 14 février.

### Mercredi le 8 février et vendredi le 10 février

Rien de spécial sauf l’avancement du sprint.

## Semaine du 12 au 18 février (Semaine 4)

### Mardi le 14 février 2023

En cette date de Saint-Valentin, nous étions supposé montré les résultats de notre sprint et notre version avancé de notre application montrant la page d’accueil, l’authentification et les paramètres. Malheureusement, nous avions pris du retard sur la vérification du code des autres. Plusieurs membres de l’équipe devaient améliorer beaucoup de choses et certains trucs avaient un bug. Certaines routes vers l’API étaient invalides et la connexion de l’utilisateur ne fonctionnait pas à 100%. Le cookie de session était inaccessible. Nous avons donc repoussé la fin du sprint au lendemain. Nous avons donc eu le temps de régler les soucis et de fusionner nos changements sur la branche principale.

De plus, une réunion a eu lieu pour évaluer le temps de préparation de l’application. Nous ne savions plus si nous avions encore du temps pour la création du regroupement de tournoi (événements), à cause du design des tournois et du temps que cela prendra pour implémenter la création des tournois, des abonnements et des profils de tournois. Nous avons donc décidé de mettre les groupes de tournois (événements) de côté pour la mettre peut-être plus tard ou dans une version future ou payante. Nous avons aussi décidé que l’authentification par Discord et par téléphone devrait aussi être dans une autre version.

# Sprint 3

### Mercredi le 15 février 2023

Comme un membre de notre équipe ne pouvait pas être présent, nous avons repoussé la rencontre avec le client. Cela dit, nous étions prêts à commencer le nouveau sprint. Le prochain sprint allait consisté à la déconnexion de l’utilisateur, le changement de design du site, voir la liste des utilisateurs, voir le profil des autres utilisateurs, créer un tournoi, modifier un tournoi, supprimer un tournoi, voir la liste des tournois créés et l’authentification par Google, car malheureusement, ces deux dernières n’avaient toujours pas été faites même si elles étaient dans le dernier sprint.

Assignation des tâches:

### Louis-Félix Veillette:

- Créer la page pour afficher tous les utilisateurs.
- Offrir une interface conviviale pour les visiteurs en offrant un tri alphabétique et par abonnées, ainsi qu’une barre de recherche.
- Permettre de voir le profil de l’utilisateur après avoir cliqué sur l’un d’eux dans la liste.
- Faire le backend pour la déconnexion de l’utilisateur.

### Jérémie Perreault:

- Authentification avec Google

- Modifier un tournoi

- Améliorer les problèmes d’interfaces pour 
l’inscription

- Créer le profil des tournois.

### Gabriel Dufresne:

- Création d’un tournoi

- Se faire assigner à une autre tâche après cela.

### Raphaël Rail:
- Modifier le design du site.

- Modifier le menu lorsque l’utilisateur est connecté

- La déconnexion de l’utilisateur

### Jean-Philippe Miguel-Gagnon:

- Créer l’affichage des abonnées d’un tournoi ainsi que la liste des tournois d’un organisateur et la liste de tous les tournois.

Fin du sprint: Mardi 21 février

### Jeudi le 16 février 2023

Jérémie a réussi à faire l’authentification par Google et a confirmé que l’authentification par Discord n’est vraiment pas nécessaire. En fusionnant ses changements sur la branche principale, un problème est arrivé du côté de l’API ce qui a empêché d’accéder à l’utilisateur quand il est connecté. De plus, plusieurs appels étaient introuvables. Il a donc fallu mettre du temps pour trouver la source du problème jusqu’au lendemain. Cela empêchait notamment la déconnexion et l’authentification.

# Deuxième rencontre officiel:

### Vendredi le 17 février 2023

Lors de la deuxième rencontre officiel avec le client, nous avons pu lui montrer ce que nous avons fait lors de notre deuxième sprint, c’est-à-dire la création d’un compte utilisateur, la connexion, la création de la page d’accueil, la création du menu, les paramètres de l’utilisateur, ainsi que le mot de passe oublié. Évidemment, certaines fonctionnalités manquaient à l’appel comme certains problèmes à propos de l’inscription et de la déconnexion à cause du problème énoncé plus haut.  

Aussi, les paramètres ne fonctionnaient plus de même que la page du profil de l’utilisateur à cause d’un autre problème de cookie. En bref, pratiquement rien était fonctionnel sur la version principale, ce qui ne rassurait pas du tout certains membres de l’équipe.

Heureusement, le client s’est montré très compréhensif. Pour compenser, Louis-Félix lui a montré les choses qui auraient dû être là ainsi que la progression de la liste des organisateurs. Voici les correctifs qu’il a demandés.

- Dire un message dans le menu, comme le nom de l’utilisateur pour confirmer qu’il est connecté.

- Changer le message d’erreur lorsqu’un visiteur utilise un identifiant quand il est déjà inscrit.

- Faire une démo vidéo pour éviter ces futurs incidents.

- Remettre un journal de bord complet dans 7 jours.

## Semaine du 19 au 25 février (Semaine 5)

### Mardi le 21 février 2023

Cette journée a été l’objet de la grande réunion entre l’équipe qu’il y ait eu jusqu’à ce jour. Cette réunion a consisté à faire un nouveau départ et à alerter les troupes que le rythme était loin d’être suffisant. Le sprint devait se finir à cette journée, mais pratiquement rien n’avait été fait, sauf la liste des utilisateurs, l’authentification par Google, la page de profil des utilisateurs, la création de tournois et la déconnexion. La liste des utilisateurs restait à vérifier de même que la création de tournois. Sachant qu'il ne restait que deux sprints après celui-là, ce fut une réunion d’évaluation du temps et des tâches qui restent. Plusieurs membres de l’équipe n’avaient pratiquement pas travaillé sur le projet, ce qui a causé un retard. Au moins, Raphael a travaillé sur l'affichage du nom dans le menu pour satisfaire le client et Louis-Félix a mis à jour les deux premières semaines de projets dans le journal de bord.

De plus, le site était bourré de problèmes et de trucs à corriger. Il fallait donc faire un cri d'alerte, réorganiser les choses et créer de nouvelles tâches. Nous avons dû aussi identifier notre problème de rythme lent et nous en sommes venus en conclusion qu’il ne faut pas refaire la même chose sous peine de ne pas finir à temps. Nous sommes plus nombreux donc il n’y a pas de place pour les retards.

Nous avons donc tout effacer et recommencer notre progression dans le projet. Nous avons convenu de faire 2 sprints en une semaine. Du 21 au 24 février, il fallait avoir fini tout ce qui a un lien avec les tournois, donc la création, la suppression, la modification, les abonnements, la redirection des pages ainsi qu’à l’enlèvement des problèmes sur notre site et des imperfections. 

Le deuxième sprint allait être du 24 au 3 mars. Cela allait consister à créer un belle affiche de tournoi en cours avec la progression, la préparation d’une démo vidéo, rendre le site accessible le plus possible pour mobile et la gestion du changement du type de tournoi par rapport aux abonnées.

# Sprint final partie 1

### Louis-Félix Veillette:
- Mise à jour du journal de bord

- Ajouter des liens des diagrammes pour la remise du vendredi

- Gérer la redirection des visiteurs vers la page d’authentification lorsqu’une action doit être faite en étant connecté.

- Créer la page de gestion des abonnées d’un organisateur et d’un tournoi et faire toutes ses fonctionnalités.

### Raphaël Rail:

- Permettre la personnalisation de l’image de profil par l’utilisateur

- Établir une meilleure sécurité pour notre site web

### Jérémie Perreault:

- Terminer la page du profil du tournoi

- Aider Gabriel avec le CRUD de tournois

### Jean-Philippe Miguel-Gagnon:

- Faire une système d’alerte d’erreur efficace
Terminer la liste de tournois

- Gabriel Dufresne:
Finir le CRUD (créer, modifier, supprimer) le tournoi.

Déroulement à suivre...












