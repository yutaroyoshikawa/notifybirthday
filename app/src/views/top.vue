<template>
  <div class="entire">
    <div class="wrap">
      <h1 class="title">Notify Birthday!</h1>
      <figure class="icon-box"><img class="icon" src="../assets/NotifyBirthday.png" alt="icon"></figure>
      <a-form @submit.prevent class="form">
        <a-input
          @change="setName"
          :text="name"
          placeholder="なまえ"
        />
        <a-datepicker
          @change="setBirthday"
          :value="birthday"
          format="YYYY/MM/DD"
        />
        <a-button
          type="dashed"
          @click="hundleSend"
          :loading="isSending"
          :disabled="isSend"
        >
          送信
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Top from '@/stores/modules/top';
import { Button, DatePicker, Form, Input } from 'ant-design-vue';
import moment, { Moment } from 'moment';

@Component({
  components: {
    'a-button': Button,
    'a-datepicker': DatePicker,
    'a-form': Form,
    'a-input': Input,
  },
})
export default class extends Vue {
  private get birthday() {
    return Top.birthday;
  }

  private get name() {
    return Top.name;
  }

  private get isSending() {
    return Top.isSending;
  }

  public setBirthday(date: Moment, dateString: string) {
    Top.newBirthday(date);
  }

  public setName(e: any) {
    Top.newName(e.target.value);
  }

  public hundleSend = async () => {
    Top.sendServer();
  }

  public isSend() {
    return this.name ? false : true;
  }
}
</script>

<style>
@media screen and (min-width:300px) {
  .wrap {
    width: 90vw;
    height: 90vw;
    min-width: 300px;
    min-height: 300px;
  }

  .title {
    font-size: 20px;
  }

  .icon-box {
    width: 50px;
    height: 50px;
  }

  .form {
    height: 150px;
  }
}

@media screen and (min-width:768px) and (max-width:1024px) {
  .wrap {
    width: 90vw;
    height: 90vw;
    min-width: 500px;
    min-height: 500px;
  }
  .icon-box {
    width: 100px;
    height: 100px;
  }
  .form {
    height: 200px;
  }
}

@media screen and (min-width:1024px) {
  .wrap {
    width: 50vh;
    height: 50vh;
    min-width: 500px;
    min-height: 500px;
  }

  .icon-box {
    width: 100px;
    height: 100px;
  }
  .form {
    height: 200px;
  }
}

.entire {
  width: 100vw;
  height: 100vh;
  background-color: #abdbd9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.title {
  color: #FFF;
}

.icon-box {
  border-radius: 50%;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 50%;
}

.form {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.wrap {
  border: solid 1px #FFF;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>

