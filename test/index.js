import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
// eslint-disable-next-line import/no-unresolved
import accept from 'attr-accept'

describe('accept', () => {
  it('should return true if called without acceptedFiles', () => {
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'some/type'
        },
        undefined
      ),
      true
    )
  })

  it('should not throw and return true if file is empty or null', () => {
    assert.doesNotThrow(() => {
      accept({})
      accept({}, 'text/html')
      accept({}, '*.png')
      accept({}, 'image/*')

      accept(null)
      accept(null, 'text/html')
      accept(null, '*.png')
      accept(null, 'image/*')
    })
  })

  it('should properly validate if called with concrete mime types', () => {
    const acceptedMimeTypes = 'text/html,image/jpeg,application/json'
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'text/html'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/jpeg'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'application/json'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/bmp'
        },
        acceptedMimeTypes
      ),
      false
    )
    assert.equal(
      accept(
        {
          type: 'image/bmp'
        },
        acceptedMimeTypes
      ),
      false
    )
  })

  it('should properly validate if called with base mime types', () => {
    const acceptedMimeTypes = 'text/*,image/*,application/*'
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'text/html'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/jpeg'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'application/json'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/bmp'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'some/type'
        },
        acceptedMimeTypes
      ),
      false
    )
  })

  it('should properly validate if called with mixed mime types', () => {
    const acceptedMimeTypes = 'text/*,image/jpeg,application/*'
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'text/html'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/jpeg'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/bmp'
        },
        acceptedMimeTypes
      ),
      false
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'application/json'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'some/type'
        },
        acceptedMimeTypes
      ),
      false
    )
  })

  it('should properly validate even with spaces in between', () => {
    const acceptedMimeTypes = 'text/html ,   image/jpeg, application/json'
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'text/html'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.png',
          type: 'image/jpeg'
        },
        acceptedMimeTypes
      ),
      true
    )
  })

  it('should properly validate extensions', () => {
    const acceptedMimeTypes = 'text/html ,    image/jpeg, .pdf  ,.png'
    assert.equal(
      accept(
        {
          name: 'somxsfsd',
          type: 'text/html'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'somesdfsdf',
          type: 'image/jpeg'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'somesdfadfadf',
          type: 'application/json'
        },
        acceptedMimeTypes
      ),
      false
    )
    assert.equal(
      accept(
        {
          name: 'some-file file.pdf',
          type: 'random/type'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'some-file.pdf file.gif',
          type: 'random/type'
        },
        acceptedMimeTypes
      ),
      false
    )
    assert.equal(
      accept(
        {
          name: 'some-FILEi File.PNG',
          type: 'random/type'
        },
        acceptedMimeTypes
      ),
      true
    )
  })

  it('should allow accepted files passed to be an array', () => {
    const acceptedMimeTypes = ['img/jpeg', '.pdf']
    assert.equal(
      accept(
        {
          name: 'testfile.pdf',
          type: 'random/type'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.jpg',
          type: 'img/jpeg'
        },
        acceptedMimeTypes
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile',
          type: 'application/json'
        },
        acceptedMimeTypes
      ),
      false
    )
  })

  it('should check MIME types in a case insensitive way', () => {
    assert.equal(
      accept(
        {
          name: 'testfile.xlsm',
          type: 'application/vnd.ms-excel.sheet.macroenabled.12'
        },
        ['application/vnd.ms-excel.sheet.macroEnabled.12']
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.xlsm',
          type: 'application/vnd.ms-excel.sheet.macroEnabled.12'
        },
        ['application/vnd.ms-excel.sheet.macroenabled.12']
      ),
      true
    )
  })

  it('should allow any file if the accepted files is an empty array or string', () => {
    assert.equal(
      accept(
        {
          name: 'testfile.jpg',
          type: 'img/jpeg'
        },
        ''
      ),
      true
    )
    assert.equal(
      accept(
        {
          name: 'testfile.pdf',
          type: 'random/type'
        },
        []
      ),
      true
    )
  })
})
