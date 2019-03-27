import Ai from './ai.js';
import Car from './car.js';

const POPULATION_SIZE = 10;

export default class Learner {
    constructor(world) {
        this.generation = 0;
        this.highestFitness = 0;
        this.world = world;
    }

    mutateKeys(data, key, probability, amount){
        for (var k = 0; k < data.length; k++) {
            if (Math.random() < probability) data[k][key] += data[k][key] * amount *(Math.random() - 0.5) * 3 + (Math.random() - 0.5);
            //if (Math.random() < probability) data[k][key] += -0.4+0.8*Math.random();
        }
    }

    mutateAi(ai,probability=0.2,amount=1) {
        let newAi = JSON.parse(JSON.stringify(ai));
        this.mutateKeys(newAi.neurons, 'bias', probability,amount);
        this.mutateKeys(newAi.connections, 'weight', probability,amount);
        return newAi;
      }

    crossoverAi(parentA,parentB) {
        let child=JSON.parse(JSON.stringify(parentA));


        for (var k = 0; k < child.neurons.length; k++) {
            if (Math.random() < 0.5) {
                child.neurons[k]['bias'] = parentB.neurons[k]['bias']
                }
        }

        for (var k = 0; k < child.neurons.length; k++) {
            if (Math.random() < 0.5) {
                child.connections[k]['weight'] = parentB.connections[k]['weight']
                }
        }

        return child;

    }
    
    generateInitialGeneration = () => {
        return Array.apply(null, {length: POPULATION_SIZE}).map((i,index) => new Ai(index,this.world.generateCar()))
    }

    newGeneration = (ai) => {
        const topAis = [ ...ai].sort((a1,a2) => (a2.getFitness()-a1.getFitness()));
        const bestAi =topAis[0];
        const bestNetwork = bestAi.getNetwork().toJSON();

        if (bestAi.getFitness()>this.highestFitness) {
            this.highestFitness = bestAi.getFitness();
            console.log("----RECORD----");
            console.log("Generation "+this.generation+". AI "+bestAi.getId()+" is the best AI with score of "+bestAi.getFitness())
            console.log(bestNetwork)
            console.log("-------------");
        } else {
            console.log("Gen "+this.generation+". "+bestAi.getId()+" is the best AI with score of "+bestAi.getFitness())
        }

        
  
        
        const secondBest =topAis[1].getNetwork().toJSON();

        ai.forEach(a => a.reset(this.world.generateCar()))
        ai[0].setAiFromJSON(bestNetwork)
        ai[1].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[2].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[3].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[4].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[5].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[6].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[7].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[8].setAiFromJSON(this.mutateAi(bestNetwork))
        ai[9].setAiFromJSON(this.mutateAi(bestNetwork))

        this.generation++;
    }

    getGeneration() {
        return this.generation;
    }


}
