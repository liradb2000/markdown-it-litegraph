import drawNodeShape from './drawNodeShape'
import drawNodeInOutSlot from './drawNodeInOutSlot'
import computeSize from './computeSize'
import { LitegraphEnum } from '../enum'

function main(nodeString, serializer) {
    let node = {}
    try {
        node = JSON.parse(nodeString)
    } catch {
        return 'error'
    }
    try {
        node.size = computeSize(node, new Float32Array([0, 0]))
    } catch {
        node.size = [LitegraphEnum.NODE_WIDTH, 60]
    }
    const svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    drawNodeShape(node, svgElement, node.size)
    drawNodeInOutSlot(node, svgElement)

    return serializer.serializeToString(svgElement)
}
export default main
