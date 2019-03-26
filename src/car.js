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
        this.angle=angle;
        this.angularVelocity=0;// - speed the car is spinning, in radians
        this.angularDrag=0.9;// - how fast the car stops spinning
        this.power=0.4;// - how fast car can accelerate
        this.turnSpeed=0.003;// - how fast to turn
        this.visitedTracks = [];
        this.aliveTime = 0;
        this.distanceTraveled = 0;

        this.collisionRayMax = 500;
        this.collisionRayView = 0.6; //How much the car can see on the sides, in radians
        this.collisionRayStraight = 0;
        this.collisionRayLeft = 0;
        this.collisionRayRight = 0;

        this.color = getRandomColor();

    }

    update = () => {
        if (this.alive) {
            this.x += this.xVel
            this.y += this.yVel
            this.distanceTraveled+=Math.abs(this.xVel)+Math.abs(this.yVel)
            this.xVel *= this.drag
            this.yVel *= this.drag
            this.angle += this.angularVelocity
            this.angularVelocity *= this.angularDrag
            this.alive=!this.hasCrashed();
            this.updateVisitedTracks();
            this.updateCollisionRays();
            this.aliveTime++;
        }
    }

    updateCollisionRay = (theta) => {
        let dist = 0;
        for (let r=0;r<this.collisionRayMax;r++) {
            const x = this.x + r * Math.cos(theta);
            const y = this.y + r * Math.sin(theta);

            if (!this.world.collisionCheck(x,y,0)) break;
            dist++;
        }
        return dist;
    }

    updateCollisionRays = () => {
        this.collisionRayStraight = this.updateCollisionRay(this.angle-Math.PI/2)
        this.collisionRayLeft = this.updateCollisionRay(this.angle-Math.PI/2 - this.collisionRayView)
        this.collisionRayRight = this.updateCollisionRay(this.angle-Math.PI/2 + this.collisionRayView)
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

    hasCrashed = () => {
        if (this.getX()>this.world.getWidth()) return true;
        if (this.getY()>this.world.getHeight()) return true;
        if (this.getX()<0) return true;
        if (this.getY()<0) return true;
        if (this.world.getTracks().filter(t => this.trackCollishion(t)).length === 0) return true;
        return false;
    }

    trackCollishion = (track) => {
        const carCollisionRadius = 0;
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
    getDistanceTraveled = () => this.distanceTraveled;
    getIsStuck = () => this.aliveTime>400 && this.getVisitedTracks().length<=3;

    getCollisionRayMax = () => this.collisionRayMax;
    getCollisionRayView = () => this.collisionRayView;
    getCollisionRayStraight = () => this.collisionRayStraight;
    getCollisionRayLeft = () => this.collisionRayLeft;
    getCollisionRayRight = () => this.collisionRayRight;

}
