import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { TerminalModel } from '../../models/terminal.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css',
  providers: [ConfirmationService]
})
export class TerminalComponent implements OnInit {

  terminals: TerminalModel[] = [];
  clonedTerminal: TerminalModel | undefined = undefined;
  directions = ['be', 'ki'];

  constructor(private httpService: HttpService, private confirmationService: ConfirmationService) { }

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

  saveTerminal() {
    if (this.clonedTerminal) {
      if (this.clonedTerminal.room) {
        if (this.clonedTerminal.id != 0) {
          this.httpService.modiflyTerminal(this.clonedTerminal).subscribe({
            next: (result: TerminalModel) => {
              const originalIndex = this.terminals.findIndex(x => x.id === result.id);
              this.terminals.splice(originalIndex, 1, result);
              this.clonedTerminal = undefined;
            },
            error: (err: any) => {
              console.log(err);
            }
          })
        } else {
          this.httpService.postTerminal(this.clonedTerminal).subscribe({
            next: (result: TerminalModel) => {
              this.terminals.splice(0, 0, result);
              this.clonedTerminal = undefined;
            },
            error: (err: any) => {
              console.log(err);
            }
          })
        }
      }
    }
  }

  cancelEdit() {
    this.clonedTerminal = undefined;
  }

  newTerminal() {
    this.clonedTerminal = {
      id: 0,
      name: '',
      direction: 'be',
      room: ''
    }
  }

  deleteTerminal(model: TerminalModel) {
    this.confirmationService.confirm({
      message: `Biztosan törölni szeretné a ${model.name} nevű terminált?`,
      header: 'Megerősítés',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Igen',
      rejectLabel: 'Nem',
      accept: () => {
        this.httpService.deleteTerminal(model.id).subscribe({
          next: (result: any) => {
            const index = this.terminals.findIndex(x => x.id == model.id);
            this.terminals.splice(index, 1);
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
    })

  }
}
