export interface AuthUser{
  _id: string;
  level: number;
  token: string;
  profileComplete: boolean;
  exp: number;  //expiration time in milliseconds
}


// export class User {
//   constructor(
//     public isAdmin: number, 
//     public id: string, 
//     private _token: string, 
//     private _tokenExpirationDate: Date) {}
  
//   get token() {
//     if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
//       return null;
//     }
//     return this._token;
//   }
// }


