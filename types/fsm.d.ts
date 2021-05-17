import { Ref } from '@vue/composition-api';
import { StateMachine, EventObject, Typestate } from '@xstate/fsm';
export declare function useMachine<
  TContext extends object,
  TEvent extends EventObject = EventObject
>(
  stateMachine: StateMachine.Machine<TContext, TEvent, any>,
  options?: {
    actions?: StateMachine.ActionMap<TContext, TEvent>;
  }
): {
  state: Ref<StateMachine.State<TContext, TEvent, any>>;
  send: StateMachine.Service<TContext, TEvent>['send'];
  service: StateMachine.Service<TContext, TEvent>;
};
export declare function useService<
  TContext extends object,
  TEvent extends EventObject = EventObject,
  TState extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
>(
  service:
    | StateMachine.Service<TContext, TEvent, TState>
    | Ref<StateMachine.Service<TContext, TEvent, TState>>
): {
  state: Ref<StateMachine.State<TContext, TEvent, TState>>;
  send: StateMachine.Service<TContext, TEvent, TState>['send'];
  service: Ref<StateMachine.Service<TContext, TEvent, TState>>;
};
