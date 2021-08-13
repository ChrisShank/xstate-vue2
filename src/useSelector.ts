import { onBeforeUnmount, shallowRef } from '@vue/composition-api';
import { ActorRef, Subscribable } from 'xstate';
import { defaultGetSnapshot } from './useActor';

export const defaultCompare = (a, b) => a === b;

export function useSelector<
  TActor extends ActorRef<any, any>,
  T,
  TEmitted = TActor extends Subscribable<infer Emitted> ? Emitted : never
>(
  actor: TActor,
  selector: (emitted: TEmitted) => T,
  compare: (a: T, b: T) => boolean = defaultCompare,
  getSnapshot: (a: TActor) => TEmitted = defaultGetSnapshot
) {
  const selected = shallowRef(selector(getSnapshot(actor)));

  let sub = actor.subscribe((emitted) => {
    const nextSelected = selector(emitted);
    if (!compare(selected.value, nextSelected)) {
      selected.value = nextSelected;
    }
  });

  onBeforeUnmount(() => {
    sub.unsubscribe();
  });

  return selected;
}
