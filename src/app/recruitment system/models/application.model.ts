import {Subteam} from './subteam.model';

import { ApplicationStatus } from './app-status-enum.model';
import { ApplicationPhase } from './app-phases-enum.model';
import { Seasons } from './seasons.model';


export interface Application {
    
    _id?: string;

    userId: string;     
    eventId: string;  
    
    selectedSubteam1: string;  //id
    selectedSubteam2: string;  //id

    userCV: File;   // or path?
    cvPath?: string;   // ??? 

    //users answers
    userAnswers: [{
        q_id?: string,  //optional
        question: string,
        answer: string
    }];

    currentPhase: ApplicationPhase;
    currentPhaseStatus: ApplicationStatus;

    season: Seasons;
    
}