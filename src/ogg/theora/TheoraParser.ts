import {ITokenizer} from 'strtok3/lib/type';
import * as initDebug from 'debug';

import {IPageHeader} from '../Ogg';
import {IOptions} from '../../type';
import {INativeMetadataCollector} from '../../common/MetadataCollector';
import * as Ogg from '../Ogg';
import { IdentificationHeader } from './Theora';

const debug = initDebug('music-metadata:parser:ogg:theora');

/**
 * Ref:
 *   https://theora.org/doc/Theora.pdf
 */
export class TheoraParser implements Ogg.IPageConsumer {

  public codecName = 'Theora';

  constructor(private metadata: INativeMetadataCollector, options: IOptions, private tokenizer: ITokenizer) {
  }

  /**
   * Vorbis 1 parser
   * @param header Ogg Page Header
   * @param pageData Page data
   */
  public parsePage(header: Ogg.IPageHeader, pageData: Buffer) {
    if (header.headerType.firstPage) {
      this.parseFirstPage(header, pageData);
    } else {

    }
  }

  /**
   * Parse first Theora Ogg page. the initial identification header packet
   * @param {IPageHeader} header
   * @param {Buffer} pageData
   */
  protected parseFirstPage(header: IPageHeader, pageData: Buffer) {
    debug('First Ogg/Theora page');
    const idHeader = IdentificationHeader.get(pageData, 0);
    this.metadata.setFormat('bitrate', idHeader.nombr);
  }

  public flush() {
    debug('flush');
  }

}
