import Car from './car.js';
import TrackBuilder from './trackBuilder.js';

export default class World {
    constructor(settings) {
        this.settings = settings;
        this.tracks = [];
        this.straightWidth = 0;
        this.straightHeight = 0;
        this.curvedWidth = 0;
        this.curvedHeight = 0;

        this.trackBuilder = new TrackBuilder();
        this.trackBuilder.buildTracks(this,settings.getNextMap());
    }

    addTrack = (track) => {
        this.tracks.push(track)
    }

    rebuildTracks = () => {
        this.tracks = [];
        this.trackBuilder.buildTracks(this,this.settings.getNextMap());
    }

    generateCar = () => new Car(this,100, 700,Math.PI * 2)    

    collisionCheck = (x,y,radius) => {
        const collidingTracks = this.tracks.filter(t => 
            
                (t.getX()-t.getWidth()/2)<x  && (t.getX()+t.getWidth()/2)>x && (t.getY()-t.getHeight()/2)<y  && (t.getY()+t.getHeight()/2)>y
            
            )



        return (collidingTracks.length>0)
    } 

    getWidth = () => 1200;
    getHeight = () => 1000;
    getTracks = () => this.tracks;


}
