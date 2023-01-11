function Color(r, g, b) {
    this.r = r; 
    this.g = g; 
    this.b = b; 
}

Color.prototype.rgb = function() {
    return `rgb(${this.r},${this.g},${this.b})`;
}

Color.prototype.hex = function() {

}

Color.prototype.rgba = function(a) {

}

const red = new Color(255, 0, 0); 
console.log(red.rgb()); 