

export default class World {
    constructor() {
        this.tracks = [];
        this.straightWidth = 0;
        this.straightHeight = 0;
        this.curvedWidth = 0;
        this.curvedHeight = 0;
    }

    getWidth = () => 900;
    getHeight = () => 700;

    addTrack = (track) => {
        this.tracks.push(track)
    }
    getTracks = () => this.tracks;



}
