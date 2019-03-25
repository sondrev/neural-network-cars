function getRandomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export default class Car {
    constructor(world,x, y,angle=Math.PI) {
        this.alive=true;
        this.world=world;
        this.x=x;
        this.y=y;
        this.xVel=0;
        this.yVel=0;
        this.drag=0.9;
        this.angle=angle;// - the rotation of the car, in radians
        this.angularVelocity=0;// - speed the car is spinning, in radians
        this.angularDrag=0.9;// - how fast the car stops spinning
        this.power=0.4;// - how fast car can accelerate
        this.turnSpeed=0.003;// - how fast to turn
        this.visitedTracks = [];
        this.aliveTime = 0;

        this.color = getRandomColor();

    }

    update = (delta) => {
        if (this.alive) {
            this.x += this.xVel
            this.y += this.yVel
            this.xVel *= this.drag
            this.yVel *= this.drag
            this.angle += this.angularVelocity
            this.angularVelocity *= this.angularDrag
            this.alive=!this.hasCrashed();
            this.updateVisitedTracks();
            this.aliveTime++;
        }
    }

    updateVisitedTracks = () => {
        const allTracks = this.world.getTracks();
        const toCheck = allTracks.filter( ( t ) => !this.visitedTracks.includes( t ) );
        const collisions = toCheck.filter( ( t ) => this.trackCollishion(t))
        this.visitedTracks.push.apply(this.visitedTracks,collisions)
    }

    accelerate = (amnt) => {
        this.xVel += Math.sin(this.angle) * amnt * this.power;
        this.yVel += -Math.cos(this.angle) * amnt * this.power;
    }

    turn = (amnt) => {
        this.angularVelocity+= (amnt*2 -1) * this.turnSpeed
    }

    turnLeft = () => {
        this.angularVelocity -= this.turnSpeed;
    }

    turnRight = () => {
        this.angularVelocity += this.turnSpeed;
    }

    hasCrashed = () => {
        if (this.getX()>this.world.getWidth()) return true;
        if (this.getY()>this.world.getHeight()) return true;
        if (this.getX()<0) return true;
        if (this.getY()<0) return true;
        if (this.world.getTracks().filter(t => this.trackCollishion(t)).length === 0) return true;
        return false;
    }

    trackCollishion = (track) => {
        const carCollisionRadius = 10;
        const trackType = track.getTrackType();
        if (track.getX() - trackType.getWidth()/2< this.x + carCollisionRadius &&
            track.getX() + trackType.getWidth()/2 > this.x &&
            track.getY() - trackType.getHeight()/2 < this.y + carCollisionRadius &&
            track.getY() + trackType.getHeight()/2 > this.y) {
             return true;
         }

    }

    getX = () => this.x;
    getY = () => this.y;
    getXVel = () => this.xVel;
    getYVel = () => this.yVel;
    getAngle = () => this.angle;
    getSpeed = () => Math.hypot(this.xVel,this.yVel)
    getColor = () => this.color;
    getIsAlive = () => this.alive;
    getVisitedTracks = () => this.visitedTracks;
    getAliveTime = () => this.aliveTime;
    getIsStuck = () => this.aliveTime>200 && this.getVisitedTracks().length<=3;

}
