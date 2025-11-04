import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdeaService } from '../idea.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-idea-form',
  templateUrl: './idea-form.component.html',
  standalone : false,
  styleUrls: ['./idea-form.component.scss']
})
export class IdeaFormComponent implements OnInit,AfterViewInit {
  ideaForm!: FormGroup;
  @Output() save = new EventEmitter<{ title: string; description: string, vote_count: number }>();
  @Output() close = new EventEmitter<void>();
  @ViewChild('titleInput') titleInput!: ElementRef;
  constructor(private fb: FormBuilder, private ideaService: IdeaService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.ideaForm = this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      description: this.fb.control('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.titleInput?.nativeElement.focus();
    });
  }

  get f() {
    return this.ideaForm.controls;
  }

  onSubmit() {
    if (this.ideaForm.valid) {
      this.createIdea().then(res =>{
        this.save.emit(res);
        this.ideaForm.reset();
      })
    } else {
      this.ideaForm.markAllAsTouched();
    }
  }

  createIdea(): Promise<any>
  {
    return new Promise((resolve,reject) =>{
      this.ideaService.createIdea(this.ideaForm.value).subscribe({
        next: (res) => {
          this.errorService.showSuccess("Idea created !");
          resolve(res);
        },
        error: (err) => {
          this.errorService.showError(err.error?.error);
          reject();
        }
      });
    })
  }

  onClose() {
    this.close.emit();
    this.ideaForm.reset();
  }
}
