import Track from './track.js';
import TrackType from './trackType.js';

export default class TrackBuilder {
    buildTracks = (world) => {

        //let builtTracks = [];

        const straightTrackType =  new TrackType("trackStraight.png", 125,100);
        const curvedTrackType =  new TrackType("trackCurved.png", 133,133);
      
        let x=100;
        let y=500;
        let dir =0; //up=0, right=1

        function moveStraight(dir) {
            if (dir === 0) y-=straightTrackType.getHeight();
            if (dir === 1) x+=straightTrackType.getHeight();
            if (dir === 2) y+=straightTrackType.getHeight();
            if (dir === 3) x-=straightTrackType.getHeight();
        }

        function moveCurved(dir) {
            if (dir === 0) y+=curvedTrackType.getWidth();
            if (dir === 1) x+=curvedTrackType.getWidth();
            if (dir === 2) y+=curvedTrackType.getWidth();
            if (dir === 3) x-=curvedTrackType.getWidth();
        }
      
        const trackList = ["s","s","s","r","s","s","r","s","s","s","r","s","s","r"]
        trackList.forEach(t => {
          switch(t) {
            case "s":
              world.addTrack(new Track(dir,straightTrackType,x,y));
              moveStraight(dir);
              break;
      
            case "r":
                switch(dir) {
                    case 0:
                        x+=(133-125)/2;
                        y-=(133-100)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x-=(133-100)/2;
                        y-=(133-125)/2;
        
                        dir = (dir+1)%4;
                        moveCurved(dir);
                        break;

                    case 1:
                        x+=(133-100)/2;
                        y+=(133-125)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x+=(133-125)/2;
                        y-=(133-100)/2;
        
                        dir = (dir+1)%4;
                        moveCurved(dir);
                        break;

                    case 2:
                        x-=(133-125)/2;
                        y+=(133-100)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x+=(133-100)/2;
                        y+=(133-125)/2;
        
                        dir = (dir+1)%4;
                        moveCurved(dir);
                        break;

                    case 3:
                        x-=(133-100)/2;
                        y-=(133-125)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x+=(133-125)/2;
                        y-=(133-100)/2;
        
                        dir = (dir+1)%4;
                        moveCurved(dir);
                        break;
                }
                break;
      
          }
        })
      
        //world.addTrack(new Track('sn',straightTrackType,100,400));
        
      }
}
