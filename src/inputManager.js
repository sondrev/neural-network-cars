const keyCodeSapce = 32;

const keyCodeMinusNumpad = 109;
const keyCodePlussNumpad = 107;
const keyCodeMinus = 189;
const keyCodePluss = 187;

const keyCode1 = 49;
const keyCode1Numpad = 97;
const keyCode2 = 50;
const keyCode2Numpad = 98;
const keyCode3 = 51;
const keyCode3Numpad = 99;
const keyCode4 = 52;
const keyCode4Numpad = 100;


export default class InputManager {
    constructor(settings) {
        this.settings=settings;
        document.addEventListener('keydown', this.keyDownHandler, false);
    }

    keyDownHandler = (event) => {
        if(event.keyCode == keyCodeSapce) {
            this.settings.skipGeneration();
        }

        if(event.keyCode == keyCodePlussNumpad || event.keyCode == keyCodePluss) {
            this.settings.increaseSpeed();
        }
        if(event.keyCode == keyCodeMinusNumpad || event.keyCode == keyCodeMinus) {
            this.settings.decreaseSpeed();
        }

        if(event.keyCode == keyCode1Numpad || event.keyCode == keyCode1) {
            this.settings.setNextMap(1);
        }
        if(event.keyCode == keyCode2Numpad || event.keyCode == keyCode2) {
            this.settings.setNextMap(2);
        }
        if(event.keyCode == keyCode3Numpad || event.keyCode == keyCode3) {
            this.settings.setNextMap(3);
        }
        if(event.keyCode == keyCode4Numpad || event.keyCode == keyCode4) {
            this.settings.setNextMap(4);
        }

      }
}