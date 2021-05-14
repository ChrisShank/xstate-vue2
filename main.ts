import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

import UseActor from './test/UseActor.vue';

new Vue({
  el: '#app',
  render: (h) => h(UseActor)
});
