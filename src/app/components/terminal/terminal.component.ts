import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TerminalModel } from '../../models/terminal.model';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements OnInit {

  terminals: TerminalModel[] = [];
  clonedTerminal: TerminalModel | undefined = undefined;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getTerminals().subscribe({
      next: (result: TerminalModel[]) => {
        this.terminals = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  editInit(terminal: TerminalModel) {
    this.clonedTerminal = JSON.parse(JSON.stringify(terminal));
  }
}
