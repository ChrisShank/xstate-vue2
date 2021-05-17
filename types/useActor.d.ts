import { ActorRef, EventObject, Sender } from 'xstate';
import { Ref } from '@vue/composition-api';
export declare function isActorWithState<T extends ActorRef<any>>(
  actorRef: T
): actorRef is T & {
  state: any;
};
declare type EventOfActorRef<TActor extends ActorRef<any, any>> =
  TActor extends ActorRef<infer TEvent, any> ? TEvent : never;
declare type EmittedOfActorRef<TActor extends ActorRef<any, any>> =
  TActor extends ActorRef<any, infer TEmitted> ? TEmitted : never;
export declare function useActor<TActor extends ActorRef<any, any>>(
  actorRef: TActor | Ref<TActor>,
  getSnapshot?: (actor: TActor) => EmittedOfActorRef<TActor>
): {
  state: Ref<EmittedOfActorRef<TActor>>;
  send: Sender<EventOfActorRef<TActor>>;
};
export declare function useActor<TEvent extends EventObject, TEmitted>(
  actorRef: ActorRef<TEvent, TEmitted> | Ref<ActorRef<TEvent, TEmitted>>,
  getSnapshot?: (actor: ActorRef<TEvent, TEmitted>) => TEmitted
): {
  state: Ref<TEmitted>;
  send: Sender<TEvent>;
};
export {};
