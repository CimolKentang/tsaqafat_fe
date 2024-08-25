import { Component, OnInit } from '@angular/core';
import { GenerationService } from '../../../core/services/generation.service';
import { FieldService } from '../../../core/services/field.service';

@Component({
  selector: 'app-update-properties',
  standalone: true,
  imports: [],
  templateUrl: './update-properties.component.html',
  styleUrl: './update-properties.component.css'
})
export class UpdatePropertiesComponent implements OnInit {
  generations: any;
  fields: any;

  constructor(
    private generationService: GenerationService,
    private fieldService: FieldService
  ) { }
  
  ngOnInit(): void {
    this.getGenerations();
    this.getFields();
  }

  getGenerations() {
    this.generationService.getGenerations().subscribe(result => {
      this.generations = result.resource;
    });
  }

  getFields() {
    this.fieldService.getFields().subscribe(result => {
      this.fields = result.resource;
    });
  }
}
