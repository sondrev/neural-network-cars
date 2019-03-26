var synaptic = require('synaptic');

export default class Ai {
    constructor(id,car) {
        this.id=id;
        this.car=car;
        this.network = new synaptic.Architect.Perceptron(4, 5, 2);
        this.learningRate = 0.2;

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
                this.car.getSpeed()/3.0,
                this.car.getCollisionRayLeft()/500,
                this.car.getCollisionRayStraight()/500
                ,this.car.getCollisionRayRight()/500
            ];
            this.output = this.network.activate(this.input);

            const outputAccelerate = this.output[0]; 
            const outputTurn = this.output[1];
    
            this.car.accelerate(outputAccelerate);
            this.car.turn(outputTurn);
    
            this.car.update();
        };
    }

    getNetwork = () => this.network;
    getInputs = () => this.input;
    getOutputs = () => this.output;
    //getFitness = () => 100*(this.car.getVisitedTracks().length-2)/1;
    getFitness = () => this.car.getDistanceTraveled();



    getId= () => this.id;
    getCar = () => this.car
}
