import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CattleService } from '../cattle.service';
import { Cattle } from '../../shared/models/cattle.model';
import { PriceFormatPipe } from '../../shared/pipes/price-format.pipe';
import { AvailabilityStatusPipe } from '../../shared/pipes/availability-status.pipe';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-cattle-list',
  standalone: true,
  imports: [
    CommonModule, 
    PriceFormatPipe, 
    AvailabilityStatusPipe,
    HeaderComponent
  ],
  templateUrl: './cattle-list.component.html',
  styleUrl: './cattle-list.component.css'
})
export class CattleListComponent implements OnInit {
  cattle: Cattle[] = [];
  loading = true;
  errorMessage = '';
  updatingId: number | null = null;

  constructor(private readonly cattleService: CattleService) {}

  ngOnInit(): void {
    this.loadCattle();
  }

  loadCattle(): void {
    this.loading = true;
    this.cattleService.getAllCattle()
      .subscribe({
        next: (data) => {
          this.cattle = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.message ?? 'Failed to load cattle inventory';
          this.loading = false;
        }
      });
  }

  toggleAvailability(animal: Cattle): void {
    if (this.updatingId !== null) return;
    
    this.updatingId = animal.id!;
    const newStatus = !animal.isAvailable;
    
    this.cattleService.updateCattleAvailability(animal.id!, newStatus)
      .subscribe({
        next: (updatedCattle) => {
          // Update the local data
          const index = this.cattle.findIndex(c => c.id === animal.id);
          if (index !== -1) {
            this.cattle[index].isAvailable = newStatus;
          }
          this.updatingId = null;
        },
        error: (error) => {
          this.errorMessage = `Failed to update status: ${error.message}`;
          this.updatingId = null;
        }
      });
  }
}