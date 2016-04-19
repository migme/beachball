import { on, off } from 'bubbly'

export function awaitMessage (sourceWindow) {
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
