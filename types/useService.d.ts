import { EventObject, State, Interpreter, Typestate, Sender } from 'xstate';
import { Ref } from '@vue/composition-api';
export declare function getServiceSnapshot<
  TService extends Interpreter<any, any, any, any>
>(service: TService): TService['state'];
export declare function useService<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  service:
    | Interpreter<TContext, any, TEvent, TTypestate>
    | Ref<Interpreter<TContext, any, TEvent, TTypestate>>
): {
  state: Ref<State<TContext, TEvent, any, TTypestate>>;
  send: Sender<TEvent>;
};
