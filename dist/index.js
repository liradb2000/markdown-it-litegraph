const LitegraphEnum = {
    VERSION: 0.4,

    CANVAS_GRID_SIZE: 10,

    NODE_TITLE_HEIGHT: 30,
    NODE_TITLE_TEXT_Y: 20,
    NODE_SLOT_HEIGHT: 20,
    NODE_WIDGET_HEIGHT: 20,
    NODE_WIDTH: 140,
    NODE_MIN_WIDTH: 50,
    NODE_COLLAPSED_RADIUS: 10,
    NODE_COLLAPSED_WIDTH: 80,
    NODE_TITLE_COLOR: '#999',
    NODE_SELECTED_TITLE_COLOR: '#FFF',
    NODE_TEXT_SIZE: 14,
    NODE_TEXT_COLOR: '#AAA',
    NODE_SUBTEXT_SIZE: 12,
    NODE_DEFAULT_COLOR: '#333',
    NODE_DEFAULT_BGCOLOR: '#353535',
    NODE_DEFAULT_BOXCOLOR: '#666',
    NODE_DEFAULT_SHAPE: 'box',
    NODE_BOX_OUTLINE_COLOR: '#FFF',
    DEFAULT_SHADOW_COLOR: 'rgba(0,0,0,0.5)',
    DEFAULT_GROUP_FONT: 24,

    WIDGET_BGCOLOR: '#222',
    WIDGET_OUTLINE_COLOR: '#666',
    WIDGET_TEXT_COLOR: '#DDD',
    WIDGET_SECONDARY_TEXT_COLOR: '#999',

    LINK_COLOR: '#9A9',
    EVENT_LINK_COLOR: '#A86',
    CONNECTING_LINK_COLOR: '#AFA',

    MAX_NUMBER_OF_NODES: 1000, // avoid infinite loops
    DEFAULT_POSITION: [100, 100], // default node position
    VALID_SHAPES: ['default', 'box', 'round', 'card'], //, "circle"

    // shapes are used for nodes but also for slots
    BOX_SHAPE: 1,
    ROUND_SHAPE: 2,
    CIRCLE_SHAPE: 3,
    CARD_SHAPE: 4,
    ARROW_SHAPE: 5,

    // enums
    INPUT: 1,
    OUTPUT: 2,

    EVENT: -1, // for outputs
    ACTION: -1, // for inputs

    ALWAYS: 0,
    ON_EVENT: 1,
    NEVER: 2,
    ON_TRIGGER: 3,

    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    CENTER: 5,

    STRAIGHT_LINK: 0,
    LINEAR_LINK: 1,
    SPLINE_LINK: 2,

    NORMAL_TITLE: 0,
    NO_TITLE: 1,
    TRANSPARENT_TITLE: 2,
    AUTOHIDE_TITLE: 3,

    ASYNC: false, // used to async to like sync

    proxy: null, // used to redirect calls
    node_images_path: '',

    debug: false,
    catch_exceptions: true,
    throw_errors: true,
    allow_scripts: false, // if set to true some nodes like Formula would be allowed to evaluate code that comes from unsafe sources (like node configuration), which could lead to exploits
    registered_node_types: {}, // nodetypes by string
    node_types_by_file_extension: {}, // used for dropping files in the canvas
    Nodes: {}, // node types by classname
    Globals: {}, // used to store vars between graphs

    searchbox_extras: {}, // used to add extra features to the search box
    auto_sort_node_types: false, // If set to true, will automatically sort node types / categories in the context menus
};

const round_radius = 8;
function drawNodeShape(
    node,
    rootSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
    size,
    fgcolor = LitegraphEnum.NODE_DEFAULT_COLOR,
    bgcolor = LitegraphEnum.NODE_DEFAULT_BGCOLOR
) {
    // const SVG.setAttribute("om", [])
    // // bg rect

    // const style = document.createElementNS(
    //     'http://www.w3.org/2000/svg',
    //     'style'
    // )
    // style.type = 'text/css'
    // style.sheet.insertRule(
    //     `.myclass { stroke: ${fgcolor}; fill: ${bgcolor}; }`,
    //     style.sheet.cssRules.length
    // )

    const title_height = LitegraphEnum.NODE_TITLE_HEIGHT;

    const area = Array(4);
    area[0] = 0; // x
    area[1] = -title_height; // y
    area[2] = size[0] + 1; // w
    area[3] = size[1] + title_height; // h

    rootSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    rootSVG.setAttribute('viewBox', area.join(' '));
    rootSVG.setAttribute('width', area[2]);
    rootSVG.setAttribute('height', area[3]);

    // const old_alpha = ctx.globalAlpha

    // full node shape
    {
        const rectSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
        );
        rectSvg.setAttribute('x', area[0]);
        rectSvg.setAttribute('y', area[1]);
        rectSvg.setAttribute('width', area[2]);
        rectSvg.setAttribute('height', area[3]);
        rectSvg.setAttribute('rx', round_radius);
        rectSvg.setAttribute(
            'ry',
            round_radius
        );
        rectSvg.setAttribute('style', `stroke: ${fgcolor}; fill: ${bgcolor};`);
        rootSVG.appendChild(rectSvg);
        // ctx.roundRect(
        //     area[0],
        //     area[1],
        //     area[2],
        //     area[3],
        //     this.round_radius,
        //     shape === LitegraphEnum.CARD_SHAPE ? 0 : this.round_radius
        // )
    }
    // ctx.fill()

    // separator
    const seperatorSVG = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
    );
    seperatorSVG.setAttribute('style', 'fill:#000;fill-opacity:0.2;');
    seperatorSVG.setAttribute('x', 0);
    seperatorSVG.setAttribute('y', -1);
    seperatorSVG.setAttribute('width', area[2]);
    seperatorSVG.setAttribute('height', 2);
    rootSVG.appendChild(seperatorSVG);
    // ctx.shadowColor = 'transparent'
    // ctx.fillStyle = 'rgba(0,0,0,0.2)'
    // ctx.fillRect(0, -1, area[2], 2)

    // ctx.shadowColor = 'transparent'

    // title bg (remember, it is rendered ABOVE the node)
    {
        // title bar
        {
            const title_color = fgcolor;

            //* gradient test
            // if (this.use_gradients) {
            //     let grad = gradientsCache[title_color]
            //     if (!grad) {
            //         grad = gradientsCache[title_color] =
            //             ctx.createLinearGradient(0, 0, 400, 0)
            //         grad.addColorStop(0, title_color)
            //         grad.addColorStop(1, '#000')
            //     }
            //     ctx.fillStyle = grad
            // } else {
            // ctx.fillStyle = title_color
            // }

            // ctx.beginPath()
            {
                const rectSVG = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'rect'
                );
                rectSVG.setAttribute('x', 0);
                rectSVG.setAttribute('y', -title_height);
                rectSVG.setAttribute('width', size[0] + 1);
                rectSVG.setAttribute('height', title_height);
                rectSVG.setAttribute('rx', round_radius);
                rectSVG.setAttribute('style', `fill:${title_color};`);
                rootSVG.appendChild(rectSVG);
                // ctx.roundRect(
                //     0,
                //     -title_height,
                //     size[0] + 1,
                //     title_height,
                //     this.round_radius,
                //     node.flags.collapsed ? this.round_radius : 0
                // )
            }
            // ctx.fill()
            // ctx.shadowColor = 'transparent'
        }

        // title box
        const box_size = 10;
        {
            const badgeSVG = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'circle'
            );
            badgeSVG.setAttribute('cx', title_height * 0.5);
            badgeSVG.setAttribute('cy', title_height * -0.5);
            badgeSVG.setAttribute('r', box_size * 0.5);
            badgeSVG.setAttribute(
                'style',
                `fill:${LitegraphEnum.NODE_DEFAULT_BOXCOLOR};`
            );
            rootSVG.appendChild(badgeSVG);
            // ctx.fillStyle = node.boxcolor || LitegraphEnum.NODE_DEFAULT_BOXCOLOR

            // ctx.beginPath()
            // ctx.arc(
            //     title_height * 0.5,
            //     title_height * -0.5,
            //     box_size * 0.5,
            //     0,
            //     Math.PI * 2
            // )
            // ctx.fill()
        }
        // ctx.globalAlpha = old_alpha

        // title text

        // ctx.font = this.title_text_font
        const title = String(node.title);
        if (title) {
            const titleText = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text'
            );
            titleText.appendChild(document.createTextNode(title));
            titleText.setAttribute('x', title_height);
            titleText.setAttribute(
                'y',
                LitegraphEnum.NODE_TITLE_TEXT_Y - title_height
            );
            titleText.setAttribute(
                'style',
                `font:${LitegraphEnum.NODE_TEXT_SIZE}px Arial;fill:${LitegraphEnum.NODE_TITLE_COLOR};`
            );
            rootSVG.appendChild(titleText);
            // ctx.fillStyle =
            //     node.constructor.title_text_color || this.node_title_color

            // ctx.textAlign = 'left'
            // ctx.fillText(
            //     title,
            //     title_height,
            //     LitegraphEnum.NODE_TITLE_TEXT_Y - title_height
            // )
        }
    }
}

const default_connection_color = '#778';
const pos = [0, 0];

function getConnectionPos(
    is_input,
    slot_number,
    size = [LitegraphEnum.NODE_WIDTH, 60],
    out
) {
    out = out || new Float32Array(2);
    // let num_slots = 0
    // if (is_input && node.inputs) {
    //     num_slots = node.inputs.length
    // }
    // if (!is_input && this.outputs) {
    //     num_slots = node.outputs.length
    // }

    const offset = LitegraphEnum.NODE_SLOT_HEIGHT * 0.5;

    // weird feature that never got finished
    if (is_input && slot_number === -1) {
        out[0] = pos[0] + LitegraphEnum.NODE_TITLE_HEIGHT * 0.5;
        out[1] = pos[1] + LitegraphEnum.NODE_TITLE_HEIGHT * 0.5;
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
        out[0] = pos[0] + offset;
    } else {
        out[0] = pos[0] + size[0] + 1 - offset;
    }
    out[1] = pos[1] + (slot_number + 0.7) * LitegraphEnum.NODE_SLOT_HEIGHT;
    return out
}

function drawNodeInOutSlot(node, rootSVG) {
    let max_y = 0;
    if (node.inputs) {
        for (let i = 0; i < node.inputs.length; i++) {
            const slot = node.inputs[i];

            // ctx.fillStyle =
            //     slot.link != null
            //         ? slot.color_on || this.default_connection_color.input_on
            //         : slot.color_off || this.default_connection_color.input_off

            const pos = getConnectionPos(
                true,
                i,
                node.size,
                new Float32Array(2)
            );
            // pos[0] -= node.pos[0]
            // pos[1] -= node.pos[1]
            if (max_y < pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5) {
                max_y = pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5;
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
                );
                slotSvg.setAttribute('x', pos[0] - 6 + 0.5);
                slotSvg.setAttribute('y', pos[1] - 5 + 0.5);
                slotSvg.setAttribute('width', 14);
                slotSvg.setAttribute('height', 10);
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color};`
                );
                rootSVG.appendChild(slotSvg);
                // ctx.rect(pos[0] - 6 + 0.5, pos[1] - 5 + 0.5, 14, 10)
                // }
            } else if (slot.shape === LitegraphEnum.ARROW_SHAPE) ; else {
                const slotSvg = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'circle'
                );
                slotSvg.setAttribute('cx', pos[0]);
                slotSvg.setAttribute('cy', pos[1]);
                slotSvg.setAttribute('r', 4);
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color};`
                );
                rootSVG.appendChild(slotSvg);
                // ctx.arc(pos[0], pos[1], 4, 0, Math.PI * 2)
            }
            // ctx.fill()

            // render name

            const text = slot.label != null ? slot.label : slot.name;
            if (text) {
                // ctx.fillStyle = LiteGraph.NODE_TEXT_COLOR
                // if (horizontal || slot.dir == LiteGraph.UP) {
                //     ctx.fillText(text, pos[0], pos[1] - 10)
                // } else {
                const titleText = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'text'
                );
                titleText.appendChild(document.createTextNode(text));
                titleText.setAttribute('x', pos[0] + 10);
                titleText.setAttribute('y', pos[1] + 5);
                titleText.setAttribute(
                    'style',
                    `font:${LitegraphEnum.NODE_SUBTEXT_SIZE}px Arial;fill:${LitegraphEnum.NODE_TEXT_COLOR};`
                );
                rootSVG.appendChild(titleText);
                // ctx.fillText(text, pos[0] + 10, pos[1] + 5)
                // }
            }
        }
    }

    // ctx.textAlign = horizontal ? 'center' : 'right'
    // ctx.strokeStyle = 'black'
    if (node.outputs) {
        for (let i = 0; i < node.outputs.length; i++) {
            const slot = node.outputs[i];

            const pos = getConnectionPos(
                false,
                i,
                node.size,
                new Float32Array(2)
            );
            // pos[0] -= node.pos[0]
            // pos[1] -= node.pos[1]
            if (max_y < pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5) {
                max_y = pos[1] + LitegraphEnum.NODE_SLOT_HEIGHT * 0.5;
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
                );
                slotSvg.setAttribute('x', pos[0] - 6 + 0.5);
                slotSvg.setAttribute('y', pos[1] - 5 + 0.5);
                slotSvg.setAttribute('width', 14);
                slotSvg.setAttribute('height', 10);
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color}; stroke: black;`
                );
                rootSVG.appendChild(slotSvg);
                // ctx.rect(pos[0] - 6 + 0.5, pos[1] - 5 + 0.5, 14, 10)
                // }
            } else if (slot.shape === LitegraphEnum.ARROW_SHAPE) ; else {
                const slotSvg = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'circle'
                );
                slotSvg.setAttribute('cx', pos[0]);
                slotSvg.setAttribute('cy', pos[1]);
                slotSvg.setAttribute('r', 4);
                slotSvg.setAttribute(
                    'style',
                    `fill: ${default_connection_color}; stroke: black;`
                );
                rootSVG.appendChild(slotSvg);
                // ctx.arc(pos[0], pos[1], 4, 0, Math.PI * 2)
            }

            // trigger
            // if(slot.node_id != null && slot.slot == -1)
            // ctx.fillStyle = "#F85";

            // if(slot.links != null && slot.links.length)
            // ctx.fill()
            // if (!low_quality) ctx.stroke()

            // render output name

            const text = slot.label != null ? slot.label : slot.name;
            if (text) {
                // ctx.fillStyle = LiteGraph.NODE_TEXT_COLOR
                // if (horizontal || slot.dir == LiteGraph.DOWN) {
                //     ctx.fillText(text, pos[0], pos[1] - 8)
                // } else {
                const titleText = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'text'
                );
                titleText.appendChild(document.createTextNode(text));
                titleText.setAttribute('x', pos[0] - 10);
                titleText.setAttribute('y', pos[1] + 5);
                titleText.setAttribute(
                    'style',
                    `font:${LitegraphEnum.NODE_SUBTEXT_SIZE}px Arial;fill:${LitegraphEnum.NODE_TEXT_COLOR}; text-anchor: end`
                );
                rootSVG.appendChild(titleText);
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
    const { inputs = null, outputs = null, widgets = null } = node;
    let rows = Math.max(
        inputs ? inputs.length : 1,
        outputs ? outputs.length : 1
    );
    const size = out || new Float32Array([0, 0]);
    rows = Math.max(rows, 1);
    // const font_size = LitegraphEnum.NODE_TEXT_SIZE // although it should be graphcanvas.inner_text_font size

    const title_width = _compute_text_size(node.title);
    let input_width = 0;
    let output_width = 0;

    if (inputs) {
        for (let i = 0, l = inputs.length; i < l; ++i) {
            const input = inputs[i];
            const text = input.label || input.name || '';
            const text_width = _compute_text_size(text);
            if (input_width < text_width) {
                input_width = text_width;
            }
        }
    }

    if (outputs) {
        for (let i = 0, l = outputs.length; i < l; ++i) {
            const output = outputs[i];
            const text = output.label || output.name || '';
            const text_width = _compute_text_size(text);
            if (output_width < text_width) {
                output_width = text_width;
            }
        }
    }

    size[0] = Math.max(input_width + output_width + 10, title_width);
    size[0] = Math.max(size[0], LitegraphEnum.NODE_WIDTH);
    if (widgets && widgets.length) {
        size[0] = Math.max(size[0], LitegraphEnum.NODE_WIDTH * 1.5);
    }

    size[1] = rows * LitegraphEnum.NODE_SLOT_HEIGHT;

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

    size[1] += 6; // margin

    return size
}

function main() {
    const svgElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );
    const node = {
        title: 'aaaaa',
        inputs: [{ name: 'testIn1' }],
        outputs: [{ name: 'testOut1' }],
        size: [LitegraphEnum.NODE_WIDTH, 60]
    };

    node.size = computeSize(node, new Float32Array([0, 0]));

    drawNodeShape(node, svgElement, node.size);
    drawNodeInOutSlot(node, svgElement);
    return svgElement
}
document.body.appendChild(main());
