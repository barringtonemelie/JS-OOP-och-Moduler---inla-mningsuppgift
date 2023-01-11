function Color(r, g, b) {
    this.r = r; 
    this.g = g; 
    this.b = b; 
}

Color.prototype.rgb = function() {
    return `rgb(${this.r},${this.g},${this.b})`;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
Color.prototype.hex = function() {
    return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
}



Color.prototype.rgba = function(a) {
    return `rgb(${this.r},${this.g},${this.b},${a})`;
}

const red = new Color(255, 0, 0); 
console.log(red.rgb());
console.log(red.hex());  
console.log(red.rgba(0.5)); 