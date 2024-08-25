import { Location, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextEditorComponent } from '../../../core/shared/text-editor/text-editor.component';
import { BiographyService } from '../../../core/services/biography.service';
import { FieldService } from '../../../core/services/field.service';
import { GenerationService } from '../../../core/services/generation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biography-edit',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, TextEditorComponent],
  templateUrl: './biography-edit.component.html',
  styleUrl: './biography-edit.component.css'
})
export class BiographyEditComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  fieldForm: FormGroup;
  generationForm: FormGroup;

  biographyId: any;
  biography: any;

  fields: any;
  generations: any;

  constructor(
    private fb: FormBuilder,
    private biographyService: BiographyService,
    private fieldService: FieldService,
    private location: Location,
    private generationService: GenerationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.biographyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getBiographyById(parseInt(this.biographyId));
    
    this.getFields();
    this.getGenerations();

    this.fieldForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.generationForm = this.fb.group({
      name: ['', Validators.required],
      order: [null, Validators.min(1)]
    });
  }  

  ngAfterViewInit(): void {
    
  }

  getBiographyById(id: number) {
    this.biographyService.getBiographyById(id).subscribe(result => {
      this.biography = result.resource;
      this.initForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: [this.biography ? this.biography.name : '', Validators.required],
      generation_id: [this.biography ? this.biography.generation_id : null, Validators.required],
      field_ids: [[], Validators.required],
      birth: [this.biography ? this.biography.birth : ''],
      death: [this.biography ? this.biography.death : '', Validators.required],
      description: [this.biography ? this.biography.description : '', Validators.required],
    });

    let field_ids = this.biography.fields.map((f: any) => f.id);
    this.form.get('field_ids')?.setValue(field_ids);
  }

  isFieldSelected(id: number): boolean {
    const field_ids = this.form.get('field_ids')?.value;
    const field_id = field_ids.find((f: any) => f == id);

    return field_id != undefined;
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
    console.log(event)

    if (event === true) {
      fieldIds.push(fieldId);
    } else {
      fieldIds = fieldIds.filter((id: any) => id != fieldId);
    }

    this.form.get('field_ids')?.setValue(fieldIds);
  }

  onSubmit() {
    console.log(this.form.getRawValue())
    // this.biographyService.addBiography(this.form.getRawValue()).subscribe(result => {
    //   if (result.success == true) {
    //     this.form.reset();
    //     this.location.back();
    //   }
    // });
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
