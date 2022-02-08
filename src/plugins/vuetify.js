import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#00dbc6',
        secondary: '#333',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  }
});

export default vuetify;
