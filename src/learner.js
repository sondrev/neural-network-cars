import Ai from './ai.js';
import Car from './car.js';

const POPULATION_SIZE = 10;

export default class Learner {
    constructor(world) {
        this.generation = 0;
        this.world = world;
    }

    mutateKeys(data, key, probability, amount){
        for (var k = 0; k < data.length; k++) {
            if (Math.random() < probability) data[k][key] += data[k][key] * amount *(Math.random() - 0.5) * 3 + (Math.random() - 0.5);
        }
    }

    mutateAi(ai,probability=0.2,amount=0.2) {
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
        console.log("Gen "+this.generation+". All dead. "+topAis[0].getId()+" is the best AI with score of "+topAis[0].getFitness())
  
        const best =topAis[0].getNetwork().toJSON();
        const secondBest =topAis[1].getNetwork().toJSON();

        console.log(best);

        ai.forEach(a => a.reset(this.world.generateCar()))
        ai[0].setAiFromJSON(best)
        ai[5].setAiFromJSON(this.mutateAi(best))
        ai[5].setAiFromJSON(this.mutateAi(best))
        ai[5].setAiFromJSON(this.mutateAi(best))
        ai[5].setAiFromJSON(this.mutateAi(best))
        ai[5].setAiFromJSON(this.mutateAi(best))
        ai[6].setAiFromJSON(this.mutateAi(best))
        ai[7].setAiFromJSON(this.mutateAi(best))
        ai[8].setAiFromJSON(this.mutateAi(best))
        ai[9].setAiFromJSON(this.mutateAi(best))

        this.generation++;
    }


}
