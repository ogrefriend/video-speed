namespace VideoSpeed {
  export class EventsHandler {
    private static STEP_SIZE = 0.10;
    private static SKIP_SIZE = 5.00;

    constructor(public infoBubble:InfoBubble) {
    }

    private setPlaybackRate(videoElement:HTMLVideoElement, playbackRate:number) {
      this.infoBubble.showTextOnVideoElement(playbackRate.toFixed(2), videoElement);
      videoElement.playbackRate = playbackRate;
    }
   

    private showStepSize(videoElement:HTMLVideoElement, STEP_SIZE:number) {
      this.infoBubble.showTextOnVideoElement("±" + EventsHandler.STEP_SIZE, videoElement);
      EventsHandler.STEP_SIZE = STEP_SIZE;
    }

    public subtractFromPlaybackRate() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        var newRate = Math.max(0.5, videoElement.playbackRate - EventsHandler.STEP_SIZE);
        this.setPlaybackRate(videoElement, newRate);
      });
    }

    public addToPlaybackRate() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        var newRate = Math.min(4.0, videoElement.playbackRate + EventsHandler.STEP_SIZE);
        this.setPlaybackRate(videoElement, newRate);
      });
    }
    public setStepSize() {
     	if (EventsHandler.STEP_SIZE == 0.10) {
  		 EventsHandler.STEP_SIZE = 0.05;
		} 
	else {
 		 EventsHandler.STEP_SIZE = 0.10;
		}
	VideoElementsManager.videoElements.forEach((videoElement) => {
	this.showStepSize(videoElement,EventsHandler.STEP_SIZE);
       });
    }
    public resetPlaybackRate() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        this.setPlaybackRate(videoElement, 1.0);
      });
    }
   public setPlaybackRateToFave() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        this.setPlaybackRate(videoElement, 1.9);
      });
    }
    public skipForward() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + EventsHandler.SKIP_SIZE);
      });
    }

    public skipBack() {
      VideoElementsManager.videoElements.forEach((videoElement) => {
        videoElement.currentTime = Math.max(0, videoElement.currentTime - EventsHandler.SKIP_SIZE);
      });
    }
  }
}
