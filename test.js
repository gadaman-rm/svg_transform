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

function rotatePoint(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        newX = cos * (x - cx) + sin * (y - cy) + cx,
        newY = cos * (y - cy) - sin * (x - cx) + cy;
    return { newX, newY };
}

function getRectangleCorners(x, y, width, height) {
    const topLeftX = x;
    const topLeftY = y;

    const topRightX = x + width;
    const topRightY = y;

    const bottomRightX = x + width;
    const bottomRightY = y + height;

    const bottomLeftX = x;
    const bottomLeftY = y + height;

    return {
        topLeftX,
        topLeftY,
        topRightX,
        topRightY,
        bottomRightX,
        bottomRightY,
        bottomLeftX,
        bottomLeftY,
    };
}

let scaleX = 1;
let scaleY = 2;

let x = 200;
let y = 100;

let width = 200;
let height = 200;

let cx = x + width * scaleX / 2;
let cy = y + height * scaleY / 2;

let scaledWidth = width * scaleX;
let scaledHeight = height * scaleY;

let rotateCx = width * scaleX / 2;
let rotateCy = height * scaleY / 2;

let rotate = 30;

const rect = document.querySelector("#rect");
const orbit = document.querySelector("#orbit");
let group = document.querySelector('#group');


let pastLeftTopCircle = addSvgCircle(x, y, 5, "red");

let corners = getRectangleCorners(x, y, scaledWidth, scaledHeight);
const { newX: newTopLeftX, newY: newTopLeftY } = rotatePoint(cx, cy, corners.topLeftX, corners.topLeftY, rotate * -1);
let leftTopCircle = addSvgCircle(newTopLeftX, newTopLeftY, 5, "blue");

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


