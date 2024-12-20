import { caesarEncryptDecrypt, vigenereDecrypt, vigenereEncrypt } from './ciphers';
import { describe, it, expect } from 'vitest';

describe('caesarEncryptDecrypt()', () => {
  it('should translate the string using Caesar cipher', () => {
    const testValue = 'test';

    const result = caesarEncryptDecrypt(13, testValue);

    expect(result).toBe('grfg');
  });

  it('should leave the spaces between the words', () => {
    const testValue = 'test test';

    const result = caesarEncryptDecrypt(13, testValue);

    expect(result).toBe('grfg grfg');
  });

  it('should change the result when shiftValue is changed', () => {
    const testValue = 'test';

    const result = caesarEncryptDecrypt(0, testValue);

    expect(result).toBe(testValue);
  });
});

describe('vigenereEncrypt()', () => {
  it('should encrypt the input string using Vigenère cipher', () => {
    const testKey = 'pizza';
    const testValue = 'test';

    const result = vigenereEncrypt(testKey, testValue);

    expect(result).toBe('iMrs');
  });

  it('should leave the spaces between the words', () => {
    const testKey = 'pizza';
    const testValue = 'test test';

    const result = vigenereEncrypt(testKey, testValue);

    expect(result).toBe('iMrs iMrs');
  });
});

describe('vigenereDecrypt()', () => {
  it('should decrypt the input string back to the original value when using the same secret key', () => {
    const testKey = 'pizza';
    const testValue = 'test';
    const resultEncrypt = vigenereEncrypt(testKey, testValue);

    const result = vigenereDecrypt(testKey, resultEncrypt);

    expect(result).toBe(testValue);
  });

  it('should leave the spaces between the words', () => {
    const testKey = 'pizza';
    const testValue = 'test test';
    const resultEncrypt = vigenereEncrypt(testKey, testValue);

    const result = vigenereDecrypt(testKey, resultEncrypt);

    expect(result).toBe(testValue);
  });
});
