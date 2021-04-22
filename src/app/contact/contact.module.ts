import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './components/contact/contact.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContactCreationComponent } from './components/contact-creation/contact-creation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from './util/filter.pipe';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  declarations: [
    ContactListComponent,
    ContactComponent,
    ContactCreationComponent,
    FilterPipe
  ],
  imports: [
    ContactRoutingModule,
    CommonModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    HttpClientModule
  ]
})
export class ContactModule { }
