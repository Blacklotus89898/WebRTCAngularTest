import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeerConnectionComponent } from './components/peer-connection/peer-connection.component';
import { AboutComponent } from './about/about.component';
import { WebRTCComponent } from './components/webrtc/webrtc.component';

const routes: Routes = [
  { path: '', redirectTo: 'rtc', pathMatch: 'full' }, // Default route
  { path: 'pc', component: PeerConnectionComponent }, //deprecated component
  { path: 'RTC', component: WebRTCComponent },
  { path: 'about', component: AboutComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
