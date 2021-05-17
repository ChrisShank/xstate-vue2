import { render, fireEvent, waitFor } from '@testing-library/vue';
import UseInterpret from './UseInterpret.vue';

describe('useInterpret composable function', () => {
  it('observer should be called with initial state', async () => {
    const { getByTestId } = render(UseInterpret as any);

    const buttonEl = getByTestId('button');
    await waitFor(() => expect(buttonEl.textContent).toContain('Turn on'));
  });

  it('observer should be called with next state', async () => {
    const { getByTestId } = render(UseInterpret as any);

    const buttonEl = getByTestId('button');

    await waitFor(() => expect(buttonEl.textContent).toContain('Turn on'));
    await fireEvent.click(buttonEl);
    await waitFor(() => expect(buttonEl.textContent).toContain('Turn off'));
  });
});
