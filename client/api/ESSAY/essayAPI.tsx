import { ESSAY_APIS } from "../config";
import { fetcher, METHOD } from "../client";
import { IReviseEssayList, IWriteEssayList } from "@/types/essay/EssayType";

export const readEssayListAPI = async (targetId: number) => {
  return fetcher(METHOD.GET, `${ESSAY_APIS.READ_API}${targetId}`);
};

export const getEssayListAPI = async (targetId: number) => {
  return fetcher(METHOD.GET, `${ESSAY_APIS.GET_API}${targetId}`);
};

export const addEssayAPI = async (essayPayload: IWriteEssayList) => {
  return fetcher(METHOD.POST, ESSAY_APIS.WRITE_API, essayPayload);
};

export const reviseEssayAPI = async (
  targetId: number,
  essayPayload: IReviseEssayList,
) => {
  return fetcher(
    METHOD.PATCH,
    `${ESSAY_APIS.REVISE_API}${targetId}`,
    essayPayload,
  );
};

export const deleteEssayAPI = async (targetId: number) => {
  return fetcher(METHOD.DELETE, `${ESSAY_APIS.DELETE_API}${targetId}`);
};
