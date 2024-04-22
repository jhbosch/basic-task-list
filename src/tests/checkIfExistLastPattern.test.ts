import { describe, it } from 'vitest'
import checkIfExistLastPattern from '../util/checkIfExistLastPattern'


describe('Is valid URL function', () => {

    it('should exist function isValidUrl', () => {
      expect(checkIfExistLastPattern())
    })

    it('should return empty string for non-argument provided', () => {
      expect(checkIfExistLastPattern()).toBe("")
    })

    it('should return string with "@tag" pattern extracted from string', () => {
      expect(checkIfExistLastPattern("Hello no@extracted @extracted ")).toBe("@extracted")
    })

    it('should return string with "#tag" pattern extracted from string', () => {
      expect(checkIfExistLastPattern("Hello no#extracted #extracted ")).toBe("#extracted")
    })

    it('should return string with "email" extracted from string', () => {
      expect(checkIfExistLastPattern("Hello valid@email.com ")).toBe("valid@email.com")
      expect(checkIfExistLastPattern("Hello on.valid@email.com ")).toBe("on.valid@email.com")
      expect(checkIfExistLastPattern("Hello novalid@email ")).toBe("Hello novalid@email ")
    })

    it('should return string with "link" extracted from string', () => {
      expect(checkIfExistLastPattern("Hello word.com ")).toBe("word.com")
      expect(checkIfExistLastPattern("Hello http://word.com/ ")).toBe("http://word.com/")
      expect(checkIfExistLastPattern("Hello https://www.word.com/ ")).toBe("https://www.word.com/")
      expect(checkIfExistLastPattern("Hello https://www.word.com/more ")).toBe("https://www.word.com/more")
      expect(checkIfExistLastPattern("Hello https://www ")).toBe("Hello https://www ")
    })



})
