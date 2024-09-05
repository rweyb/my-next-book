import { atom } from 'recoil';

// サインインユーザーの状態を管理
export const signInUserState = atom({
    key: 'signInUserState',
    default: null,
});