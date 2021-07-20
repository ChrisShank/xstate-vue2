<template>
  <button data-testid="count" @click="send({ type: 'INC' })">
    {{ count }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useActor, useSpawn } from '../src';
import { fromReducer } from 'xstate/lib/behaviors';

const reducer = (state: number, event: { type: 'INC' }): number => {
  if (event.type === 'INC') {
    return state + 1;
  }
  return state;
};

const behavior = fromReducer(reducer, 0);

export default defineComponent({
  setup() {
    const actorRef = useSpawn(behavior);
    const { state: count, send } = useActor(actorRef);
    return { count, send };
  }
});
</script>
