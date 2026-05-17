export type ContrastGrade = {
  ratio: number;
  aaNormalText: boolean;
  aaLargeText: boolean;
  aaaNormalText: boolean;
  aaaLargeText: boolean;
};

export type ContrastMatrixCell = {
  fromSwatchId: string;
  toSwatchId: string;
  grade: ContrastGrade;
};

export type ContrastMatrix = ContrastMatrixCell[];
