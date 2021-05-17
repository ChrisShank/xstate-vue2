import { Ref } from '@vue/composition-api';
import {
  EventObject,
  StateMachine,
  State,
  Interpreter,
  InterpreterOptions,
  MachineOptions,
  Typestate
} from 'xstate';
import { UseMachineOptions, MaybeLazy } from './types';
export declare function useMachine<
  TContext,
  TEvent extends EventObject,
  TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  getMachine: MaybeLazy<StateMachine<TContext, any, TEvent, TTypestate>>,
  options?: Partial<InterpreterOptions> &
    Partial<UseMachineOptions<TContext, TEvent>> &
    Partial<MachineOptions<TContext, TEvent>>
): {
  state: Ref<State<TContext, TEvent, any, TTypestate>>;
  send: Interpreter<TContext, any, TEvent, TTypestate>['send'];
  service: Interpreter<TContext, any, TEvent, TTypestate>;
};
