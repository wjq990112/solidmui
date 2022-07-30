import type { Component } from 'solid-js';

import { render } from 'solid-js/web';
import ButtonBaseDemo from './ButtonBase/demo';

const Demo: Component<void> = () => {
  return (
    <div>
      <ButtonBaseDemo />
    </div>
  );
};

render(Demo, document.getElementById('app'));
