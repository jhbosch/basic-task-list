import { describe, it } from 'vitest'
import isValidUrl from '../util/isValidUrl'


describe('Is valid URL function', () => {

    it('should exist function isValidUrl', () => {
      expect(isValidUrl())
    })


    it('should return false for argument empty', () => {
      expect(isValidUrl()).toBe(false)
    })

    it('should return true for valid url', () => {
      const url = 'https://www.freecodecamp.org'
      const url1 = 'https://freecodecamp.com.cu/store'
      const url2 = 'http://google.com'
      expect(isValidUrl(url)).toBe(true)
      expect(isValidUrl(url1)).toBe(true)
      expect(isValidUrl(url2)).toBe(true)
    })

    it('should return true for url with http protocol', () => {
      const url = 'http://www.freecodecamp.org'
      expect(isValidUrl(url)).toBe(true)
    })

    it('should return true for url without protocol', () => {
      const url = 'www.freecodecamp.org/'
      expect(isValidUrl(url)).toBe(true)
    })

    it('should return false for url without www', () => {
      const url = 'freecodecamp.org'
      expect(isValidUrl(url)).toBe(true)
    })

    it('should return false for invalid url', () => {
      const url = 'free@codecamp.org'
      const url1 = 'freecodecamp'
      const url2 = 'google/study.com'
      expect(isValidUrl(url)).toBe(false)
      expect(isValidUrl(url1)).toBe(false)
      expect(isValidUrl(url2)).toBe(false)
    })
})
