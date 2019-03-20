<template>
  <div id="app">
    <a-localeprovider :locale="locale">
      <router-view/>
    </a-localeprovider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LocaleProvider } from 'ant-design-vue';
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP';

@Component({
  components: {
    'a-localeprovider': LocaleProvider,
  },
  data() {
    return {
      locale: jaJP,
    };
  },
})
export default class extends Vue {
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
