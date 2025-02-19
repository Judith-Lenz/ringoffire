import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialog } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game; //Das ! bedeutet: "Ich verspreche, dass game vor der ersten Nutzung gesetzt wird."
  // Sonst meckert angular rum, weil TypeScript verlangt, dass die Eigenschaft game entweder direkt bei der Deklaration oder im Konstruktor initialisiert wird.
  // Im Code wird game erst in der Methode newGame() initialisiert, die erst in ngOnInit() aufgerufen wird.
  // TypeScript kann nicht sicherstellen, dass game immer einen Wert hat, bevor sie verwendet wird.

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      // Prüft, ob gerade keine Animation läuft
      this.pickCardAnimation = true; // Setzt die Animation auf 'aktiv'
      let takenCard = this.game.stack.pop(); // Nimmt die oberste Karte aus dem Kartenstapel, also die letzte im Array
      if (takenCard !== undefined) {
        this.currentCard = takenCard; // Speichert die gezogene Karte in 'currentCard'
      }

      console.log(this.currentCard);
      console.log(this.game);
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard); // Fügt die Karte in 'playedCards' hinzu
        this.pickCardAnimation = false; // Nach 1 Sek Animation wieder deaktivieren
      }, 1000);
    }
  }

  //kopiert von Material Design
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
