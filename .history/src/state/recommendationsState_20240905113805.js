import { atom } from "recoil";

export const recommendationsState = atom({
  key: "recommendationsState",
  default: [], // 初期値として空の配列
});
