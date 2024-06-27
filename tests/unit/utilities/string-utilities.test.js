import { toTitleCase, toSentenceCase, slugify, removeNonAlphanumeric, normalizeWhitespace } from '../../../src/utilities/index.js';

describe('string-utilities - basic functionality', () => {
    it('toTitleCase - should return a string in title case', ()=>{
        const string_ = 'It is a random string';
        const title = toTitleCase(string_, ' ');
        expect(title).toBe('It Is A Random String');
    });

    it('slugify - should return a string for use in url', ()=>{
        const string_ = 'It is A  random  string  ';
        const slug = slugify(string_);
        expect(slug).toBe('it-is-a-random-string-');
    });

    it('removeNonAlphanumeric - should return a string that only has alphabets and numbers', ()=>{
        const string_ = '!@It is a # random? string * 12 3 09';
        const alphaNumber = removeNonAlphanumeric(string_);
        expect(alphaNumber).toBe('Itisarandomstring12309');
    });

    it('normalizeWhitespace - should return a string that only has alphabets and numbers', ()=>{
        const string_ = '  It   is a    random   string   ';
        const normalized = normalizeWhitespace(string_);
        expect(normalized).toBe('It is a random string');
    });

    it('toSentenceCase - should return a string that only has alphabets and numbers', ()=>{
        const string_ = 'it is a random string. in non sentence case';
        const sentenced = toSentenceCase(string_);
        expect(sentenced).toBe('It is a random string. In non sentence case');
    });
});