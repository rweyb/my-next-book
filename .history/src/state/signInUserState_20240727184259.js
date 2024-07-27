import { atom } from 'recoil';

// サインインユーザーの状態を管理するRecoilのatom
export const signInUserState = atom({
    key: 'signInUserState',
    default: { uid: '' },
});