const Tournament = require("../models/tournament");
const User = require("../models/User");
const moment = require("moment");
const middleware = require("../middlewares/UserMiddleware");
const bcrypt = require("bcrypt");
const Match = require("../models/match");

/**
 * @params req : requête http
 * @params res : réponse http
 * @description : récupère un tournoi précis par l'id
 * @return : le tournoi en json
 */
function getTournament(req, res) {
    const _id = req.query._id;
    console.log(_id);
    Tournament.findOne({ _id }).exec((err, tournament) => {
        if (err || !tournament) {
            return res.status(401).json({ error: "Tournament not found" });
        }
        return res.status(201).json({ tournament });
    });
}

/**
 * @params req : requête http
 * @params res : réponse http
 * @description : Récupère tous les tournois d'un organisateur
 * @return : le tournois en json
 */
async function getTournamentsByOrganizerId(req, res) {
    const tournaments = await Tournament.find({
        organizer_id: req.params.id,
    }).exec();
    return res.json(tournaments);
}

/**
 * @params req : requête http
 * @params res : réponse http
 * @description : Créer un tournoi
 * @return : La réponse si la requête a réussi ou non
 */
async function createTournament(req, res) {
    const user = await User.findById(req.payload.id).exec();
    if (!user)
        return res.status(401).json({ message: "id organisateur non valide" });
    if (moment(req.body.date, "MM/DD/YYYY", false).isValid())
        return res.sendStatus(401).json({ message: "date non valide" });
    if (
        req.body.visibility !== "public" &&
        req.body.visibility !== "private" &&
        req.body.visibility !== "unlisted"
    )
        return res.sendStatus(401).json({ message: "visibilité non valide" });
    if (
        req.body.bracket_type !== "Simple" &&
        req.body.bracket_type !== "Double" &&
        req.body.bracket_type !== "Round Robin"
    )
        return res.sendStatus(401).json({ message: "type de tournoi non valide" });

    const tournament = new Tournament({
        name: req.body.name,
        description: req.body.description,
        bracket_type: req.body.bracket_type,
        category: req.body.category,
        date: req.body.date,
        visibility: req.body.visibility,
        location: req.body.location,
        game: req.body.game,
        players: req.body.players,
        followers: [],
        organizer_id: req.payload.id,
    });

    tournament
        .save()
        .then(() => {
            return res.sendStatus(204);
        })
        .catch(() => {
            return res.sendStatus(401);
        });
}

function updateTournament(req, res) {
    // todo : a faire
}

function deleteTournament(req, res) {
    // todo : a faire
}

/**
 * 
 * @param {} req : requête http
 * @param {} res : réponse http
 * @description : Abonne l'utilisateur à un tournoi
 * @return : La réponse si la requête a réussi (200 ou 204) ou non (400 ou 401)
 */
function followTournament(req, res) {
    Tournament.findById(req.params.id).exec((err, tournament) => {
        User.findById(req.payload.id).exec((err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: "User not found" });
            }
            if (err || !tournament) {
                return res.status(401).json({ error: "Tournament not found" });
            }

            tournament.followers.push(req.payload.id);
            tournament
                .save()
                .then(() => {
                    user.subscriptions.push(tournament._id);
                    user
                        .save()
                        .then(() => {
                            return res.sendStatus(204);
                        })
                        .catch(() => {
                            return res.sendStatus(401);
                        });
                })
                .catch(() => {
                    return res.sendStatus(401);
                });
        });
    });
}

/**
 * 
 * @param {} req : requête http
 * @param {} res : réponse http
 * @description : Désabonne l'utilisateur à un tournoi
 * @return : La réponse si la requête a réussi (200 ou 204) ou non (400 ou 401)
*/

function unfollowTournament(req, res) {
    Tournament.findById(req.params.id).exec((err, tournament) => {
        User.findById(req.payload.id).exec((err, user) => {
            if (err || !user) {
                return res.status(401).json({ error: "User not found" });
            }
            if (err || !tournament) {
                return res.status(401).json({ error: "Tournament not found" });
            }
            const index = tournament.followers.indexOf(user._id);
            if (index > -1) {
                tournament.followers.splice(index, 1);
            }
            tournament
                .save()
                .then(() => {
                    const index = user.subscriptions.indexOf(tournament._id);
                    if (index > -1) {
                        user.subscriptions.splice(index, 1);
                    }
                    user
                        .save()
                        .then(() => {
                            return res.sendStatus(204);
                        })
                        .catch(() => {
                            return res.sendStatus(401);
                        });
                })
                .catch(() => {
                    return res.sendStatus(401);
                });
        });
    });
}

/**
 * 
 * @param req : requête http
 * @param res : réponse http
 * @description : Vérifie si le tournoi est suivi par l'utilisateur
 * @return : La réponse si la requête a réussi (200 ou 201) ou non (400 ou 401)
 */
function isFollowed(req, res) {
    User.findById(req.payload.id).exec((err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: "User not found" });
        }
        if (user.subscriptions.includes(req.params.id)) {
            return res.status(201).json(true);
        } else {
            return res.status(201).json(false);
        }
    });
}

/**
 * 
 * @param req : requête http
 * @param res : réponse http
 * @description : Récupère les tournois suivis par l'utilisateur
 * @return : Les tournois suivis par l'utilisateur
 */
function getFollowedTournaments(req, res) {
    User.findById(req.payload.id).exec((err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: "User not found" });
        }
        Tournament.find({ _id: { $in: user.subscriptions } }).exec(
            (err, tournaments) => {
                if (err || !tournaments) {
                    return res.status(401).json({ error: "Tournaments not found" });
                }
                return res.status(201).json(tournaments);
            }
        );
    });
}

/**
 * 
 * @param req : requête http
 * @param res : réponse http
 * @description : Cherche un tournoi en particulier par son nom
 * @return : Le ou les tournois trouvés après la recherche
 */
function searchFollowedTournaments(req, res) {
    let search = new RegExp(".*" + req.params.search + ".*", "i");
    User.findById(req.payload.id).exec((err, user) => {
        if (err || !user) {
            return res.status(401).json({ error: "User not found" });
        }
        Tournament.find({
            _id: { $in: user.subscriptions },
            name: { $regex: search },
        }).exec((err, tournaments) => {
            if (err || !tournaments) {
                return res.status(401).json({ error: "Tournaments not found" });
            }
            return res.status(201).json(tournaments);
        });
    });
}
module.exports = {
    getTournament,
    getTournamentsByOrganizerId,
    createTournament,
    deleteTournament,
    updateTournament,
    followTournament,
    unfollowTournament,
    isFollowed,
    getFollowedTournaments,
    searchFollowedTournaments /*searchTournament */,
};