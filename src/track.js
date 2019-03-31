export default class Track {
    constructor(direction,trackType, x, y) {
        this.direction=direction;
        this.trackType=trackType;
        this.x=x;
        this.y=y;
        this.width = 50;
    }

    getDirection = () => this.direction;
    getX = () => this.x;
    getY = () => this.y;
    getHeight = () => this.trackType.getHeight();
    getWidth = () => this.trackType.getWidth();
    getTrackType = () => this.trackType;
    getRotation = () => {return Math.PI*(this.direction%4)*0.5;}
}
