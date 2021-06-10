import { LitegraphEnum } from '../enum'

const default_connection_color = '#778'
const pos = [0, 0]

function getConnectionPos(
    is_input,
    slot_number,
    size = [LitegraphEnum.NODE_WIDTH, 60],
    out
) {
    out = out || new Float32Array(2)
    // let num_slots = 0
    // if (is_input && node.inputs) {
    //     num_slots = node.inputs.length
    // }
    // if (!is_input && this.outputs) {
    //     num_slots = node.outputs.length
    // }

    const offset = LitegraphEnum.NODE_SLOT_HEIGHT * 0.5

    // weird feature that never got finished
    if (is_input && slot_number === -1) {
        out[0] = pos[0] + LitegraphEnum.NODE_TITLE_HEIGHT * 0.5
        out[1] = pos[1] + LitegraphEnum.NODE_TITLE_HEIGHT * 0.5
        return out
    }

    // horizontal distributed slots
    // if (node.type.horizontal) {
    //     out[0] = pos[0] + (slot_number + 0.5) * (size[0] / num_slots)
    //     if (is_input) {
    //         out[1] = pos[1] - LitegraphEnum.NODE_TITLE_HEIGHT
    //     } else {
    //         out[1] = pos[1] + size[1]
    //     }
    //     return out
    // }

    // default vertical slots
    if (is_input) {
        out[0] = pos[0] + offset
    } else {
        out[0] = pos[0] + size[0] + 1 - offset
    }
    out[1] = pos[1] + (slot_number + 0.7) * LitegraphEnum.NODE_SLOT_HEIGHT
    return out
}

function drawNodeInOutSlot(node, rootSVG) {
    let max_y = 0
    if (node.inputs) {
        for (let i = 0; i < node.inputs.length; i++) {
            const slot = node.inputs[i]

            // ctx.fillStyle =
            //     slot.link != null
            //         ? slot.color_on || this.default_connection_color.input_on
            //         : slot.color_off || this.default_connection_color.input_off

            const pos = getConnectionPos(
                true,
                i,
                node.size,
                new Float32Array(2)
            )
            // pos[0] -= node.pos[0]
            // pos[1] -= node.pos[1]
            if (max_y < pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5) {
                max_y = pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5
            }

            // ctx.beginPath()

            if (
                slot.type === LitegraphEnum.EVENT ||
                slot.shape === LitegraphEnum.BOX_SHAPE
            ) {
                // if (horizontal) {
                //     ctx.rect(pos[0] - 5 + 0.5, pos[1] - 8 + 0.5, 10, 14)
                // } else {
                const slotSvg = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'rect'
                )
                slotSvg.setAttribute('x', pos[0] - 6 + 0.5)
                slotSvg.setAttribute('y', pos[1] - 5 + 0.5)
                slotSvg.setAttribute('width', 14)
                slotSvg.setAttribute('height', 10)
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color};`
                )
                rootSVG.appendChild(slotSvg)
                // ctx.rect(pos[0] - 6 + 0.5, pos[1] - 5 + 0.5, 14, 10)
                // }
            } else if (slot.shape === LitegraphEnum.ARROW_SHAPE) {
                // ctx.moveTo(pos[0] + 8, pos[1] + 0.5)
                // ctx.lineTo(pos[0] - 4, pos[1] + 6 + 0.5)
                // ctx.lineTo(pos[0] - 4, pos[1] - 6 + 0.5)
                // ctx.closePath()
            } else {
                const slotSvg = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'circle'
                )
                slotSvg.setAttribute('cx', pos[0])
                slotSvg.setAttribute('cy', pos[1])
                slotSvg.setAttribute('r', 4)
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color};`
                )
                rootSVG.appendChild(slotSvg)
                // ctx.arc(pos[0], pos[1], 4, 0, Math.PI * 2)
            }
            // ctx.fill()

            // render name

            const text = slot.label != null ? slot.label : slot.name
            if (text) {
                // ctx.fillStyle = LiteGraph.NODE_TEXT_COLOR
                // if (horizontal || slot.dir == LiteGraph.UP) {
                //     ctx.fillText(text, pos[0], pos[1] - 10)
                // } else {
                const titleText = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'text'
                )
                titleText.appendChild(document.createTextNode(text))
                titleText.setAttribute('x', pos[0] + 10)
                titleText.setAttribute('y', pos[1] + 5)
                titleText.setAttribute(
                    'style',
                    `font:${LitegraphEnum.NODE_SUBTEXT_SIZE}px Arial;fill:${LitegraphEnum.NODE_TEXT_COLOR};`
                )
                rootSVG.appendChild(titleText)
                // ctx.fillText(text, pos[0] + 10, pos[1] + 5)
                // }
            }
        }
    }

    // ctx.textAlign = horizontal ? 'center' : 'right'
    // ctx.strokeStyle = 'black'
    if (node.outputs) {
        for (let i = 0; i < node.outputs.length; i++) {
            const slot = node.outputs[i]

            const pos = getConnectionPos(
                false,
                i,
                node.size,
                new Float32Array(2)
            )
            // pos[0] -= node.pos[0]
            // pos[1] -= node.pos[1]
            if (max_y < pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5) {
                max_y = pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5
            }

            // ctx.fillStyle =
            //     slot.links && slot.links.length
            //         ? slot.color_on || this.default_connection_color.output_on
            //         : slot.color_off || this.default_connection_color.output_off
            // ctx.beginPath()
            // ctx.rect( node.size[0] - 14,i*14,10,10);

            if (
                slot.type === LitegraphEnum.EVENT ||
                slot.shape === LitegraphEnum.BOX_SHAPE
            ) {
                // if (horizontal) {
                //     ctx.rect(pos[0] - 5 + 0.5, pos[1] - 8 + 0.5, 10, 14)
                // } else {
                const slotSvg = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'rect'
                )
                slotSvg.setAttribute('x', pos[0] - 6 + 0.5)
                slotSvg.setAttribute('y', pos[1] - 5 + 0.5)
                slotSvg.setAttribute('width', 14)
                slotSvg.setAttribute('height', 10)
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color}; stroke: black;`
                )
                rootSVG.appendChild(slotSvg)
                // ctx.rect(pos[0] - 6 + 0.5, pos[1] - 5 + 0.5, 14, 10)
                // }
            } else if (slot.shape === LitegraphEnum.ARROW_SHAPE) {
                // ctx.moveTo(pos[0] + 8, pos[1] + 0.5)
                // ctx.lineTo(pos[0] - 4, pos[1] + 6 + 0.5)
                // ctx.lineTo(pos[0] - 4, pos[1] - 6 + 0.5)
                // ctx.closePath()
            } else {
                const slotSvg = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'circle'
                )
                slotSvg.setAttribute('cx', pos[0])
                slotSvg.setAttribute('cy', pos[1])
                slotSvg.setAttribute('r', 4)
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color}; stroke: black;`
                )
                rootSVG.appendChild(slotSvg)
                // ctx.arc(pos[0], pos[1], 4, 0, Math.PI * 2)
            }

            // trigger
            // if(slot.node_id != null && slot.slot == -1)
            // ctx.fillStyle = "#F85";

            // if(slot.links != null && slot.links.length)
            // ctx.fill()
            // if (!low_quality) ctx.stroke()

            // render output name

            const text = slot.label != null ? slot.label : slot.name
            if (text) {
                // ctx.fillStyle = LiteGraph.NODE_TEXT_COLOR
                // if (horizontal || slot.dir == LiteGraph.DOWN) {
                //     ctx.fillText(text, pos[0], pos[1] - 8)
                // } else {
                const titleText = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'text'
                )
                titleText.appendChild(document.createTextNode(text))
                titleText.setAttribute('x', pos[0] - 10)
                titleText.setAttribute('y', pos[1] + 5)
                titleText.setAttribute(
                    'style',
                    `font:${LitegraphEnum.NODE_SUBTEXT_SIZE}px Arial;fill:${LitegraphEnum.NODE_TEXT_COLOR}; text-anchor: end`
                )
                rootSVG.appendChild(titleText)
                // ctx.fillText(text, pos[0] - 10, pos[1] + 5)
                // }
            }
        }
    }

    // ctx.textAlign = 'left'
    // ctx.globalAlpha = 1

    // if (node.widgets) {
    //     var widgets_y = max_y
    //     if (horizontal || node.widgets_up) {
    //         widgets_y = 2
    //     }
    //     if (node.widgets_start_y != null) widgets_y = node.widgets_start_y
    //     this.drawNodeWidgets(
    //         node,
    //         widgets_y,
    //         ctx,
    //         this.node_widget && this.node_widget[0] == node
    //             ? this.node_widget[1]
    //             : null
    //     )
    // }
}

export default drawNodeInOutSlot
