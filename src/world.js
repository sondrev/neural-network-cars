import Car from './car.js';

export default class World {
    constructor() {
        this.tracks = [];
        this.straightWidth = 0;
        this.straightHeight = 0;
        this.curvedWidth = 0;
        this.curvedHeight = 0;
    }

    addTrack = (track) => {
        this.tracks.push(track)
    }

    generateCar = () => new Car(this,100, 400,Math.PI * 2)    

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
