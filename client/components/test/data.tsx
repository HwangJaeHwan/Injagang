export const assayListData = Array(10)
  .fill(0)
  .map((_, i) => {
    [
      {
        essayId: i + 1,
        title: `test title${i}`,
        qnaList: Array(5)
          .fill(0)
          .map((_, i) => [
            {
              question: `test${i + 1}`,
              answer: `answer${i + 1}`,
              quna: i + 1,
            },
          ]),
      },
    ];
  });
