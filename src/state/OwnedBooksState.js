import { atom } from 'recoil';

//自分の持っている本IDの配列を保持
export const OwnedBooksState = atom({
    key: 'OwnedBooksState',
    default: [],
});