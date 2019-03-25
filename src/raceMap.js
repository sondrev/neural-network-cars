import Track from './track.js'

const trackData = [
    
    ['se','ew','ew','ew','ew','ws'],
    ['sn','  ','  ','  ','  ','ns'],
    ['wn','sw','  ','  ','  ','  '],
    ['  ','sn','  ','  ','  ','  '],
    ['  ','sn','  ','  ','  ','  '],
    ['  ','sn','  ','  ','  ','  '],
]

export default class RaceMap {
    constructor() {
        this.tracks = trackData.flat().map((t,i) => new Track(t,this.calcTileX(i),this.calcTileY(i))).filter(t => t.getIsTrack())
        console.log(this.tracks)
    }

    getMapSizeWidth = () => trackData[0].length;
    getMapSizeHeight = () => trackData.length;
    calcTileX = (i) => i % this.getMapSizeWidth(i);
    calcTileY = (i) => Math.floor(i/this.getMapSizeHeight(i));

    getTracks = () => this.tracks;
    getTileAt = (x,y) => trackData[x][y];

}
