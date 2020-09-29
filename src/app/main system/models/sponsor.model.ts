// export class Sponsor
// {
//      constructor(
//         public logo : string,
//         public name : string,
//         public desc : string,
//         public isChecked : boolean = true,
//         public id : string
//     ){}
// }

export interface Sponsor{
    _id?: string;
    name: string;
    desc: string;
    isChecked: string;
    logo: string;
}
