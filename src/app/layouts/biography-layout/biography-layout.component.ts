import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from "../../core/shared/loading/loading.component";

@Component({
  selector: 'app-biography-layout',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './biography-layout.component.html',
  styleUrl: './biography-layout.component.css'
})
export class BiographyLayoutComponent {

}
