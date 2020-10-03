import {Team} from './team.model';
import { Seasons } from '../models/seasons.model';
import { ApplicationPhase } from './app-phases-enum.model';

export interface Event {

    _id?: string;

    eventActive: boolean;
    teamId: string;

    questions: string[];
    season: Seasons;

    activeSubteams?: string[];   //array of subteam Ids

    // back end ??  --  implemented in backend but not needed here for now at least
    // startDate: Date;
    // endDate: Date;

    currentPhase?: ApplicationPhase;

    numApplicants?: number;
    numAccepted?: number;
    numRejected?: number;
    numPendAcc?: number;
    numPendRej?: number;

}

// export class Event{
//     _id: string;

//     eventActive: boolean;
//     teamId: string;

//     questions: string[];
//     season: Seasons;

//     activeSubteams: string[];   //array of subteam Ids

//     // back end ??  --  implemented in backend but not needed here for now at least
//     // startDate: Date;
//     // endDate: Date;

//     numApplicants: number;
//     numAccepted: number;
//     numRejected: number;
//     numPendAcc: number;
//     numPendRej: number;

//     constructor(teamId: string, eventActive: boolean, questions: string[], season: Seasons){
//         this.teamId = teamId;
//         this.season = season;
//         this.questions = questions;
//         this.eventActive = eventActive;
//     }
// }