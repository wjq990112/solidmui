import { mount } from '@soliduse/shared';

import ButtonBase from '.';

describe('ButtonBase', () => {
  it('should be in the document', () => {
    const { queryByText } = mount(() => <ButtonBase />);
    expect(queryByText(/hello world/i)).toBeInTheDocument();
  });
});
