export default class InputManager {
    constructor() {
        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);
        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }

    keyDownHandler = (event) => {
        if(event.keyCode == 39) {
            this.rightPressed = true;
        }
        else if(event.keyCode == 37) {
            this.leftPressed = true;
        }
        if(event.keyCode == 40) {
            this.downPressed = true;
        }
        else if(event.keyCode == 38) {
            this.upPressed = true;
        }
      }
      
      keyUpHandler = (event) => {
        if(event.keyCode == 39) {
            this.rightPressed = false;
        }
        else if(event.keyCode == 37) {
            this.leftPressed = false;
        }
        if(event.keyCode == 40) {
            this.downPressed = false;
        }
        else if(event.keyCode == 38) {
            this.upPressed = false;
        }
      }

      isUpPressed = () => this.upPressed;
      isDownPressed = () => this.downPressed;
      isLeftPressed = () => this.leftPressed;
      isRightPressed = () => this.rightPressed;
}
