const copyWithTextarea = (text: string) => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const isCopied = document.execCommand('copy')
  textarea.remove()
  return isCopied
}

export const copyText = async (text: string) => {
  if (!navigator.clipboard) return copyWithTextarea(text)
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return copyWithTextarea(text)
  }
}
