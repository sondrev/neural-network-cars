import CanvasManager from './canvasManager.js'
import World from './world.js'
import Learner from './learner.js'
import TrackBuilder from './trackBuilder.js';

const freezeTime = 20;

function component() {

  const world = new World();
  const canvasManager = new CanvasManager(world);
  const learner = new Learner(world);
  let ai = learner.generateInitialGeneration(world);
  const trackBuilder = new TrackBuilder();
  trackBuilder.buildTracks(world);

  let delay=freezeTime;

  function update() {

    if (ai.map(a => a.getCar()).every(car => !car.getIsAlive() || car.getIsStuck())) {
      delay--;
      if (delay === 0) {
        delay=freezeTime;
        learner.newGeneration(ai);
      }
      
    } else {
      ai.forEach(a => a.update())
    }
  }



  function draw() {
    canvasManager.draw(ai.map(a=>a.getCar()),ai,world.getTracks());
  }

  function loop() {
    update()
    draw()
    window.requestAnimationFrame(loop)
  }
  
  window.requestAnimationFrame(loop)
  let wrapper = document.createElement('div');
  wrapper.appendChild(canvasManager.getHtml());
  return wrapper;


}



document.body.appendChild(component());