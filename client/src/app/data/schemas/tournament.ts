export interface Tournament {
  id: number;
  name: string;
  description: string;
  date: Date;
  owner: string;
  participants: string[];
  game: string,
  status: string;
  image?: string;
}
