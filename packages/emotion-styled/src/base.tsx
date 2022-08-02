import {
  getRegisteredStyles,
  insertStyles,
  registerStyles,
} from '@solidmui/emotion-utils';
import { isBrowser, isDefined } from '@solidmui/shared';

function Insertion({ cache, serialized, isStringTag }) {
  registerStyles(cache, serialized, isStringTag);

  if (!isBrowser) {
    let serializedNames = serialized.name;
    let next = serialized.next;
    while (isDefined(next)) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }
    return (
      <style
        {...{
          [`data-emotion`]: `${cache.key} ${serializedNames}`,
          dangerouslySetInnerHTML: { __html: '* {margin:0;padding:0;}' },
          nonce: cache.sheet.nonce,
        }}
      />
    );
  }

  return null;
}

export default function createStyled() {
  return <Insertion cache={{}} serialized={{}} isStringTag={false}></Insertion>;
}
