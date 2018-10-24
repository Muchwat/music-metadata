import * as ContentType from 'content-type';

export interface IMimeType {
  type: string,
  subtype: string,
  suffix?: string
  parameters: { [key: string]: string; },
}

export function parse(contentType: string): IMimeType {
  const res = ContentType.parse(contentType);
  const types = res.type.split('/');
  res.type = types[0];
  const suffix = types[1].split('+');
  res.subtype = suffix[0];
  if (suffix.length > 1) {
    res.suffix = suffix[1];
  }
  return res;
}
