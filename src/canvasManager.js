export default class CanvasManager {
    constructor(world,learner,settings) {
        this.learner=learner;
        this.settings=settings;

        this.worldWidth = world.getWidth();
        this.worldHeight = world.getHeight();
        this.canvas = document.createElement('CANVAS');
        this.canvas.width = this.worldWidth + 200;
        this.canvas.height = this.worldHeight;
        this.ctx = this.canvas.getContext("2d");

        this.imgTrackStraight = new Image() 
        this.imgTrackStraight.src = "trackStraight.png" 

        this.imgTrackCurved = new Image() 
        this.imgTrackCurved.src = "trackStraight.png" 
    }



    getHtml() {
        return this.canvas;
    }

    drawNeuralNetwork(network,x,y) {
        //console.log(network)
    }

    drawInformationPanel(AIs,x,y) {

        y+=50;

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText("Gen "+this.learner.getGeneration()+" - Speed "+this.settings.getSpeed()+"x" , x-4, y);
        y+=50;

        AIs.forEach(ai => {
            const carW=30;
            const carL=50
            const car = ai.getCar();
            this.ctx.beginPath();
            this.ctx.fillStyle = car.getColor();
            this.ctx.fillRect(x -carW/2,y -carL/2, carW,carL);


            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(ai.getId() , x-4, y);

            this.ctx.font = "12px Arial";

            ai.getInputs().forEach((input,index) => {
                this.ctx.fillText(new String(input).substring(0,5) , x+30, y+index*15);
            })

            ai.getOutputs().forEach((output,index) => {
                this.ctx.fillText(new String(output).substring(0,5) , x+70, y+index*15);
            })

            this.ctx.fillText(ai.getFitness() , x+120, y);
            y+=80;

            this.drawNeuralNetwork(ai.getNetwork().toJSON(),x+130,y)

            
        })
    }

    draw(AIs,tracks) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fill();

        this.ctx.clearRect(0, 0, this.worldWidth, this.worldHeight);
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.worldWidth, this.worldHeight);
        this.ctx.fillStyle = "green";
        this.ctx.fill();


        this.ctx.strokeStyle = "black";
        tracks.forEach(track => {
            const x = track.getX();
            const y = track.getY();

            this.ctx.save();
            this.ctx.translate(x,y);
            this.ctx.rotate(track.getRotation());
            this.ctx.drawImage(track.getTrackType().getImage(),-track.getTrackType().getWidth()/2,-track.getTrackType().getHeight()/2);
            this.ctx.restore();

        });
        
        //car



        const drawWheel = function(ctx,x,y) {
            ctx.beginPath();
            ctx.fillStyle = "black"
            ctx.fillRect(x-5, y-5,10,10);
        }

        const drawCollisionDraw = function(ctx,x,y,theta,r) {
            ctx.moveTo(x,y);
            ctx.lineTo(x + r * Math.cos(theta), y + r * Math.sin(theta));
            ctx.stroke();
        }
        

        AIs.forEach(ai=> {

            const car = ai.getCar();

            drawCollisionDraw(this.ctx,car.getX(),car.getY(),car.getAngle()-Math.PI/2,car.getCollisionRayStraight())
            drawCollisionDraw(this.ctx,car.getX(),car.getY(),car.getAngle()-Math.PI/2 -car.getCollisionRayView(),car.getCollisionRayLeft())
            drawCollisionDraw(this.ctx,car.getX(),car.getY(),car.getAngle()-Math.PI/2 +car.getCollisionRayView(),car.getCollisionRayRight())

            

            
            this.ctx.save();
            this.ctx.translate(car.getX(),car.getY());
            this.ctx.rotate(car.getAngle());

            const carW=30;
            const carL=50

            drawWheel(this.ctx,-carW/2,-15)
            drawWheel(this.ctx,-carW/2,15)
            drawWheel(this.ctx,carW/2,-15)
            drawWheel(this.ctx,carW/2,15)

            this.ctx.beginPath();
            this.ctx.fillStyle = car.getColor();
            this.ctx.fillRect(-carW/2,-carL/2, carW,carL);

            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(ai.getId() , -4, 0);


            this.ctx.restore();


        })

        this.drawInformationPanel(AIs,this.worldWidth+ 20,0);



    }
}
