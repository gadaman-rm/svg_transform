// Get the group element by its ID
//var group = document.getElementById('group');

// Get the bounding box of the group


//group.setAttribute("transform", 'translate(0, 0) rotate(45, 100, 100) scale(1)');
//group.setAttribute("transform", 'translate(-100, -100) scale(2)');
//group.setAttribute("transform", 'translate(0, 0) scale(1)');
//group.setAttribute("transform", 'translate(-100, -100) scale(2) rotate(10, 150, 150)');

// var bbox = group.getBBox();
// console.log('x:', bbox.x);
// console.log('y:', bbox.y);
// console.log('width:', bbox.width);
// console.log('height:', bbox.height);


function addSvgCircle(x, y, radius, color) {
    const svgElement = document.getElementById("container");
    const svgNS = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(svgNS, "circle");

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    circle.setAttribute("stroke", "none");
    circle.setAttribute("stroke-width", 2);

    svgElement.appendChild(circle);

    return circle;
}

function calculateSquareDiagonal(width, height) {
    const diagonalSquared = Math.pow(width, 2) + Math.pow(height, 2);
    const diagonal = Math.sqrt(diagonalSquared);
    return diagonal;
}


let scale = 1;

let x = 200;
let y = 200;

let width = 200;
let height = 200;

let cx = x + width*scale / 2;
let cy = y + height*scale / 2;

let scaledWidth=width*scale;
let scaledHeight=height*scale;

let rotateCx = width*scale / 2;
let rotateCy = height*scale / 2;

let rotate = 30;


const rect = document.querySelector("#rect");
const orbit = document.querySelector("#orbit");
let group = document.querySelector('#group');

let leftTopCircle = addSvgCircle(x, y, 5, "red");
let origin = addSvgCircle(cx, cy, 5, "orange");

rect.setAttribute("x", 0);
rect.setAttribute("y", 0);
rect.setAttribute("width", width);
rect.setAttribute("height", height);

orbit.setAttribute("cx", cx);
orbit.setAttribute("cy", cy);
orbit.setAttribute("r", calculateSquareDiagonal(scaledWidth, scaledHeight) / 2);


group.setAttribute("transform", `translate(${x}, ${y}) scale(${scale})`);
group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scale})`);


let bbox = group.getBBox();
console.log('x:', bbox.x);
console.log('y:', bbox.y);
console.log('width:', bbox.width);
console.log('height:', bbox.height);


