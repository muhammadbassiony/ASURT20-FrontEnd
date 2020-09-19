export class Sponsor
{
     constructor(
        public logo : string,
        public name : string,
        public desc : string,
        public isChecked : boolean = true,
        public id : string
    ){}
}