let x = 200;
let y = 200;
let width = 200;
let height = 200;
let cx = x + width / 2;
let cy = y + height / 2;
let rotate = 0;

let pastX=x;
let pastY=y;
let pastWidth=width;
let pastHeight=height;
let pastCx=pastX + pastWidth / 2;
let pastCy=pastY + pastHeight / 2;
let pastRotate=rotate;


function changeProperty(newProperty)
{
  pastX=x;
  pastY=y;
  pastWidth=width;
  pastHeight=height;
  pastCx=pastX + pastWidth / 2;
  pastCy=pastY + pastHeight / 2;
  pastRotate=rotate;

  x=newProperty.x;
  y=newProperty.y;
  width=newProperty.width;
  height=newProperty.height;
  cx = x + width / 2;
  cy = y + height / 2;
  rotate=newProperty.rotate;
}

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

function redrawHelpers() {
  let corners = getRectangleCorners(x, y, width, height);

  const { newX: newTopLeftX, newY: newTopLeftY } = rotatePoint( cx, cy, corners.topLeftX, corners.topLeftY, rotate * -1 );
  const { newX: newTopRightX, newY: newTopRightY } = rotatePoint( cx, cy, corners.topRightX, corners.topRightY, rotate * -1 );
  const { newX: newBottomLeftX, newY: newBottomLeftY } = rotatePoint( cx, cy, corners.bottomLeftX, corners.bottomLeftY, rotate * -1 );
  const { newX: newBottomRightX, newY: newBottomRightY } = rotatePoint( cx, cy, corners.bottomRightX, corners.bottomRightY, rotate * -1 );

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

  pastLeftTopCircle.setAttribute("cx", corners.topLeftX);
  pastLeftTopCircle.setAttribute("cy", corners.topLeftY);

  pastRighttTopCircle.setAttribute("cx", corners.topRightX);
  pastRighttTopCircle.setAttribute("cy", corners.topRightY);

  pastLeftBottomCircle.setAttribute("cx", corners.bottomLeftX);
  pastLeftBottomCircle.setAttribute("cy", corners.bottomLeftY);

  pastRightBottomCircle.setAttribute("cx", corners.bottomRightX);
  pastRightBottomCircle.setAttribute("cy", corners.bottomRightY);

  origin1.setAttribute("cx", cx);
  origin1.setAttribute("cy", cy);
  origin1.setAttribute("r", 5);

  orbit1.setAttribute("cx", cx);
  orbit1.setAttribute("cy", cy);
  orbit1.setAttribute("r", calculateSquareDiagonal(width, height) / 2);
}

function moveShape()
{
  cx = x + width / 2;
  cy = y + height / 2;

  rect1.setAttribute("x", x);
  rect1.setAttribute("y", y);

  rect1.setAttribute("transform-origin", `${cx} ${cy}`);

  redrawHelpers();

}

function rotateShape() {
  cx = x + width / 2;
  cy = y + height / 2;

  rect1.setAttribute("transform-origin", `${cx} ${cy}`);
  rect1.setAttribute("transform", `rotate(${rotate})`);

  redrawHelpers();
}

function makeNewSize() {
  let corners = getRectangleCorners(x, y, pastWidth, pastHeight);
  const { newX: pastTopLeftX, newY: pastTopLeftY } = rotatePoint( pastCx, pastCy, corners.topLeftX, corners.topLeftY, rotate * -1 );
  console.log(`pastX-x= ${pastTopLeftX-x}`);
  console.log(`pastY-y= ${pastTopLeftY-y}`);
  addSvgCircle(pastTopLeftX, pastTopLeftY, 5, "green");

  rect1.setAttribute("width", width);
  rect1.setAttribute("height", height);

  rect1.setAttribute("transform-origin", `${cx} ${cy}`);
  redrawHelpers();
}

const rect1 = document.querySelector("#rect1");
const origin1 = document.querySelector("#origin1");
const orbit1 = document.querySelector("#orbit1");
const line1 = document.querySelector("#line1");

rect1.setAttribute("x", x);
rect1.setAttribute("y", y);
rect1.setAttribute("width", width);
rect1.setAttribute("height", height);

origin1.setAttribute("cx", cx);
origin1.setAttribute("cy", cy);
origin1.setAttribute("r", 5);

orbit1.setAttribute("cx", cx);
orbit1.setAttribute("cy", cy);
orbit1.setAttribute("r", calculateSquareDiagonal(width, height) / 2);

let corners = getRectangleCorners(x, y, width, height);

let pastLeftTopCircle = addSvgCircle( corners.topLeftX, corners.topLeftY, 5, "red" ); 
let pastRighttTopCircle = addSvgCircle( corners.topRightX, corners.topRightY, 5, "green" ); 
let pastLeftBottomCircle = addSvgCircle( corners.bottomLeftX, corners.bottomLeftY, 5, "purple" ); 
let pastRightBottomCircle = addSvgCircle( corners.bottomRightX, corners.bottomRightY, 5, "blue" ); 

let leftTopCircle = addSvgCircle(corners.topLeftX, corners.topLeftY, 5, "red"); 
let righttTopCircle = addSvgCircle( corners.topRightX, corners.topRightY, 5, "green" ); 
let leftBottomCircle = addSvgCircle( corners.bottomLeftX, corners.bottomLeftY, 5, "purple" ); 
let rightBottomCircle = addSvgCircle( corners.bottomRightX, corners.bottomRightY, 5, "blue" );

line1.setAttribute("x1", cx);
line1.setAttribute("y1", cy);
line1.setAttribute("x2", corners.topLeftX);
line1.setAttribute("y2", corners.topLeftY);


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

// rotate = 20;
// rotateShape(rotate);

// let d=400;
// width = d;
// height = d;
// cx = x + width / 2;
// cy = y + height / 2;

// setTimeout(() => {
//   makeNewSize();
// }, 2000);


// setTimeout(() => {
//   rotate = 30;
//   rotateShape();
// }, 4000);


// setTimeout(() => {
//   rotate = 45;
//   rotateShape();
// }, 6000);

// setTimeout(() => {
//   x=300;
//   y=300;
//   moveShape();
// }, 2000);

setTimeout(() => {
  let newProperty={x:x,y:y,width:width,height:height,rotate:10};
  changeProperty(newProperty);
  rotateShape();
}, 2000);

// setTimeout(() => {
//   x=200;
//   y=200;
//   moveShape();
// }, 6000);

setTimeout(() => {
  let newProperty={x:x,y:y,width:width*2,height:height*2,rotate:10};
  changeProperty(newProperty);
  makeNewSize();
}, 4000);