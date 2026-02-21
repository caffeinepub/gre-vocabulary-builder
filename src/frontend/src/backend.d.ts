import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserStats {
    wordsLearned: bigint;
    totalAttempts: bigint;
    correctAnswers: bigint;
}
export interface Question {
    questionWord: string;
    correctAnswerIndex: bigint;
    options: Array<string>;
}
export interface backendInterface {
    addWord(word: string, definition: string, partOfSpeech: string, exampleSentence: string, difficultyLevel: bigint, category: string): Promise<void>;
    getPracticeQuestion(): Promise<Question>;
    getUserStats(user: Principal): Promise<UserStats>;
    submitAnswer(isCorrect: boolean): Promise<boolean>;
}
