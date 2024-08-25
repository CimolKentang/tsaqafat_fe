import { Component, OnInit } from '@angular/core';
import { BiographyService } from '../../core/services/biography.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.css'
})
export class BiographyComponent implements OnInit {
  datas: any;

  constructor(
    private biographyService: BiographyService
  ) { }
  
  ngOnInit(): void {
    this.getBiographies();
  }

  getBiographies() {
    this.biographyService.getBiographyies().subscribe(result => {
      this.datas = result.resource;
    });
  }
}
