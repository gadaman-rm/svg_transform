type ElemFn = <T extends Element>(element: T) => T
export const elem = document.createElement.bind(document)
export const elemNS = document.createElementNS.bind(document)
export const text = document.createTextNode.bind(document)
export const getElem = document.getElementById.bind(document)
export const query = document.querySelector.bind(document)
export const queryAll = document.querySelectorAll.bind(document)
export const append = (node: Node): ElemFn => (element) => {
    element.appendChild(node)
    return element
}
export const attr = (attributeName: string) => (attributeValue: string): ElemFn => (element) => {
    element.setAttribute(attributeName as string, attributeValue)
    return element
}
export const addClass = (className: string): ElemFn => (element) => {
    element.classList.add(className)
    return element
}
export const css = (style: Partial<CSSStyleDeclaration>): ElemFn =>(element) => {
    Object.entries(style).map(([property, value]) => (element as any).style[property] = value)
    return element
}