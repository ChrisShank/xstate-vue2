import {
  EventObject,
  StateMachine,
  State,
  Interpreter,
  InterpreterOptions,
  MachineOptions,
  Typestate,
  Observer
} from 'xstate';
import { UseMachineOptions, MaybeLazy } from './types';
export declare function useInterpret<
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
    Partial<MachineOptions<TContext, TEvent>>,
  observerOrListener?:
    | Observer<State<TContext, TEvent, any, TTypestate>>
    | ((value: State<TContext, TEvent, any, TTypestate>) => void)
): Interpreter<TContext, any, TEvent, TTypestate>;
