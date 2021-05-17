const Vue = require('vue');
const {default: CompositionAPI} = require('@vue/composition-api');

Vue.config.productionTip = false
Vue.config.devtools = false

Vue.use(CompositionAPI);