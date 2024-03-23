import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeerConnectionComponent } from './components/peer-connection/peer-connection.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'pc', pathMatch: 'full' }, // Default route
  { path: 'pc', component: PeerConnectionComponent },
  { path: 'about', component: AboutComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
