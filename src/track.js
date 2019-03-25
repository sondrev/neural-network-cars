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
    getLength = () => this.length;
    getWidth = () => this.width;
    getTrackType = () => this.trackType;
    getRotation = () => {
        return Math.PI*this.direction*0.5;
    }

    getIsVertical = () => this.direction=='sn'||this.direction=='ns'
    getIsHorisontal = () => this.direction=='ew'||this.direction=='we'
    getIsCorner = () => this.direction=='se'||this.direction=='ws'||this.direction=='nw'||this.direction=='en'
                      ||this.direction=='es'||this.direction=='sw'||this.direction=='wn'||this.direction=='ne'

    getIsTrack = () => this.getDirection()!='  ';
}
