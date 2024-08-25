import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BiographyService } from '../../../core/services/biography.service';
import { FieldService } from '../../../core/services/field.service';
import { Location, NgFor, NgIf } from '@angular/common';
import { TextEditorComponent } from "../../../core/shared/text-editor/text-editor.component";
import { GenerationService } from '../../../core/services/generation.service';

@Component({
  selector: 'app-biography-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, TextEditorComponent],
  templateUrl: './biography-create.component.html',
  styleUrl: './biography-create.component.css'
})
export class BiographyCreateComponent implements OnInit {
  form: FormGroup;
  fieldForm: FormGroup;
  generationForm: FormGroup;

  fields: any;
  generations: any;

  constructor(
    private fb: FormBuilder,
    private biographyService: BiographyService,
    private fieldService: FieldService,
    private location: Location,
    private generationService: GenerationService
  ) { }
  
  ngOnInit(): void {
    
    this.getFields();
    this.getGenerations();

    this.form = this.fb.group({
      name: ['', Validators.required],
      generation_id: [null, Validators.required],
      field_ids: [[], Validators.required],
      birth: [''],
      death: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.fieldForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.generationForm = this.fb.group({
      name: ['', Validators.required],
      order: [null, Validators.min(1)]
    });
  }  

  getFields() {
    this.fieldService.getFields().subscribe(result => {
      this.fields = result.resource;
    });
  }

  getGenerations() {
    this.generationService.getGenerations().subscribe(result => {
      this.generations = result.resource;
    });
  }

  onSelectField(event: any, fieldId: any) {
    let fieldIds = this.form.get('field_ids')?.value;

    if (event === true) {
      fieldIds.push(fieldId);
    } else {
      fieldIds = fieldIds.filter((id: any) => id != fieldId);
    }

    this.form.get('field_ids')?.setValue(fieldIds);
  }

  onSubmit() {
    this.biographyService.addBiography(this.form.getRawValue()).subscribe(result => {
      if (result.success == true) {
        this.form.reset();
        this.location.back();
      }
    });
  }

  onSubmitField() {
    this.fieldService.createField(this.fieldForm.getRawValue()).subscribe(() => {
      this.fieldForm.reset();
      this.getFields();
    });
  }

  onSubmitGeneration() {
    this.generationService.createGeneration(this.generationForm.getRawValue()).subscribe(() => {
      this.generationForm.reset();
      this.getGenerations();
    });
  }
}
