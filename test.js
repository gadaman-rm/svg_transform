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


let scaleX = 1;
let scaleY = 1;

let x = 300;
let y = 300;

let width = 200;
let height = 200;

let cx = x + width*scaleX / 2;
let cy = y + height*scaleY / 2;

let scaledWidth=width*scaleX;
let scaledHeight=height*scaleY;

let rotateCx = width*scaleX / 2;
let rotateCy = height*scaleY / 2;

let rotate = 10;

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

group.setAttribute("transform", `translate(${x}, ${y}) scale(${scaleX} ${scaleY})`);
group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scaleX} ${scaleY})`);

let bbox = group.getBBox();
console.log('x:', bbox.x);
console.log('y:', bbox.y);
console.log('width:', bbox.width);
console.log('height:', bbox.height);


