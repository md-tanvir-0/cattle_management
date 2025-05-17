import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CattleService } from '../cattle.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
@Component({
  selector: 'app-add-cattle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './add-cattle.component.html',
  styleUrl: './add-cattle.component.css'
})
export class AddCattleComponent implements OnInit {
  cattleForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  success = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cattleService: CattleService,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.cattleForm = this.formBuilder.group({
      breed: ['', Validators.required],
      weight: ['', [
        Validators.required, 
        Validators.min(100), 
        Validators.max(2000)
      ]],
      price: ['', [
        Validators.required, 
        Validators.min(1)
      ]],
      isAvailable: [true]
    });
  }

  get f() { return this.cattleForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.success = false;

    if (this.cattleForm.invalid) {
      return;
    }

    this.loading = true;
    
    const newCattle = {
      breed: this.f['breed'].value,
      weight: parseFloat(this.f['weight'].value),
      price: parseFloat(this.f['price'].value),
      isAvailable: this.f['isAvailable'].value
    };

    this.cattleService.addCattle(newCattle)
      .subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: error => {
          this.errorMessage = error.message ?? 'Failed to add cattle';
          this.loading = false;
        }
      });
  }
  goBack(): void {
    this.location.back();
  }
  resetForm(): void {
    this.submitted = false;
    this.cattleForm.reset({
      isAvailable: true
    });
  }
}