// import { drawNode } from './drawNode'

// const LitegraphPlugin = (md, opts) => {
//     Object.assign(LitegraphPlugin.default, opts)

//     const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules)

//     md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
//         const token = tokens[idx]
//         const code = token.content.trim()
//         if (token.info.trim() === 'litegraph') {
//             return drawNode(code)
//         }
//         return defaultRenderer(tokens, idx, opts, env, self)
//     }
// }

// LitegraphPlugin.default = {
//     token: 'mermaid',
// }

// export default LitegraphPlugin
import './draw'
// export default drawNode
