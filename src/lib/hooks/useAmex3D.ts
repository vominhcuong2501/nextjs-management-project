import { useEffect, useState } from 'react'

export const useAmex3D = () => {
  const [htmlOtpAmex, setHtmlOtpAmex] = useState<string | null>(null)

  useEffect(() => {
    if (!htmlOtpAmex) return

    const displayAmexUI = () => {
      const oldDiv = document.getElementById('amex3d-layout')
      if (oldDiv) document.body.removeChild(oldDiv)

      const layout = document.createElement('div')
      layout.id = 'amex3d-layout'
      layout.className = 'fixed w-full h-full bg-white top-0 left-0 right-0 bottom-0 z-50 text-center mx-auto'
      layout.innerHTML = `<div class="flex justify-center h-full items-center">${htmlOtpAmex}</div>`
      document.body.appendChild(layout)

      const divElement = document.getElementById('amex3d-layout')

      if (divElement) {
        const formElement = divElement.querySelector('form')

        if (formElement) {
          formElement.submit()
        }
      }
    }

    displayAmexUI()

    return () => {
      const layoutToRemove = document.getElementById('amex3d-layout')
      if (layoutToRemove) {
        document.body.removeChild(layoutToRemove)
      }
    }
  }, [htmlOtpAmex])

  return { setHtmlOtpAmex }
}
