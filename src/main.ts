import { svg } from './app'
import { append, attr, elemNS, getElem, query } from './lib/dom'
import { pipe } from './lib/pipe'
import './style.scss'

pipe(getElem("app"), append(svg) as any)

let x = 200
let y = 200
let width = 200
let height = 200
let origin = { x: x + width / 2, y: y + height / 2 }
let rotate = 0

let pastX = x
let pastY = y
let pastWidth = width
let pastHeight = height
let pastOrigin = { x: pastX + pastWidth / 2, y: pastY + pastHeight / 2 }
let pastRotate = rotate

let chageOnResizeX = 0
let chageOnResizeY = 0

const rect1 = query("#rect1") as SVGRectElement
const origin1 = query("#origin1") as SVGCircleElement
const orbit1 = query("#orbit1") as SVGCircleElement
const line1 = query("#line1") as SVGLineElement

function changeProperty(newProperty) {
  pastX = x
  pastY = y
  pastWidth = width
  pastHeight = height
  pastOrigin = { x: pastX + pastWidth / 2, y: pastY + pastHeight / 2 }
  pastRotate = rotate

  x = newProperty.x
  y = newProperty.y
  width = newProperty.width
  height = newProperty.height
  origin = { x: x + width / 2, y: y + height / 2 }
  rotate = newProperty.rotate
}

interface Point {
  x: number
  y: number
}

const rotatePoint = (origin: Point, point: Point, angle: number) => {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    x = cos * (point.x - origin.x) + sin * (point.y - origin.y) + origin.x,
    y = cos * (point.y - origin.y) - sin * (point.x - origin.x) + origin.y
  return { x, y }
}

const addSvgCircle = (x: number, y: number, radius: number, color: string) => {
  const circle = pipe(
    elemNS("http://www.w3.org/2000/svg", "circle"),
    attr("cx")(String(x)),
    attr("cy")(String(y)),
    attr("r")(String(radius)),
    attr("fill")(color),
    attr("stroke")("none"),
    attr("stroke-width")("2"),
  )

  pipe(getElem("container") as any, append(circle))

  return circle
}

const getRectangleCorners = (x: number, y: number, width: number, height: number) => {
  const tl = { x, y }
  const tr = { x: x + width, y }
  const br = { x: x + width, y: y + height }
  const bl = { x: x, y: y + height }
  return { tl, tr, br, bl }
}

const calculateSquareDiagonal = (width: number, height: number) => {
  const diagonalSquared = Math.pow(width, 2) + Math.pow(height, 2)
  const diagonal = Math.sqrt(diagonalSquared)
  return diagonal
}

function redrawHelpers() {
  let corners = getRectangleCorners(x, y, width, height)

  const tlNew = rotatePoint(origin, corners.tl, rotate * -1)
  const trNew = rotatePoint(origin, corners.tr, rotate * -1)
  const blNew = rotatePoint(origin, corners.bl, rotate * -1)
  const brNew = rotatePoint(origin, corners.br, rotate * -1)

  attr("x1")(String(origin.x))(line1)
  attr("y1")(String(origin.y))(line1)
  attr("x2")(String(tlNew.x))(line1)
  attr("y2")(String(tlNew.y))(line1)
  attr("cx")(String(tlNew.x))(leftTopCircle)
  attr("cy")(String(tlNew.y))(leftTopCircle)
  attr("cx")(String(trNew.x))(righttTopCircle)
  attr("cy")(String(trNew.y))(righttTopCircle)
  attr("cx")(String(blNew.x))(leftBottomCircle)
  attr("cy")(String(blNew.y))(leftBottomCircle)
  attr("cx")(String(brNew.x))(rightBottomCircle)
  attr("cy")(String(brNew.y))(rightBottomCircle)

  attr("cx")(String(corners.tl.x))(pastLeftTopCircle)
  attr("cy")(String(corners.tl.y))(pastLeftTopCircle)
  attr("cx")(String(corners.tr.x))(pastRighttTopCircle)
  attr("cy")(String(corners.tr.y))(pastRighttTopCircle)
  attr("cx")(String(corners.bl.x))(pastLeftBottomCircle)
  attr("cy")(String(corners.bl.y))(pastLeftBottomCircle)
  attr("cx")(String(corners.br.x))(pastRightBottomCircle)
  attr("cy")(String(corners.br.y))(pastRightBottomCircle)

  attr("cx")(String(origin.x))(origin1)
  attr("cy")(String(origin.y))(origin1)
  attr("r")(String(5))(origin1)

  attr("cx")(String(origin.x))(orbit1)
  attr("cy")(String(origin.y))(orbit1)
  attr("r")(String(calculateSquareDiagonal(width, height) / 2))(orbit1)
  
  attr("cx")(String(x))(xyCircle)
  attr("cy")(String(y))(xyCircle)
}

function moveShape() {
  origin = { x: x + width / 2, y: y + height / 2 }
  attr("x")(String(x))(rect1)
  attr("y")(String(y))(rect1)
  attr("transform-origin")(`${origin.x} ${origin.y}`)(rect1)

  redrawHelpers()
}

function rotateShape() {
  origin = { x: x + width / 2, y: y + height / 2 }
  attr("transform")(`rotate(${rotate})`)(rect1)
  attr("transform-origin")(`${origin.x} ${origin.y}`)(rect1)

  redrawHelpers()
}

function makeNewSize() {
  let pastCorners = getRectangleCorners(x, y, pastWidth, pastHeight)
  const tlpast = rotatePoint(pastOrigin, pastCorners.tl, rotate * -1)
  // console.log(`pastX-x= ${tlpast.x - x}`)
  // console.log(`pastY-y= ${tlpast.y - y}`)
  // addSvgCircle(tlpast.x, tlpast.y, 5, "green")

  let newCorners = getRectangleCorners(x, y, width, height)
  const tlNew = rotatePoint(origin, newCorners.tl, rotate * -1)
  // console.log(`newX-x= ${tlNew.x - x}`)
  // console.log(`newY-y= ${tlNew.y - y}`)
  // addSvgCircle(tlNew.x, tlNew.y, 5, "blue")

  chageOnResizeX = tlNew.x - tlpast.x
  chageOnResizeY = tlNew.y - tlpast.y

  console.log(`chageOnResizeX= ${chageOnResizeX}`)
  console.log(`chageOnResizeY= ${chageOnResizeY}`)

  attr("width")(String(width))(rect1)
  attr("height")(String(height))(rect1)
  attr("transform-origin")(`${origin.x} ${origin.y}`)(rect1)
  redrawHelpers()
}

attr("x")(String(x))(rect1)
attr("y")(String(y))(rect1)
attr("width")(String(width))(rect1)
attr("height")(String(height))(rect1)
attr("cx")(String(origin.x))(origin1)
attr("cy")(String(origin.y))(origin1)
attr("r")(String(5))(origin1)
attr("cx")(String(origin.x))(orbit1)
attr("cy")(String(origin.y))(orbit1)
attr("r")(String(calculateSquareDiagonal(width, height) / 2))(orbit1)

const corners = getRectangleCorners(x, y, width, height)
let pastLeftTopCircle = addSvgCircle(corners.tl.x, corners.tl.y, 0, "red")
let pastRighttTopCircle = addSvgCircle(corners.tr.x, corners.tr.y, 0, "green")
let pastLeftBottomCircle = addSvgCircle(corners.bl.x, corners.bl.y, 0, "purple")
let pastRightBottomCircle = addSvgCircle(corners.br.x, corners.br.y, 0, "blue")

let leftTopCircle = addSvgCircle(corners.tl.x, corners.tl.y, 5, "red")
let righttTopCircle = addSvgCircle(corners.tr.x, corners.tr.y, 5, "green")
let leftBottomCircle = addSvgCircle(corners.bl.x, corners.bl.y, 5, "purple")
let rightBottomCircle = addSvgCircle(corners.br.x, corners.br.y, 5, "blue")

let xyCircle = addSvgCircle(x, y, 5, "orange")

attr("x1")(String(origin.x))(line1)
attr("y1")(String(origin.y))(line1)
attr("x2")(String(corners.tl.x))(line1)
attr("y2")(String(corners.tl.y))(line1)

setTimeout(() => {
  let newProperty = { x: x, y: y, width: width, height: height, rotate: 60 }
  changeProperty(newProperty)
  rotateShape()
}, 2000)

setTimeout(() => {
  let newProperty = { x: x, y: y, width: width * 2, height: height, rotate: rotate }
  changeProperty(newProperty)
  makeNewSize()
  newProperty = { x: x - chageOnResizeX, y: y - chageOnResizeY, width: width, height: height, rotate: rotate }
  changeProperty(newProperty)
  moveShape()
}, 4000)

setTimeout(() => {
  let newProperty = { x: 400, y: y, width: width, height: height, rotate: rotate }
  changeProperty(newProperty)
  moveShape()
}, 6000)

setTimeout(() => {
  let newProperty = { x: x, y: y, width: width, height: height, rotate: 80 }
  changeProperty(newProperty)
  rotateShape()
}, 8000)