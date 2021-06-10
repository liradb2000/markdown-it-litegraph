/* eslint-disable indent */
function drawNodeSahpe() {}

export const drawNode = code => {
    const { inputs = [], outputs = [], widgets = [] } = code
    try {
        return `<div class="mermaid">${code}</div>`
    } catch (err) {
        return `<pre>${htmlEntities(err.name)}: ${htmlEntities(
            err.message
        )}</pre>`
    }
}
