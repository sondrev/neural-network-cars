var synaptic = require('synaptic');

export default class Ai {
    constructor(id,car) {
        this.id=id;
        this.car=car;
        this.network = new synaptic.Architect.Perceptron(3, 3,3, 3);

        this.input = undefined;
        this.output = undefined;
    }

    setAiFromJSON = (json) => {
        this.network = synaptic.Network.fromJSON(json);
    }

    reset = (newCar) => {
        this.car=newCar;
    }

    update = () => {

        if (this.car.getIsAlive()) {
            this.input = [
                this.car.getCollisionRayLeft()/this.car.getCollisionRayMax(),
                this.car.getCollisionRayStraight()/this.car.getCollisionRayMax(),
                this.car.getCollisionRayRight()/this.car.getCollisionRayMax(),
            ];
            this.output = this.network.activate(this.input);

            const outputTurnR = this.output[0];  
            const outputTurnL = this.output[1];     
            const outputAccelerate = this.output[2];    
            this.car.accelerate(outputAccelerate);

            if (outputTurnR>0.52) this.car.turn(1);
            if (outputTurnL>0.52) this.car.turn(0);
            //if (outputTurn<0.48) this.car.turn(0);         
    
            this.car.update();
        };
    }

    getNetwork = () => this.network;
    getInputs = () => this.input;
    getOutputs = () => this.output;
    //getFitness = () => 100*(this.car.getVisitedTracks().length-2)/1;
    getFitness = () => this.car.getIsStuck() ? 0 : this.car.getDistanceTraveled();



    getId= () => this.id;
    getCar = () => this.car
}
