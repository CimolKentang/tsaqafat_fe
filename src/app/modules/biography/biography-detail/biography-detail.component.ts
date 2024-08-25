import { Component, OnInit } from '@angular/core';
import { BiographyService } from '../../../core/services/biography.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-biography-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './biography-detail.component.html',
  styleUrl: './biography-detail.component.css'
})
export class BiographyDetailComponent implements OnInit {
  biographyId: any;
  biography: any;

  constructor(
    private biographyService: BiographyService,
    private activatedRoute: ActivatedRoute
  ) { }
  
  ngOnInit(): void {
    this.biographyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBiography(parseInt(this.biographyId));
  }

  getBiography(id: number) {
    this.biographyService.getBiographyById(id).subscribe(result => {
      this.biography = result.resource;
    });
  }
}
