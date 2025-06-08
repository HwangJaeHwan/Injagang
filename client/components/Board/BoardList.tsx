import React from "react";
import BoardListItem from "./BoardListItem";

interface BoardListProps<T> {
  boardInfos: T[];
  idKey: keyof T;
  displayKeys: (keyof T)[];
  route?: string;
}

const BoardList = <T,>({
  boardInfos,
  idKey,
  displayKeys,
  route,
}: BoardListProps<T>) => {

  return (
    <>
      {boardInfos?.map(info => (
        <BoardListItem
          key={String(info[idKey])}
          item={info}
          idKey={idKey}
          displayKeys={displayKeys}
          route={route}
        />
      ))}
    </>
  );
};

export default BoardList;
