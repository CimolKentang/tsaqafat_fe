import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [QuillEditorComponent, ReactiveFormsModule],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {
  @Input() inputControl: FormControl = new FormControl('');
  @Input() placeholder: string = '';

  onEditorCreated(quill: any) {
    quill.format('direction', 'rtl');
    quill.format('align', 'right');
    quill.format('font', 'naskh');
    quill.format('size', '18px');
  }
}
