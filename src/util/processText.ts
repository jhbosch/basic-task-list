import isValidUrl from "./isValidUrl";


const processTest = (text: string = '') => {

  const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;

  const buildTag = (text: string, clazz: string) => `<span contenteditable="false" class="tag tag-${clazz}">${text}</span>`

  if(text.startsWith('#')) {
    return buildTag(text, 'purple')
  }

  if(text.startsWith('@')) {
    return buildTag(text, 'green')
  }

  if(regex.test(text)) {
    return buildTag(text, 'orange')
  }

  if(isValidUrl(text)) {
    return buildTag(text, 'blue')
  }

  return text;
}


export default processTest;
