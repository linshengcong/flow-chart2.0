// Inspired by https://github.com/Inndy/vue-clipboard2

const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      el.vClipboardSuccess = binding.value
    } else if (binding.arg === 'error') {
      el.vClipboardError = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() { return binding.value },
        action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
      })
      clipboard.on('success', e => {
        const callback = el.vClipboardSuccess
        callback && callback(e) // eslint-disable-line
      })
      clipboard.on('error', e => {
        const callback = el.vClipboardError
        callback && callback(e) // eslint-disable-line
      })
      el.vClipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el.vClipboardSuccess = binding.value
    } else if (binding.arg === 'error') {
      el.vClipboardError = binding.value
    } else {
      el.vClipboard.text = function() { return binding.value }
      el.vClipboard.action = function() { return binding.arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el.vClipboardSuccess
    } else if (binding.arg === 'error') {
      delete el.vClipboardError
    } else {
      el.vClipboard.destroy()
      delete el.vClipboard
    }
  }
}
