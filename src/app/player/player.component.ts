import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent {
  @Input() name = '';
  //das geben wir in die component mit rein.
  // Also dann als Variable im html verwendbar.
}
