import { LitegraphEnum } from '../enum'

const round_radius = 8
export default function drawNodeShape(
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

    const title_height = LitegraphEnum.NODE_TITLE_HEIGHT

    // render node area depending on shape
    const shape = LitegraphEnum.ROUND_SHAPE

    const title_mode = LitegraphEnum.NORMAL_TITLE

    const render_title = true

    const area = Array(4)
    area[0] = 0 // x
    area[1] = -title_height // y
    area[2] = size[0] + 1 // w
    area[3] = size[1] + title_height // h

    rootSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    rootSVG.setAttribute(
        'viewBox',
        `${area[0] - 7.5} ${area[1] - 7.5} ${area[2] + 15} ${area[3] + 15}`
    )
    rootSVG.setAttribute('width', area[2] + 15)
    rootSVG.setAttribute('height', area[3] + 15)

    // Add backdrop shadow
    const _filter = `%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22f3%22%20x%3D%22-5%22%20y%3D%22-5%22%20width%3D%22${area[2]}%22%20height%3D%22${area[3]}%22%3E%3CfeOffset%20result%3D%22offOut%22%20in%3D%22SourceAlpha%22%20dx%3D%220%22%20dy%3D%220%22%3E%3C%2FfeOffset%3E%3CfeGaussianBlur%20result%3D%22blurOut%22%20in%3D%22offOut%22%20stdDeviation%3D%224%22%3E%3C%2FfeGaussianBlur%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22blurOut%22%20mode%3D%22normal%22%3E%3C%2FfeBlend%3E%3C%2Ffilter%3E%3C%2Fsvg%3E`
    // const _defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    // const _filter = document.createElementNS(
    //     'http://www.w3.org/2000/svg',
    //     'filter'
    // )
    // const _feOffset = document.createElementNS(
    //     'http://www.w3.org/2000/svg',
    //     'feOffset'
    // )
    // const _feGaussianBlur = document.createElementNS(
    //     'http://www.w3.org/2000/svg',
    //     'feGaussianBlur'
    // )
    // const _feBlend = document.createElementNS(
    //     'http://www.w3.org/2000/svg',
    //     'feBlend'
    // )
    // _filter.setAttribute('id', 'f3')
    // _filter.setAttribute('x', 0)
    // _filter.setAttribute('y', 0)
    // _filter.setAttribute('width', area[2])
    // _filter.setAttribute('height', area[3])

    // _feOffset.setAttribute('result', 'offOut')
    // _feOffset.setAttribute('in', 'SourceAlpha')
    // _feOffset.setAttribute('dx', 0)
    // _feOffset.setAttribute('dy', 0)

    // _feGaussianBlur.setAttribute('result', 'blurOut')
    // _feGaussianBlur.setAttribute('in', 'offOut')
    // _feGaussianBlur.setAttribute('stdDeviation', 5)

    // _feBlend.setAttribute('in', 'SourceGraphic')
    // _feBlend.setAttribute('in2', 'blurOut')
    // _feBlend.setAttribute('mode', 'normal')

    // _filter.appendChild(_feOffset)
    // _filter.appendChild(_feGaussianBlur)
    // _filter.appendChild(_feBlend)

    // _defs.appendChild(_filter)

    // rootSVG.appendChild(_defs)

    // const old_alpha = ctx.globalAlpha

    // full node shape
    if (shape === LitegraphEnum.BOX_SHAPE) {
        const rectSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
        )
        rectSvg.setAttribute('x', area[0])
        rectSvg.setAttribute('y', area[1])
        rectSvg.setAttribute('width', area[2])
        rectSvg.setAttribute('height', area[3])
        rectSvg.setAttribute(
            'filter',
            `url(data:image/svg+xml;utf8,${_filter}#f3)`
        )
        rectSvg.setAttribute('style', `stroke: ${fgcolor}; fill: ${bgcolor};`)
        rootSVG.appendChild(rectSvg)
        // ctx.fillRect(area[0], area[1], area[2], area[3])
    } else if (
        shape === LitegraphEnum.ROUND_SHAPE ||
        shape === LitegraphEnum.CARD_SHAPE
    ) {
        const rectSvg = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'rect'
        )
        rectSvg.setAttribute('x', area[0])
        rectSvg.setAttribute('y', area[1])
        rectSvg.setAttribute('width', area[2])
        rectSvg.setAttribute('height', area[3])
        rectSvg.setAttribute('rx', round_radius)
        rectSvg.setAttribute(
            'ry',
            shape === LitegraphEnum.CARD_SHAPE ? 0 : round_radius
        )
        rectSvg.setAttribute(
            'filter',
            `url(data:image/svg+xml;utf8,${_filter}#f3)`
        )
        rectSvg.setAttribute('style', `stroke: ${fgcolor}; fill: ${bgcolor};`)
        rootSVG.appendChild(rectSvg)
        // ctx.roundRect(
        //     area[0],
        //     area[1],
        //     area[2],
        //     area[3],
        //     this.round_radius,
        //     shape === LitegraphEnum.CARD_SHAPE ? 0 : this.round_radius
        // )
    } else if (shape === LitegraphEnum.CIRCLE_SHAPE) {
        const bodySVG = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
        )
        bodySVG.setAttribute('cx', size[0] * 0.5)
        bodySVG.setAttribute('cy', size[1] * 0.5)
        bodySVG.setAttribute('r', size[0] * 0.5)
        bodySVG.setAttribute(
            'filter',
            `url(data:image/svg+xml;utf8,${_filter}#f3)`
        )
        bodySVG.setAttribute('style', `stroke: ${fgcolor}; fill: ${bgcolor};`)
        rootSVG.appendChild(bodySVG)

        // ctx.arc(size[0] * 0.5, size[1] * 0.5, size[0] * 0.5, 0, Math.PI * 2)
    }
    // ctx.fill()

    // separator
    const seperatorSVG = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
    )
    seperatorSVG.setAttribute('style', 'fill:#000;fill-opacity:0.2;')
    seperatorSVG.setAttribute('x', 0)
    seperatorSVG.setAttribute('y', -1)
    seperatorSVG.setAttribute('width', area[2])
    seperatorSVG.setAttribute('height', 2)
    rootSVG.appendChild(seperatorSVG)
    // ctx.shadowColor = 'transparent'
    // ctx.fillStyle = 'rgba(0,0,0,0.2)'
    // ctx.fillRect(0, -1, area[2], 2)

    // ctx.shadowColor = 'transparent'

    // title bg (remember, it is rendered ABOVE the node)
    if (render_title || title_mode === LitegraphEnum.TRANSPARENT_TITLE) {
        // title bar
        if (title_mode !== LitegraphEnum.TRANSPARENT_TITLE) {
            const title_color = fgcolor

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
            if (shape === LitegraphEnum.BOX_SHAPE) {
                const rectSVG = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'rect'
                )
                rectSVG.setAttribute('x', 0)
                rectSVG.setAttribute('y', -title_height)
                rectSVG.setAttribute('width', size[0] + 1)
                rectSVG.setAttribute('height', title_height)
                rectSVG.setAttribute('style', 'fill:title_color;')
                rootSVG.appendChild(rectSVG)
                // ctx.rect(0, -title_height, size[0] + 1, title_height)
            } else if (
                shape === LitegraphEnum.ROUND_SHAPE ||
                shape === LitegraphEnum.CARD_SHAPE
            ) {
                const rectSVG = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'rect'
                )
                rectSVG.setAttribute('x', 0)
                rectSVG.setAttribute('y', -title_height)
                rectSVG.setAttribute('width', size[0] + 1)
                rectSVG.setAttribute('height', title_height)
                rectSVG.setAttribute('rx', round_radius)
                rectSVG.setAttribute('style', `fill:${title_color};`)
                rootSVG.appendChild(rectSVG)
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
        const box_size = 10
        if (
            shape === LitegraphEnum.ROUND_SHAPE ||
            shape === LitegraphEnum.CIRCLE_SHAPE ||
            shape === LitegraphEnum.CARD_SHAPE
        ) {
            const badgeSVG = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'circle'
            )
            badgeSVG.setAttribute('cx', title_height * 0.5)
            badgeSVG.setAttribute('cy', title_height * -0.5)
            badgeSVG.setAttribute('r', box_size * 0.5)
            badgeSVG.setAttribute(
                'style',
                `fill:${LitegraphEnum.NODE_DEFAULT_BOXCOLOR};`
            )
            rootSVG.appendChild(badgeSVG)
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
        } else {
            const badgeSVG = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'rect'
            )
            badgeSVG.setAttribute('x', (title_height - box_size) * 0.5)
            badgeSVG.setAttribute('y', (title_height + box_size) * -0.5)
            badgeSVG.setAttribute('width', box_size)
            badgeSVG.setAttribute('height', box_size)
            badgeSVG.setAttribute(
                'style',
                `fill:${LitegraphEnum.NODE_DEFAULT_BOXCOLOR};`
            )
            rootSVG.appendChild(badgeSVG)
            // ctx.fillStyle = node.boxcolor || LitegraphEnum.NODE_DEFAULT_BOXCOLOR
            // ctx.fillRect(
            //     (title_height - box_size) * 0.5,
            //     (title_height + box_size) * -0.5,
            //     box_size,
            //     box_size
            // )
        }
        // ctx.globalAlpha = old_alpha

        // title text

        // ctx.font = this.title_text_font
        const title = String(node.title)
        if (title) {
            const titleText = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'text'
            )
            titleText.appendChild(document.createTextNode(title))
            titleText.setAttribute('x', title_height)
            titleText.setAttribute(
                'y',
                LitegraphEnum.NODE_TITLE_TEXT_Y - title_height
            )
            titleText.setAttribute(
                'style',
                `font:${LitegraphEnum.NODE_TEXT_SIZE}px Arial;fill:${LitegraphEnum.NODE_TITLE_COLOR};`
            )
            rootSVG.appendChild(titleText)
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
