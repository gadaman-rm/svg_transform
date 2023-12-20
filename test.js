function changeProperty(newProperty)
{
    pastX = x;
    pastY = y;
    
    pastScaleX = scaleX;
    pastScaleY = scaleY;
    
    pastCx = pastX + pastWidth * pastScaleX / 2;
    pastCy = pastY + pastHeight * pastScaleY / 2;
    
    pastScaledWidth = pastWidth * pastScaleX;
    pastScaledHeight = pastHeight * pastScaleY;
    
    pastRotateCx = pastWidth * pastScaleX / 2;
    pastRotateCy = pastHeight * pastScaleY / 2;
    
    pastRotate = rotate;


    x = newProperty.x;
    y = newProperty.y;

    scaleX = newProperty.scaleX;
    scaleY = newProperty.scaleY;

    cx = x + width * scaleX / 2;
    cy = y + height * scaleY / 2;

    scaledWidth = width * scaleX;
    scaledHeight = height * scaleY;

    rotateCx = width * scaleX / 2;
    rotateCy = height * scaleY / 2;

    rotate = newProperty.rotate;
}

function addSvgCircle(x, y, radius, color) {
    const svgNS = "http://www.w3.org/2000/svg";
    const circle = document.createElementNS(svgNS, "circle");

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", color);
    circle.setAttribute("stroke", "none");
    circle.setAttribute("stroke-width", 2);

    containerSvg.appendChild(circle);

    return circle;
}

function addSvgLine(startX,startY,endX,endY)
{
    const svgNS = "http://www.w3.org/2000/svg";
    const line = document.createElementNS(svgNS, "line");

    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);
    line.setAttribute("stroke","red");
    line.setAttribute("stroke-dasharray","5,5");
    
    containerSvg.appendChild(line);

    return line;
}

function redrawHelpers() {
    let corners = getRectangleCorners(x, y, scaledWidth, scaledHeight);
  
    const { newX: newTopLeftX, newY: newTopLeftY } = rotatePoint( cx, cy, corners.topLeftX, corners.topLeftY, rotate * -1 );
    const { newX: newTopRightX, newY: newTopRightY } = rotatePoint( cx, cy, corners.topRightX, corners.topRightY, rotate * -1 );
    const { newX: newBottomLeftX, newY: newBottomLeftY } = rotatePoint( cx, cy, corners.bottomLeftX, corners.bottomLeftY, rotate * -1 );
    const { newX: newBottomRightX, newY: newBottomRightY } = rotatePoint( cx, cy, corners.bottomRightX, corners.bottomRightY, rotate * -1 );
  
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", newTopLeftX);
    line.setAttribute("y2", newTopLeftY);
  
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
  
    origin.setAttribute("cx", cx);
    origin.setAttribute("cy", cy);
  

    orbit.setAttribute("cx", cx);
    orbit.setAttribute("cy", cy);
    orbit.setAttribute("r", calculateSquareDiagonal(scaledWidth, scaledHeight) / 2);
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

function moveShape()
{
  group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scaleX} ${scaleY})`);
  redrawHelpers();
}

function rotateShape() {  
    group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scaleX} ${scaleY})`);
    redrawHelpers();
}

function makeNewSize() {
    let pastCorners = getRectangleCorners(x, y, pastWidth, pastHeight);
    const { newX: pastTopLeftX, newY: pastTopLeftY } = rotatePoint( pastCx, pastCy, pastCorners.topLeftX, pastCorners.topLeftY, rotate * -1 );
    // console.log(`pastX-x= ${pastTopLeftX-x}`);
    // console.log(`pastY-y= ${pastTopLeftY-y}`);
    // addSvgCircle(pastTopLeftX, pastTopLeftY, 5, "green");
  
    let newCorners = getRectangleCorners(x, y, width, height);
    const { newX: newTopLeftX, newY: newTopLeftY } = rotatePoint( cx, cy, newCorners.topLeftX, newCorners.topLeftY, rotate * -1 );
    // console.log(`newX-x= ${newTopLeftX-x}`);
    // console.log(`newY-y= ${newTopLeftY-y}`);
    // addSvgCircle(newTopLeftX, newTopLeftY, 5, "blue");
  
    chageOnResizeX=newTopLeftX-pastTopLeftX;
    chageOnResizeY=newTopLeftY-pastTopLeftY;
  
    console.log(`chageOnResizeX= ${chageOnResizeX}`);
    console.log(`chageOnResizeY= ${chageOnResizeY}`);
  
    group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scaleX} ${scaleY})`);

    redrawHelpers();
}


let x = 0;
let y = 0;

let width = 200;
let height = 200;

let scaleX = 1;
let scaleY = 1;

let cx = x + width * scaleX / 2;
let cy = y + height * scaleY / 2;

let scaledWidth = width * scaleX;
let scaledHeight = height * scaleY;

let rotateCx = width * scaleX / 2;
let rotateCy = height * scaleY / 2;

let rotate = 0;



let pastX = x;
let pastY = y;

let pastWidth = width;
let pastHeight = height;

let pastScaleX = scaleX;
let pastScaleY = scaleY;

let pastCx = pastX + pastWidth * pastScaleX / 2;
let pastCy = pastY + pastHeight * pastScaleY / 2;

let pastScaledWidth = pastWidth * pastScaleX;
let pastScaledHeight = pastHeight * pastScaleY;

let pastRotateCx = pastWidth * pastScaleX / 2;
let pastRotateCy = pastHeight * pastScaleY / 2;

let pastRotate = rotate;


let containerSvg = document.getElementById("container");
let rect = document.querySelector("#rect");
let orbit = document.querySelector("#orbit");
let group = document.querySelector('#group');


let corners = getRectangleCorners(x, y, scaledWidth, scaledHeight);

let pastLeftTopCircle = addSvgCircle( corners.topLeftX, corners.topLeftY, 5, "red" ); 
let pastRighttTopCircle = addSvgCircle( corners.topRightX, corners.topRightY, 5, "green" ); 
let pastLeftBottomCircle = addSvgCircle( corners.bottomLeftX, corners.bottomLeftY, 5, "purple" ); 
let pastRightBottomCircle = addSvgCircle( corners.bottomRightX, corners.bottomRightY, 5, "blue" ); 

let leftTopCircle = addSvgCircle(corners.topLeftX, corners.topLeftY, 5, "red"); 
let righttTopCircle = addSvgCircle( corners.topRightX, corners.topRightY, 5, "green" ); 
let leftBottomCircle = addSvgCircle( corners.bottomLeftX, corners.bottomLeftY, 5, "purple" ); 
let rightBottomCircle = addSvgCircle( corners.bottomRightX, corners.bottomRightY, 5, "blue" );

let origin = addSvgCircle(cx, cy, 5, "orange");
let line=addSvgLine(cx, cy,corners.topLeftX,corners.topLeftY);

rect.setAttribute("x", 0);
rect.setAttribute("y", 0);
rect.setAttribute("width", width);
rect.setAttribute("height", height);

orbit.setAttribute("cx", cx);
orbit.setAttribute("cy", cy);
orbit.setAttribute("r", calculateSquareDiagonal(scaledWidth, scaledHeight) / 2);

group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scaleX} ${scaleY})`);


// group.setAttribute("transform", `translate(${x}, ${y}) scale(${scaleX} ${scaleY})`);
// group.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotate}, ${rotateCx}, ${rotateCy}) scale(${scaleX} ${scaleY})`);

// redrawHelpers();

// let bbox = group.getBBox();
// console.log('x:', bbox.x);
// console.log('y:', bbox.y);
// console.log('width:', bbox.width);
// console.log('height:', bbox.height);


// setTimeout(() => {
//     let newProperty={x:x+100,y:y,scaleX:scaleX,scaleY:scaleY,rotate:rotate};
//     changeProperty(newProperty);
//     moveShape();
//   }, 2000);

// setTimeout(() => {
//     let newProperty={x:x,y:y,scaleX:scaleX,scaleY:scaleY,rotate:rotate+10};
//     changeProperty(newProperty);
//     rotateShape();
//   }, 4000);

// setTimeout(() => {
//     let newProperty={x:x,y:y,scaleX:scaleX*2,scaleY:scaleY,rotate:rotate};
//     changeProperty(newProperty);
//     makeNewSize();
//     newProperty={x:x-chageOnResizeX,y:y-chageOnResizeY,scaleX:scaleX,scaleY:scaleY,rotate:rotate};
//     changeProperty(newProperty);
//     moveShape();
//   }, 6000);

// setTimeout(() => {
//     let newProperty={x:x,y:y,scaleX:scaleX,scaleY:scaleY,rotate:rotate+10};
//     changeProperty(newProperty);
//     rotateShape();
//   }, 8000);

// setTimeout(() => {
//     let newProperty={x:x,y:y+100,scaleX:scaleX,scaleY:scaleY,rotate:rotate};
//     changeProperty(newProperty);
//     moveShape();
//   }, 10000);

let newProperty={x:x+200,y:y+200,scaleX:scaleX,scaleY:scaleY,rotate:rotate};
changeProperty(newProperty);
moveShape();
rotateShape();
makeNewSize();

