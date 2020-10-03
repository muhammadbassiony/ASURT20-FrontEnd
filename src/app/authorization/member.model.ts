import { Seasons } from '../recruitment system/models/seasons.model';

export interface Member {
    _id: string;
    userId: string;
    teamId: string;
    subteamId: string;
    head: boolean;
    season: Seasons;
}