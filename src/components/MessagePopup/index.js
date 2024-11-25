import { createVNode, render } from 'vue'
import MessagePopupComponent from './index.vue'

export const MessagePopup = (options) => {
  const vnode = createVNode(MessagePopupComponent, {
    ...options,
    onClose,
  })

  const container = document.createElement('div')
  document.body.appendChild(container)

  render(vnode, container)

  function onClose() {
    document.body.removeChild(container)
  }

  return vnode
}
