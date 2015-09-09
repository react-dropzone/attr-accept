/* eslint no-unused-expressions: 0 */

import expect from 'expect';
import accept from '../src/index';

describe('accept', () => {
    it('should return true if called without acceptedFiles', () => {
        expect(accept({
            type: 'some/type'
        }, undefined)).toBe(true);
    });

    it('should properly validate if called with concrete mime types', () => {
        const acceptedMimeTypes = 'text/html,image/jpeg,application/json';
        expect(accept({
            type: 'text/html'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/jpeg'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'application/json'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/bmp'
        }, acceptedMimeTypes)).toBe(false);
    });

    it('should properly validate if called with base mime types', () => {
        const acceptedMimeTypes = 'text/*,image/*,application/*';
        expect(accept({
            type: 'text/html'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/jpeg'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'application/json'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/bmp'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'some/type'
        }, acceptedMimeTypes)).toBe(false);
    });

    it('should properly validate if called with mixed mime types', () => {
        const acceptedMimeTypes = 'text/*,image/jpeg,application/*';
        expect(accept({
            type: 'text/html'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/jpeg'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/bmp'
        }, acceptedMimeTypes)).toBe(false);
        expect(accept({
            type: 'application/json'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'some/type'
        }, acceptedMimeTypes)).toBe(false);
    });

    it('should properly validate even with spaces in between', () => {
        const acceptedMimeTypes = 'text/html ,   image/jpeg, application/json';
        expect(accept({
            type: 'text/html'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            type: 'image/jpeg'
        }, acceptedMimeTypes)).toBe(true);
    });

    it('should properly validate extensions', () => {
        const acceptedMimeTypes = 'text/html ,    image/jpeg, .pdf  ,.png';
        expect(accept({
            name: 'somxsfsd',
            type: 'text/html'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            name: 'somesdfsdf',
            type: 'image/jpeg'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            name: 'somesdfadfadf',
            type: 'application/json'
        }, acceptedMimeTypes)).toBe(false);
        expect(accept({
            name: 'some-file file.pdf',
            type: 'random/type'
        }, acceptedMimeTypes)).toBe(true);
        expect(accept({
            name: 'some-file.pdf file.gif',
            type: 'random/type'
        }, acceptedMimeTypes)).toBe(false);
        expect(accept({
            name: 'some-file file.png',
            type: 'random/type'
        }, acceptedMimeTypes)).toBe(true);
    });
});
