import { InterviewStatus } from './interview-status-enum.model';

export interface Interview{
    id: string; 
    // LEAVE NAME AS id ONLY DO NOT CHANGE TO ivId OR ANY 
    //      OTHER NAME FOR COMPATABILITY WITH FULL CALENDAR LIBRARY 
    //      -- for front end only can change in back end 

    start: Date;
    end: Date;

    title: string;
    url: string;

    backgroundColor: string;
    // borderColor: string;
    // textColor: string;

    extendedProps: {
        ivStatus: InterviewStatus;
        appId?: string;
        eventId?: string;
    };

}
