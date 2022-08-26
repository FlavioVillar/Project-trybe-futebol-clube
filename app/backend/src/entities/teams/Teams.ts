import { ITeams } from './ITeams.interface';

export default class Teams implements ITeams {
  id: number;
  teamName: string;

  constructor() {
    this.id = 0;
    this.teamName = '';
  }
}
