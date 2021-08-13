import { onBeforeUnmount, shallowRef, Ref } from '@vue/composition-api';
import { ActorRef, Subscribable } from 'xstate';
import { defaultGetSnapshot } from './useActor';
import { defaultCompare } from './useSelector';

type SelectorFunction<
  TActor extends ActorRef<any, any>,
  T = any,
  TEmitted = TActor extends Subscribable<infer Emitted> ? Emitted : never
> = (emitted: TEmitted) => T;

type SelectorObject<
  TActor extends ActorRef<any, any>,
  T = any,
  TEmitted = TActor extends Subscribable<infer Emitted> ? Emitted : never
> = {
  selector: SelectorFunction<TActor, T, TEmitted>;
  compare?: (a: T, b: T) => boolean;
  getSnapshot?: (a: TActor) => TEmitted;
};

type Selector<
  TActor extends ActorRef<any, any>,
  T = any,
  TEmitted = TActor extends Subscribable<infer Emitted> ? Emitted : never
> = SelectorFunction<TActor, T, TEmitted> | SelectorObject<TActor, T, TEmitted>;

type ExtractSelectorsToRefs<
  TActor extends ActorRef<any, any>,
  TSelectors extends Record<string, Selector<TActor>>
> = {
  [Key in keyof TSelectors]: TSelectors[Key] extends Selector<TActor, infer T>
    ? Ref<T>
    : never;
};

function isSelectorObject<TActor extends ActorRef<any, any>>(
  selector: Selector<TActor>
): selector is SelectorObject<TActor> {
  return typeof selector === 'object';
}

function normalizeSelectors<TActor extends ActorRef<any, any>>(
  selectors: Record<string, Selector<TActor>>
) {
  return Object.entries(selectors).reduce((acc, [name, selector]) => {
    const selectorObject: SelectorObject<TActor> = isSelectorObject(selector)
      ? selector
      : { selector };

    acc[name] = {
      compare: defaultCompare,
      getSnapshot: defaultGetSnapshot,
      ...selectorObject
    };

    return acc;
  }, {} as Record<string, Required<SelectorObject<TActor>>>);
}

export function useSelectors<
  TActor extends ActorRef<any, any>,
  TSelectors extends Record<string, Selector<TActor>>
>(actor: TActor, selectors: TSelectors) {
  const normalizedSelectors = normalizeSelectors(selectors);

  const selected = Object.entries(normalizedSelectors).reduce(
    (acc, [name, { selector, getSnapshot }]) => {
      acc[name as keyof TSelectors] = shallowRef(selector(getSnapshot(actor)));
      return acc;
    },
    {} as ExtractSelectorsToRefs<TActor, TSelectors>
  );

  let sub = actor.subscribe((emitted) => {
    Object.entries(normalizedSelectors).forEach(
      ([name, { selector, compare }]) => {
        const nextSelected = selector(emitted);
        if (!compare(selected[name].value, nextSelected)) {
          selected[name].value = nextSelected;
        }
      }
    );
  });

  onBeforeUnmount(() => {
    sub?.unsubscribe();
  });

  return selected;
}
