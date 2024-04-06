import { Routes } from '@angular/router';
import { PeerConnectionComponent } from './components/peer-connection/peer-connection.component';
import { AboutComponent } from './about/about.component';
import { WebRTCComponent } from './components/webrtc/webrtc.component';

export const routes: Routes = [

    // { path: 'pc', component: PeerConnectionComponent },
        { path: 'about', component: AboutComponent },
        { path: 'rtc', component: WebRTCComponent },
];
