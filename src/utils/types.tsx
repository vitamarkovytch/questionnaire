export interface Questionnaire {
  question: string;
  answers?: string[];
  required?: boolean;
  additionalQuestion?: string;
}

export interface FormProps {
  questions: Questionnaire[];
}

export interface FormValues {
  [key: string]: string;
}

export type SkeletonProps = {
  boxesHeight: number[];
};

export type ErrorMessageProps = {
  text: string;
};
