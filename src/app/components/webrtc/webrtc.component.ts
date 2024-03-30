import { Component } from '@angular/core';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.css']
})
export class WebRTCComponent {
  pc: RTCPeerConnection | null = null;
  host_ip: string = "127.0.0.1";
  throttle_: number = 0.0;
  steering_: number = 0.0;
  throttle_factor: number = 0.2;

  constructor() { }

  async negotiate() {
    try {
        this.pc?.addTransceiver('video', { direction: 'recvonly' });
        // this.pc?.addTransceiver('audio', { direction: 'recvonly' });

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

        console.log("before fetch");
            
        let pd = await JSON.stringify({ sdp: this.pc?.localDescription?.sdp, type: this.pc?.localDescription?.type });
        console.log(pd);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*'); // Adjust as needed
      //   headers.append("Access-Control-Allow-Credentials","true ");
      //   headers.append("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
      //  headers.append("Access-Control-Allow-Headers","Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
        const response = await fetch('http://192.168.0.116:8080/offer', { //fix this
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': 'POST, OPTIONS',
              // 'Access-Control-Allow-Headers': 'Content-Type',

            },
            body: JSON.stringify({ sdp: this.pc?.localDescription?.sdp, type: this.pc?.localDescription?.type })
        });
        console.log("after fetch and response is: ", response);
        const answer = await response.json();
        console.log("after response and answer is: ", answer);
        await this.pc?.setRemoteDescription(answer);
        console.log("after response and answer is: ", answer);
    } catch (error) {
        console.error('Error in negotiate:', error);
        // Handle error as needed
    }
}



  async start() {
    const config = { sdpSemantics: 'unified-plan', iceServers: [] as RTCIceServer[] }; // Define iceServers as an empty array initially
    if ((document.getElementById('use-stun') as HTMLInputElement).checked) {
      config.iceServers = [{ urls: ['stun:stun.l.google.com:19302'] }];
    }
    this.pc = new RTCPeerConnection(config);

    this.pc.addEventListener('track', (evt) => {
      if (evt.track.kind === 'video') {
        const videoElement = document.getElementById('video') as HTMLVideoElement | null;
        if (videoElement) {
          videoElement.srcObject = evt.streams[0];
        } else {
          console.error("Video element not found");
        }
        // Update video srcObject using Angular data binding
      } else {
        // Update audio srcObject using Angular data binding
      }
    });

    // Hide start button using Angular data binding
    // Call negotiate method
    // Show stop button using Angular data binding
    // document.getElementById('start')!.style.display = 'none';
    await this.negotiate();
    // document.getElementById('stop')!.style.display = 'inline-block';
  }

  stop() {
    // Hide stop button using Angular data binding
    setTimeout(() => {
      this.pc?.close();
    }, 500);
  }

  async negotiate2() {
    try {
        this.pc?.addTransceiver('video', { direction: 'recvonly' });
        // this.pc?.addTransceiver('audio', { direction: 'recvonly' });

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

        console.log("before fetch");
            
        let pd = await JSON.stringify({ sdp: this.pc?.localDescription?.sdp, type: this.pc?.localDescription?.type });
        console.log(pd);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*'); // Adjust as needed
      //   headers.append("Access-Control-Allow-Credentials","true ");
      //   headers.append("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
      //  headers.append("Access-Control-Allow-Headers","Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
        const response = await fetch('http://192.168.0.116:8080/offer2', { //fix this
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': 'POST, OPTIONS',
              // 'Access-Control-Allow-Headers': 'Content-Type',

            },
            body: JSON.stringify({ sdp: this.pc?.localDescription?.sdp, type: this.pc?.localDescription?.type })
        });
        console.log("after fetch and response is: ", response);
        const answer = await response.json();
        console.log("after response and answer is: ", answer);
        await this.pc?.setRemoteDescription(answer);
        console.log("after response and answer is: ", answer);
    } catch (error) {
        console.error('Error in negotiate:', error);
        // Handle error as needed
    }
}



  async start2() {
    const config = { sdpSemantics: 'unified-plan', iceServers: [] as RTCIceServer[] }; // Define iceServers as an empty array initially
    if ((document.getElementById('use-stun') as HTMLInputElement).checked) {
      config.iceServers = [{ urls: ['stun:stun.l.google.com:19302'] }];
    }
    this.pc = new RTCPeerConnection(config);

    this.pc.addEventListener('track', (evt) => {
      if (evt.track.kind === 'video') {
        const videoElement = document.getElementById('video2') as HTMLVideoElement | null;
        if (videoElement) {
          videoElement.srcObject = evt.streams[0];
        } else {
          console.error("Video element not found");
        }
        // Update video srcObject using Angular data binding
      } else {
        // Update audio srcObject using Angular data binding
      }
    });

    // Hide start button using Angular data binding
    // Call negotiate method
    // Show stop button using Angular data binding
    // document.getElementById('start')!.style.display = 'none';
    await this.negotiate2();
    // document.getElementById('stop')!.style.display = 'inline-block';
  }

  stop2() {
    // Hide stop button using Angular data binding
    setTimeout(() => {
      this.pc?.close();
    }, 500);
  }
}
