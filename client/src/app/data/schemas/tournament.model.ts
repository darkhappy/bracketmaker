import {PlayerModel} from "@data/schemas/Player.model";

export class TournamentModel {
  _id: String = "";
  name: String = "";
  description : String = "";
  date : Date = new Date();
  bracket_type : String = "";
  visibility : String = "";
  location: String = "";
  game: String = "";
  players: PlayerModel[] = [];
}
