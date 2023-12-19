import { append, attr, elemNS } from './lib/dom'
import { pipe } from './lib/pipe'

const rect1 = pipe(
    elemNS("http://www.w3.org/2000/svg", "rect"),
    attr("id")("rect1"),
    attr("fill")("none"),
    attr("stroke")("red"),
    attr("stroke-width")("2"),
)

const origin1 = pipe(
    elemNS("http://www.w3.org/2000/svg", "circle"),
    attr("id")("origin1"),
    attr("fill")("red"),
)

const orbit1 = pipe(
    elemNS("http://www.w3.org/2000/svg", "circle"),
    attr("id")("orbit1"),
    attr("fill")("none"),
    attr("stroke")("black"),
    attr("stroke-width")("2"),
    attr("stroke-dasharray")("5,5"),
)

const line1 = pipe(
    elemNS("http://www.w3.org/2000/svg", "line"),
    attr("id")("line1"),
    attr("stroke")("red"),
    attr("stroke-dasharray")("5,5"),
)

const svg = pipe(
    elemNS("http://www.w3.org/2000/svg", "svg"),
    attr("width")("100dvw"),
    attr("height")("100dvh"),
    attr("overflow")("visible"),
    attr("preserve-aspect-ratio")("none"),
    attr("id")("container"),
    append(rect1),
    append(origin1),
    append(orbit1),
    append(line1),
)

export { svg, line1, orbit1, origin1, rect1 }