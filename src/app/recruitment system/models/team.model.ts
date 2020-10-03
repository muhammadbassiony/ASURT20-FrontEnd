// import { Subteam } from "./subteam.model";

export interface Team {
    _id?: string;
    name: string;
    subteams: string[];    // array of subteam Ids
    // subteams : Subteam [];
}

// export class Team{
//     _id: string;
//     name: string;
//     subteams : string[];    // array of subteam Ids

//     constructor(id: string, name: string, subs: string[]){
//         this._id = id;
//         this.name = name;
//         this.subteams = subs;
//     }
// }

  