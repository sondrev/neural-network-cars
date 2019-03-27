export default class Settings {
    constructor() {
        this.speed = 1;
        this.nextMap = 1;
        this.skip = false;
    }

    getSpeed = () => this.speed;
    increaseSpeed = () => {this.speed+=1;}
    decreaseSpeed = () => {this.speed=Math.max(this.speed-1,0)}
    setNextMap = (n) => {this.nextMap=n;}
    getNextMap = () => this.nextMap;

    skipGeneration = () => {this.skip=true;}
    processSkip = () => {
        
        if (this.skip) {
            this.skip=false
            console.log(this.skip)
            return true;
        }
        return false;
    }

}
