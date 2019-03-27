import CanvasManager from './canvasManager.js'
import World from './world.js'
import Learner from './learner.js'

import Settings from './settings.js';
import InputManager from './inputManager.js'
function component() {

  const settings = new Settings();
  const inputManager = new InputManager(settings);
  const world = new World(settings);
  const learner = new Learner(world);
  const canvasManager = new CanvasManager(world,learner,settings);
  let ai = learner.generateInitialGeneration(world);


  function update() {

    for (let f=0;f<settings.getSpeed();f++) {
      if (settings.processSkip() || ai.map(a => a.getCar()).every(car => !car.getIsAlive() || car.getIsStuck())) {
        world.rebuildTracks();
        learner.newGeneration(ai);
        
      } else {
        ai.forEach(a => a.update())
      }
    }


  }



  function draw() {
    canvasManager.draw(ai,world.getTracks());
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