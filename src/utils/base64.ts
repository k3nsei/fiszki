const UTF8_TEXT_ENCODER = new TextEncoder();
const UTF8_TEXT_DECODER = new TextDecoder();

export const toBase64 = (value: string): string => {
  if (!value) {
    return '';
  }

  const bytes: Uint8Array = UTF8_TEXT_ENCODER.encode(value);

  let binString: string = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binString += String.fromCharCode(bytes[i]);
  }

  return btoa(binString);
};

export const fromBase64 = (value: string): string => {
  if (!value) {
    return '';
  }

  const binString: string = atob(value);
  const bytes: Uint8Array = Uint8Array.from<string>(binString, (m) => m.codePointAt(0)!);

  return UTF8_TEXT_DECODER.decode(bytes);
};
