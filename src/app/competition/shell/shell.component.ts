import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {
  backgroundColor:string='#E5AC00'

  constructor() { }

  ngOnInit(): void {
  }

}
