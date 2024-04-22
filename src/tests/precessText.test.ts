import { describe, it } from 'vitest'
import processText from '../util/processText'

const buildTag = (text: string, clazz: string) => `<span contenteditable="false" class="tag tag-${clazz}">${text}</span>`


describe('Process text function', () => {

  it('should exist function processTest', () => {
    expect(processText())
  })

  it('should return string empty when if dont exist argument', () => {
    expect(processText()).toBe('')
  })

  it('should return same text if this dont have especial character expected', () => {
    const text = 'hol@ mundo'
    expect(processText(text)).toBe(text)
  })

  it('should return word to start with # wrapper by span tag and class name tag-purple', () => {
    const text = '#mundo'
    expect(processText(text)).toBe(buildTag(text, 'purple'))
  })

  it('should return word to start with @ wrapper by span tag and class name tag-green', () => {
    const text = '@mundo'
    expect(processText(text)).toBe(buildTag(text, 'green'))
  })

  it('should return email when argument is valid email wrapper by span tag and class name tag-orange', () => {
    const text = 'hola@mundo.com'
    expect(processText(text)).toBe(buildTag(text, 'orange'))
  })

  it('should return link when argument is valid url wrapper by span tag and class name tag-blue', () => {
    const text = 'www.holamundo.com'
    expect(processText(text)).toBe(buildTag(text, 'blue'))
  })




})

