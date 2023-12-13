const x = 300;
const y = 300;
let d = 200;
let width = d;
let height = d;
let cx = x + width / 2;
let cy = y + height / 2;
let rotate = 0;


function rotatePoint(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    newX = cos * (x - cx) + sin * (y - cy) + cx,
    newY = cos * (y - cy) - sin * (x - cx) + cy;
  return { newX, newY };
}

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


function calculateSquareDiagonal(width, height) {
  const diagonalSquared = Math.pow(width, 2) + Math.pow(height, 2);
  const diagonal = Math.sqrt(diagonalSquared);
  return diagonal;
}


const rect1 = document.querySelector("#rect1");
const origin1 = document.querySelector("#origin1");
const orbit1 = document.querySelector("#orbit1");
const line1 = document.querySelector("#line1");

const rect2 = document.querySelector("#rect2");
const origin2 = document.querySelector("#origin2");
const orbit2 = document.querySelector("#orbit2");

const rect3 = document.querySelector("#rect3");
const origin3 = document.querySelector("#origin3");
const orbit3 = document.querySelector("#orbit3");

const rect4 = document.querySelector("#rect4");
const origin4 = document.querySelector("#origin4");
const orbit4 = document.querySelector("#orbit4");


// svg = document.querySelector("svg");
// let pt = svg.createSVGPoint();
// console.log(pt);
// var rotatedPoint = pt.matrixTransform(
//   rect1.getScreenCTM().inverse()
// );

// console.log(rotatedPoint)


rect1.setAttribute("x", x);
rect1.setAttribute("y", y);
rect1.setAttribute("width", width);
rect1.setAttribute("height", height);
rect1.setAttribute("transform-origin", `${cx} ${cy}`);
rect1.setAttribute("transform", `rotate(${rotate})`);

origin1.setAttribute("cx", cx);
origin1.setAttribute("cy", cy);
origin1.setAttribute("r", 5);

orbit1.setAttribute("cx", cx);
orbit1.setAttribute("cy", cy);
orbit1.setAttribute("r", calculateSquareDiagonal(width, height) / 2);


let corners = getRectangleCorners(x, y, width, height);


let pastLeftTopCircle = addSvgCircle(corners.topLeftX, corners.topLeftY, 5, "red");
let pastRighttTopCircle = addSvgCircle(corners.topRightX, corners.topRightY, 5, "green");
let pastLeftBottomCircle = addSvgCircle(corners.bottomLeftX, corners.bottomLeftY, 5, "purple");
let pastRightBottomCircle = addSvgCircle(corners.bottomRightX, corners.bottomRightY, 5, "blue");


let leftTopCircle = addSvgCircle(corners.topLeftX, corners.topLeftY, 5, "red");
let righttTopCircle = addSvgCircle(corners.topRightX, corners.topRightY, 5, "green");
let leftBottomCircle = addSvgCircle(corners.bottomLeftX, corners.bottomLeftY, 5, "purple");
let rightBottomCircle = addSvgCircle(corners.bottomRightX, corners.bottomRightY, 5, "blue");

const { newX: newTopLeftX, newY: newTopLeftY } = rotatePoint(cx, cy, corners.topLeftX, corners.topLeftY, rotate * -1);
const { newX: newTopRightX, newY: newTopRightY } = rotatePoint(cx, cy, corners.topRightX, corners.topRightY, rotate * -1);
const { newX: newBottomLeftX, newY: newBottomLeftY } = rotatePoint(cx, cy, corners.bottomLeftX, corners.bottomLeftY, rotate * -1);
const { newX: newBottomRightX, newY: newBottomRightY } = rotatePoint(cx, cy, corners.bottomRightX, corners.bottomRightY, rotate * -1);

line1.setAttribute("x1", cx);
line1.setAttribute("y1", cy);
line1.setAttribute("x2", newTopLeftX);
line1.setAttribute("y2", newTopLeftY);


leftTopCircle.setAttribute("cx", newTopLeftX);
leftTopCircle.setAttribute("cy", newTopLeftY);

righttTopCircle.setAttribute("cx", newTopRightX);
righttTopCircle.setAttribute("cy", newTopRightY);

leftBottomCircle.setAttribute("cx", newBottomLeftX);
leftBottomCircle.setAttribute("cy", newBottomLeftY);

rightBottomCircle.setAttribute("cx", newBottomRightX);
rightBottomCircle.setAttribute("cy", newBottomRightY);


// let moveMoventX=leftTopCircle.getAttribute("cx")-pastLeftTopCircle.getAttribute("cx");
// let moveMoventY=leftTopCircle.getAttribute("cy")-pastLeftTopCircle.getAttribute("cy");

//rect1.setAttribute("transform", `rotate(${0})`);

// let newRectX=x+moveMoventX;
// let newRectY=y+moveMoventY;

// rect1.setAttribute("x", newRectX);
// rect1.setAttribute("y", newRectY);

// // let newCx = newRectX + width / 2;
// // let newCy = newRectY + height / 2;

// let newCx = pastLeftTopCircle.getAttribute("cx");
// let newCy = pastLeftTopCircle.getAttribute("cy");

// addSvgCircle(newCx, newCy, 5, "orange");

// rect1.setAttribute("transform-origin", `${newCx} ${newCy}`);
// rect1.setAttribute("transform", `rotate(${rotate})`);




