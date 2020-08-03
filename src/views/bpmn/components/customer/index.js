import CustomPalette from './customPalette'
import CustomRenderer from './customRenderer'
import CustomContextPad from './CustomContextPad'
export default {
  __init__: ['customPalette', 'customRenderer', 'customContextPad'],
  customPalette: ['type', CustomPalette],
  customRenderer: ['type', CustomRenderer],
  customContextPad: ['type', CustomContextPad]
}
