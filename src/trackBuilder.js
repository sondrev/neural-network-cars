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

        const scw = curvedTrackType.getWidth()-straightTrackType.getWidth(); //Difference between straight and curved tiles in width
        const shcw = curvedTrackType.getWidth()-straightTrackType.getHeight(); ////Difference between straight height and curved width
      
        let x=100;
        let y=700;
        let dir =0; //up=0, right=1, down=2, left=3

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

        function placeCurved(adjXbefore,adjYbefore,adjXafter,adjYafter,adjDir) {
            x+=adjXbefore/2;
            y+=adjYbefore/2;
            world.addTrack(new Track(dir+adjDir,curvedTrackType,x,y));
            x+=adjXafter/2;
            y+=adjYafter/2;
        }
      
        let trackList = []
        if (trackNumber === 1) trackList=trackCurves;
        if (trackNumber === 2) trackList=trackLong;
        if (trackNumber === 3) trackList=trackHard;
        if (trackNumber === 4) trackList=trackCurves;



        trackList.forEach(t => {
          switch(t) {
            case "s":
                const nextTrack = new Track(dir,straightTrackType,x,y);
                world.addTrack(nextTrack);
                moveStraight(dir);
                break;
      
            case "r":
                switch(dir) {
                    case 0:
                        placeCurved(scw,-shcw,-shcw,-scw,0)
                        break;

                    case 1:
                        placeCurved(shcw,scw,scw,-shcw,0)
                        break;

                    case 2:
                        placeCurved(-scw,shcw,shcw,scw,0)
                        break;

                    case 3:
                        placeCurved(-shcw,-scw,-scw,shcw,0)
                        break;
                }
                dir = (dir+1)%4;
                moveCurved(dir);
                break;

            case "l":
                switch(dir) {
                    case 0:
                        placeCurved(-scw,-shcw,+shcw,-scw,1)
                        break;

                    case 1:
                        placeCurved(shcw,-scw,scw,shcw,1)
                        break;

                    case 2:
                        placeCurved(scw,shcw,-shcw,scw,1)
                        break;

                    case 3:
                        placeCurved(-shcw,scw,-scw,-shcw,1)
                        break;
                }
                dir = (dir+3)%4;
                moveCurved(dir);
                break;
      
          }
        })
      
        //world.addTrack(new Track('sn',straightTrackType,100,400));
        
      }
}
