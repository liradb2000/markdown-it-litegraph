import drawNodeShape from './drawNodeShape'
import drawNodeInOutSlot from './drawNodeInOutSlot'
import computeSize from './computeSize'
import { LitegraphEnum } from '../enum'
function main() {
    const svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    )
    const node = {
        title: 'aaaaa',
        inputs: [{ name: 'testIn1' }],
        outputs: [{ name: 'testOut1' }],
        size: [LitegraphEnum.NODE_WIDTH, 60]
    }

    node.size = computeSize(node, new Float32Array([0, 0]))

    drawNodeShape(node, svgElement, node.size)
    drawNodeInOutSlot(node, svgElement)
    return svgElement
}
document.body.appendChild(main())
