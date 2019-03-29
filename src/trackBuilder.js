import Track from './track.js';
import TrackType from './trackType.js';

const trackRound = ["s","s","s","s","s","r","s","s","s","s","s","s","s","s","r","s","s","s","s","s","r","s","s","s","s","s","s","s","s","r"]
const trackHard = ["s","s","r","l","s","l","r","r","s","s","s","s","s","s","s","s","r","s","s","s","s","s","r","r","s","s","s","l","s","s","l","l","r","s","s","r","s","s","s","s","s","r"]
const trackLong = ["s","s","r","s","s","s","s","s","s","s","s","r","s","s","r","s","s","s","s","s","s","s","s","r"]
const trackCurves = ["s","s","s","r","s","s","s","s","l","s","r","s","s","r","s","s","s","s","s","s","r","r","s","s","l","l","s","s","r","s","s","s","s","r","s"]

export default class TrackBuilder {
    buildTracks = (world,trackNumber) => {

        const straightTrackType =  new TrackType("trackStraight.png", 125,100);
        const curvedTrackType =  new TrackType("trackCurved.png", 133,133);
      
        let x=100;
        let y=700;
        let dir =0; //up=0, right=1

        function moveStraight(dir) {
            if (dir === 0) y-=straightTrackType.getHeight();
            if (dir === 1) x+=straightTrackType.getHeight();
            if (dir === 2) y+=straightTrackType.getHeight();
            if (dir === 3) x-=straightTrackType.getHeight();
        }

        function moveCurved(dir) {
            if (dir === 0) y-=curvedTrackType.getWidth();
            if (dir === 1) x+=curvedTrackType.getWidth();
            if (dir === 2) y+=curvedTrackType.getWidth();
            if (dir === 3) x-=curvedTrackType.getWidth();
        }

        function moveCurvedReverse(dir) {
            if (dir === 0) y-=curvedTrackType.getWidth();
            if (dir === 1) x+=curvedTrackType.getWidth();
            if (dir === 2) y+=curvedTrackType.getWidth();
            if (dir === 3) x-=curvedTrackType.getWidth();
        }
      
        let trackList = []
        if (trackNumber === 1) trackList=trackRound;
        if (trackNumber === 2) trackList=trackLong;
        if (trackNumber === 3) trackList=trackHard;
        if (trackNumber === 4) trackList=trackCurves;

        const scw = curvedTrackType.getWidth()-straightTrackType.getWidth(); //Difference between straight and curved tiles in width
        const shcw = curvedTrackType.getWidth()-straightTrackType.getHeight(); ////Difference between straight height and curved width

        trackList.forEach(t => {
          switch(t) {
            case "s":
              world.addTrack(new Track(dir,straightTrackType,x,y));
              moveStraight(dir);
              break;
      
            case "r":
                switch(dir) {
                    case 0:
                        x+=(scw)/2;
                        y-=(shcw)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x-=(shcw)/2;
                        y-=(scw)/2;
                        break;

                    case 1:
                        x+=(shcw)/2;
                        y+=(scw)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x+=(scw)/2;
                        y-=(shcw)/2;
                        break;

                    case 2:
                        x-=(scw)/2;
                        y+=(shcw)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x+=(shcw)/2;
                        y+=(scw)/2;
                        break;

                    case 3:
                        x-=(shcw)/2;
                        y-=(scw)/2;
                        world.addTrack(new Track(dir,curvedTrackType,x,y));
                        x-=(scw)/2;
                        y+=(shcw)/2;
                        break;
                }
                dir = (dir+1)%4;
                moveCurved(dir);
                break;

            case "l":
                switch(dir) {
                    case 0:
                        x-=(scw)/2;
                        y-=(shcw)/2;
                        world.addTrack(new Track(dir+4,curvedTrackType,x,y));
                        x+=(shcw)/2;
                        y-=(scw)/2;
                        break;

                    case 1:
                        x+=(shcw)/2;
                        y-=(scw)/2;
                        world.addTrack(new Track(dir+4,curvedTrackType,x,y));
                        x+=(scw)/2;
                        y+=(shcw)/2;
                        break;

                    case 2:
                        x-=(scw)/2;
                        y+=(shcw)/2;
                        world.addTrack(new Track(dir+4,curvedTrackType,x,y));
                        x-=(shcw)/2;
                        y+=(scw)/2;
                        break;

                    case 3:
                        x-=(shcw)/2;
                        y+=(scw)/2;
                        world.addTrack(new Track(dir+4,curvedTrackType,x,y));
                        x-=(scw)/2;
                        y-=(shcw)/2;
                        break;
                }
                dir = (dir+3)%4;
                moveCurvedReverse(dir);
                break;
      
          }
        })
      
        //world.addTrack(new Track('sn',straightTrackType,100,400));
        
      }
}
