import { assert } from 'chai';
import * as MimeType from '../lib/common/mime-type';

describe('MimeType', () => {

  it('should be able to decode basic MIME-types', () => {
    const mime = MimeType.parse('audio/mpeg');
    assert.equal(mime.type, 'audio');
    assert.equal(mime.subtype, 'mpeg');
  });

  it('should be able to decode MIME-type parameters', () => {
    {
      const mime = MimeType.parse('message/external-body; access-type=URL');
      assert.equal(mime.type, 'message');
      assert.equal(mime.subtype, 'external-body');
      assert.deepEqual(mime.parameters, {'access-type': 'URL'});
    }

    {
      const mime = MimeType.parse('Text/HTML;Charset="utf-8"');
      assert.equal(mime.type, 'text');
      assert.equal(mime.subtype, 'html');
      assert.deepEqual(mime.parameters, {charset: 'utf-8'});
    }
  });

  it('should be able to decode MIME-type suffix', () => {
    const mime = MimeType.parse('application/xhtml+xml');
    assert.equal(mime.type, 'application');
    assert.equal(mime.subtype, 'xhtml');
    assert.equal(mime.suffix, 'xml');
  });

});
