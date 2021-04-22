import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact/components/contact-list/contact-list.component';

const routes: Routes = [
  {
    path: 'contacts', loadChildren: () =>
      import('../app/contact/contact.module')
        .then(module => module.ContactModule)
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
