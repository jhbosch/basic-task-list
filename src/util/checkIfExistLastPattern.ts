
const checkIfExistLastPattern = (text: string = ''): string => {

  // check tag with pattern @ or #
  const isPattern = text.match(/ ((#|@)(\w+ ))/g)

  if(isPattern && isPattern.length > 0) {
    return isPattern[0].trim()
  }

  // check email pattern typed
  const emails =
        / \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b /g;

  const isPatternEmail = text.match(emails)

  if(isPatternEmail && isPatternEmail.length > 0) {
    return isPatternEmail[0].trim()
  }

  // check email pattern typed
  const urls = new RegExp(
    ' ([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)? ', // fragment locator
    'g'
  );

  const isPatternUrl = text.match(urls)
  if(isPatternUrl && isPatternUrl.length > 0) {
    return isPatternUrl[0].trim()
  }

  return text


}

export default checkIfExistLastPattern
