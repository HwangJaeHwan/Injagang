export interface ISignin {
  loginId: string;
  password: string;
}

export interface ICheckOut {
  access: string | undefined;
  refresh: string | undefined;
}

export type ChangeNick = {
  changeNickname: string;
};

export interface IChangePw {
  nowPassword: string;
  changePassword: string;
  chagnePasswordCheck: string;
}

export interface ISignup {
  loginId: string;
  password: string;
  passwordCheck: string;
  email: string;
  nickname: string;
}
