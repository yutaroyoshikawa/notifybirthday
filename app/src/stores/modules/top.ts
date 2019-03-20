import { getModule, Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from '@/stores/store';
import { registInfo } from '@/firebase/top';
import moment, { Moment } from 'moment';
import { notification } from 'ant-design-vue';

export interface IStoreState {
    name: string;
    birthday: Moment;
    isSending: boolean;
}

@Module({ dynamic: true, store, name: 'Top', namespaced: true })
class Top extends VuexModule implements IStoreState {
    public name = '';
    public birthday = moment();
    public isSending = false;

    @Mutation
    public setBirthday(payload: Moment) {
        this.birthday = payload;
    }
    @Mutation
    public setName(payload: string) {
        this.name = payload;
    }
    @Mutation
    public setSending(payload: boolean) {
        this.isSending = payload;
    }

    @Action({ commit: 'setBirthday' })
    public newBirthday(payload: Moment) {
        return payload;
    }
    @Action({ commit: 'setName' })
    public newName(payload: string) {
        return payload;
    }
    @Action({ commit: 'setSending' })
    public newSending(payload: boolean) {
        return payload;
    }
    @Action
    public async sendServer() {
        try {
            await this.setSending(true);
            await registInfo(this.name, this.birthday.toDate());
            await this.setSending(false);
            await this.setName('');
            await notification.success({
                key: 'updatable',
                message: '登録',
                description: '誕生日を登録しました。',
            });
        } catch (e) {
            await this.setSending(false);
            await notification.error({
                key: 'updatable',
                message: 'エラー',
                description: '登録失敗しました。error:' + e,
            });
        }
    }
}

export default getModule(Top);
