export default class TrackType {
    constructor(imageUrl, width, height) {

        this.width=width;
        this.height=height;

        this.image = new Image() 
        this.image.src = imageUrl; 
    }

    getImage = () => this.image;
    getWidth = () => this.width;
    getHeight = () => this.height;
}
