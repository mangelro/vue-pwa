/*
  https://github.com/pearofducks/mount-vue-component
  https://github.com/MeForma/vue-toaster/blob/master/src/helpers/mount-component.js
*/

import { render, h } from 'vue'

const createElement = () =>
  typeof document !== 'undefined' && document.createElement('div')

  /*
  * Monta un elemento de manera dinámica
  */
const mount = (component, { props, children, element, app } = {}) => {
  let el = element ? element : createElement()

  let vNode = h(component, props, children)

  if (app && app._context) {
    vNode.appContext = app._context
  }

  render(vNode, el)

  const destroy = () => {
    if (el) {
      render(null, el)
    }
    el = null
    vNode = null
  }

  return { vNode, destroy, el }
}

/*
* Elimina un component del DOM
*/

const removeElement = (el) => {

  if (typeof el.remove !== 'undefined') {
      el.remove()
    } else {
      el.parentNode.removeChild(el)
    }

}
  

export { mount, removeElement }

