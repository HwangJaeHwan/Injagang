export const SERVER = process.env.BACKEND_SERVER_API;

export const AUTH_APIS = {
  INFO_API: `${SERVER}/info`,
  SIGNUP_API: `${SERVER}/signup`,
  SIGNIN_API: `${SERVER}/login`,
  LOGOUT_API: `${SERVER}/logout`,
  TOKKEN_REISSUE_API: `${SERVER}/reissue`,
  NICK_CHNAGE_API: `${SERVER}/nicknameChange`,
  PASSWORD_CHAGNE_API: `${SERVER}/passwordChange`,
};
