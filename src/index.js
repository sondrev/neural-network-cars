import CanvasManager from './canvasManager.js'
import InputManager from './inputManager.js'
import World from './world.js'
import Car from './car.js';
import Track from './track.js';
import TrackType from './trackType.js';
import TrackBuilder from './trackBuilder.js';
import Ai from './ai.js';


const POPULATION_SIZE = 10;



function component() {





  let world = new World();
  let canvasManager = new CanvasManager(world);
  let inputManager = new InputManager();



  let humanCar = new Car(world, 0, 0);
  let ai = Array.apply(null, {length: POPULATION_SIZE}).map((i,index) => new Ai(index,new Car(world,100, 450,Math.PI * 2)));

  const trackBuilder = new TrackBuilder();
  trackBuilder.buildTracks(world);




  //var myNetwork = new synaptic.Architect.Perceptron(2, 3, 1);
  //var learningRate = .2;



  function update(progress) {

    if (ai.map(a => a.getCar()).every(car => !car.getIsAlive() || car.getIsStuck())) {
      const topAis = [ ...ai].sort((a1,a2) => (a2.getFitness()-a1.getFitness()));
      console.log("All dead. "+topAis[0].getId()+" is the best AI with score of "+topAis[0].getFitness())

      const best =topAis[0].getNetwork().toJSON();
      const secondBest =topAis[1].getNetwork().toJSON();
      //const bestMutated = topAis[0].getNetwork().toJSON();

      ai.forEach(a => a.reset(new Car(world,100, 450,Math.PI * 2)))
      ai[0].setAiFromJSON(best)
      ai[1].setAiFromJSON(mutateAi(best))
      ai[2].setAiFromJSON(mutateAi(best))
      ai[3].setAiFromJSON(mutateAi(best))
      ai[4].setAiFromJSON(mutateAi(best))
      ai[5].setAiFromJSON(mutateAi(best))
      ai[6].setAiFromJSON(mutateAi(secondBest))
      ai[7].setAiFromJSON(mutateAi(secondBest))
      ai[8].setAiFromJSON(mutateAi(secondBest))
      ai[9].setAiFromJSON(mutateAi(secondBest))
    } else {
      ai.forEach(a => a.update())

      humanCar.update();
      if (inputManager.isUpPressed()) humanCar.accelerate(1);
      if (inputManager.isLeftPressed()) humanCar.turnLeft();
      if (inputManager.isRightPressed()) humanCar.turnRight();
    }

    //console.log(myNetwork.activate([2,1]))
    //myNetwork.propagate(learningRate, [1]);
  }

  function mutateAi(ai) {
    const mutationProb=0.5;
    let newAi = ai;
    mutateDataKeys(newAi.neurons, 'bias', mutationProb);
    mutateDataKeys(newAi.connections, 'weight', mutationProb);
    return newAi;
  }

   function mutateDataKeys(a, key, mutationRate){
    for (var k = 0; k < a.length; k++) {
        // Should mutate?
        if (Math.random() > mutationRate) {
            continue;
        }

        a[k][key] += a[k][key] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
    }
}

  function draw() {
    canvasManager.draw(getAllCars(),ai,world.getTracks());
  }

  function loop(timestamp) {
    var progress = timestamp - lastRender

    update(progress)
    draw()

    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }
  var lastRender = 0

  let wrapper = document.createElement('div');
  window.requestAnimationFrame(loop)
  wrapper.appendChild(canvasManager.getHtml());
  return wrapper;

  function getAllCars() {return [...[humanCar],...ai.map(a=>a.getCar())];}
}



document.body.appendChild(component());