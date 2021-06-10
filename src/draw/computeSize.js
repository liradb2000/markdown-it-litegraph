import { LitegraphEnum } from '../enum'

function _compute_text_size(text, size = LitegraphEnum.NODE_TEXT_SIZE) {
    if (!text) {
        return 0
    }
    return size * text.length * 0.6
}

function computeSize(node, out) {
    // if (this.constructor.size) {
    //     return this.constructor.size.concat()
    // }
    const { inputs = null, outputs = null, widgets = null } = node
    let rows = Math.max(
        inputs ? inputs.length : 1,
        outputs ? outputs.length : 1
    )
    const size = out || new Float32Array([0, 0])
    rows = Math.max(rows, 1)
    // const font_size = LitegraphEnum.NODE_TEXT_SIZE // although it should be graphcanvas.inner_text_font size

    const title_width = _compute_text_size(node.title)
    let input_width = 0
    let output_width = 0

    if (inputs) {
        for (let i = 0, l = inputs.length; i < l; ++i) {
            const input = inputs[i]
            const text = input.label || input.name || ''
            const text_width = _compute_text_size(text)
            if (input_width < text_width) {
                input_width = text_width
            }
        }
    }

    if (outputs) {
        for (let i = 0, l = outputs.length; i < l; ++i) {
            const output = outputs[i]
            const text = output.label || output.name || ''
            const text_width = _compute_text_size(text)
            if (output_width < text_width) {
                output_width = text_width
            }
        }
    }

    size[0] = Math.max(input_width + output_width + 10, title_width)
    size[0] = Math.max(size[0], LitegraphEnum.NODE_WIDTH)
    if (widgets && widgets.length) {
        size[0] = Math.max(size[0], LitegraphEnum.NODE_WIDTH * 1.5)
    }

    size[1] = rows * LitegraphEnum.NODE_SLOT_HEIGHT

    // let widgets_height = 0
    // if (widgets && widgets.length) {
    //     for (let i = 0, l = widgets.length; i < l; ++i) {
    //         widgets_height += LitegraphEnum.NODE_WIDGET_HEIGHT + 4
    //     }
    //     widgets_height += 8
    // }

    // // compute height using widgets height
    // if (this.widgets_up) size[1] = Math.max(size[1], widgets_height)
    // else if (this.widgets_start_y != null) {
    //     size[1] = Math.max(size[1], widgets_height + this.widgets_start_y)
    // } else size[1] += widgets_height

    // if (this.constructor.min_height && size[1] < this.constructor.min_height) {
    //     size[1] = this.constructor.min_height
    // }

    size[1] += 6 // margin

    return size
}

export default computeSize
