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

export const ESSAY_APIS = {
  WRITE_API: `${SERVER}/essay/write`,
  READ_API: `${SERVER}/essay/read/`,
  GET_API: `${SERVER}/essay/`,
  DELETE_API: `${SERVER}/essay/delete/`,
  REVISE_API: `${SERVER}/essay/revise/`,
};

export const BOARD_APIS = {
  WRITE_API: `${SERVER}/board/write`,
  READ_API: `${SERVER}/board/`,
  GET_API: `${SERVER}/board`,
  DELETE_API: `${SERVER}/board/delete/`,
  REVISE_API: `${SERVER}/board/revise`,
};

export const FEED_APIS = {
  WRITE_API: `${SERVER}/board/feedback`,
  REVISE_API: `${SERVER}/board/feedback/revise`,
  GET_API: `${SERVER}/board/feedback/`,
};

export const QUESTIONS_APIS = {
  ADD_API: `${SERVER}/questions/add`,
  GET_API: `${SERVER}/questions`,
  RANDOM_API: `${SERVER}/questions/random`,
  DELETE_API: `${SERVER}/questions`,
};

export const TEMPLATE_APIS = {
  ADD_API: `${SERVER}/template/add`,
  GET_API: `${SERVER}/template`,
  DELTE_API: `${SERVER}/template/`,
};
