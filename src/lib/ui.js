import { on, off } from 'bubbly'

const uiMethods = function (args) {
  // TODO: check undefined
  if ((args != null) && (args.method != null)) {
    switch (args.method) {
      case 'share':
        if (args.url != null) {
          const dialog = openWindow(args.url)
          return awaitMessage(dialog)
        } else {
          console.log('TODO: ERROR')
        }
        break
      default:
        console.log('TODO: ERROR')
    }
  }
}

function openWindow (url) {
  return window.open(url, '', 'height=250px, width=500px')
}

function awaitMessage (sourceWindow) {
  return new Promise((resolve, reject) => {
    const onMessage = event => {
      if (event.source === sourceWindow) {
        if (event.data.err) reject(event.data.err)
        else if (event.data.res) resolve(event.data.res)
        else return
        window::off('message', onMessage)
      }
    }
    window::on('message', onMessage)
  })
}

// UI
export default async function (args) {
  const delegate = uiMethods(args)

  // TODO: return error for promise
  return delegate(...args).then(res => {
    return res
  })
}
