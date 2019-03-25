var synaptic = require('synaptic');

export default class Ai {
    constructor(id,car) {
        this.id=id;
        this.car=car;
        this.network = new synaptic.Architect.Perceptron(2, 3, 2);
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
            this.input = [this.car.getXVel()/3.0,this.car.getYVel()/3.0];
            this.output = this.network.activate(this.input);

            
            
            //this.network.propagate(this.learningRate, [1,1]);
    
            const outputAccelerate = this.output[0]; 
            const outputTurn = this.output[1];
    
            //if (outputAccelerate>0.5) 
            this.car.accelerate(outputAccelerate);
            //if (outputTurn>0.5) this.car.turnRight();
            //if (outputTurn<0.5) this.car.turnLeft();
            this.car.turn(outputTurn);
    
            this.car.update();
            //console.log(output)
        };
    }

    getNetwork = () => this.network;
    getInputs = () => this.input;
    getOutputs = () => this.output;
    getFitness = () => 100*(this.car.getVisitedTracks().length-2)/this.car.getAliveTime();

    getId= () => this.id;
    getCar = () => this.car
}
