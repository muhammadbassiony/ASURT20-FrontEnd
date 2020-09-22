import { Injectable } from '@angular/core';
import {BackEndURL} from '../shared/backEndURL';
@Injectable({
  providedIn: 'root'
})


export class BackEndURLService {

  constructor() { }
  
  getURL(): string{
    return BackEndURL;
  }


}
