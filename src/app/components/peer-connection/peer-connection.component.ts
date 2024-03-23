// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-peer-connection',
//   standalone: true,
//   imports: [],
//   templateUrl: './peer-connection.component.html',
//   styleUrl: './peer-connection.component.css'
// })
// export class PeerConnectionComponent {

// }

import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-peer-connection',
  templateUrl: './peer-connection.component.html',
  styleUrls: ['./peer-connection.component.css']
})

export class PeerConnectionComponent implements OnInit {

  pc: RTCPeerConnection | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.start();
  }
  async negotiate() {
    this.pc?.addTransceiver('video', { direction: 'recvonly' });
    this.pc?.addTransceiver('audio', { direction: 'recvonly' });

    const offer = await this.pc?.createOffer();
    await this.pc?.setLocalDescription(offer);

    // Wait for ICE gathering to complete
    await new Promise<void>((resolve) => {
      if (this.pc?.iceGatheringState === 'complete') {
        resolve();
      } else {
        const checkState = () => {
          if (this.pc?.iceGatheringState === 'complete') {
            this.pc?.removeEventListener('icegatheringstatechange', checkState);
            resolve();
          }
        };
        this.pc?.addEventListener('icegatheringstatechange', checkState);
      }
    });

    const response = await fetch('/offer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sdp: this.pc?.localDescription?.sdp, type: this.pc?.localDescription?.type })
    });
    const answer = await response.json();
    await this.pc?.setRemoteDescription(answer);
  }



  async start() {
    // const config = { sdpSemantics: 'unified-plan' };
    const config = { sdpSemantics: 'unified-plan', iceServers: [] as RTCIceServer[] }; // Define iceServers as an empty array initially
    if ((document.getElementById('use-stun') as HTMLInputElement).checked) {
      config.iceServers = [{ urls: ['stun:stun.l.google.com:19302'] }];
    }
    this.pc = new RTCPeerConnection(config);

    this.pc.addEventListener('track', (evt) => {
      if (evt.track.kind === 'video') {
        (document.getElementById('video') as HTMLVideoElement).srcObject = evt.streams[0];
      } else {
        (document.getElementById('audio') as HTMLAudioElement).srcObject = evt.streams[0];
      }
    });

    document.getElementById('start')!.style.display = 'none';
    await this.negotiate();
    document.getElementById('stop')!.style.display = 'inline-block';
  }

  stop(): void {
    document.getElementById('stop')!.style.display = 'none';

    setTimeout(() => {
      this.pc?.close();
    }, 500);
  }

}
