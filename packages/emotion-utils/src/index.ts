import { isBrowser, isDefined, isUndefined } from '@solidmui/shared';

export type RegisteredCache = { [key: string]: string };
export type Interpolation = any;
export type SerializedStyles = {
  name: string;
  styles: string;
  map?: string;
  next?: SerializedStyles;
};
export type EmotionCache = {
  inserted: { [key: string]: string | true };
  registered: RegisteredCache;
  sheet: StyleSheet;
  key: string;
  compat?: true;
  nonce?: string;
  insert: (
    selector: string,
    serialized: SerializedStyles,
    sheet: StyleSheet,
    shouldCache: boolean
  ) => string | void;
};

export function getRegisteredStyles(
  registered: RegisteredCache,
  registeredStyles: string[],
  classNames: string
) {
  let rawClassName = '';

  classNames.split(' ').forEach((className) => {
    if (isDefined(registered[className])) {
      registeredStyles.push(`${registered[className]};`);
    } else {
      rawClassName += `${className} `;
    }
  });

  return rawClassName;
}

export function registerStyles(
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
) {
  let className = `${cache.key}-${serialized.name}`;

  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false ||
      // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      (isBrowser === false && isDefined(cache.compat))) &&
    isUndefined(cache.registered[className])
  ) {
    cache.registered[className] = serialized.styles;
  }
}

export function insertStyles(
  cache: EmotionCache,
  serialized: SerializedStyles,
  isStringTag: boolean
) {
  registerStyles(cache, serialized, isStringTag);

  let className = `${cache.key}-${serialized.name}`;

  if (isUndefined(cache.inserted[serialized.name])) {
    let stylesForSSR = '';
    let current = serialized;
    do {
      let maybeStyles = cache.insert(
        serialized === current ? `.${className}` : '',
        current,
        cache.sheet,
        true
      );
      if (!isBrowser && isDefined(maybeStyles)) {
        stylesForSSR += maybeStyles;
      }
      current = current.next;
    } while (isDefined(current));
    if (!isBrowser && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
}
