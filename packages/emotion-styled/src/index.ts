import createStyled from './base';
import tags from './tags';

// @ts-ignore
const styled = createStyled.bind();

tags.forEach((tagName) => {
  styled[tagName] = styled(tagName);
});

export default styled;
