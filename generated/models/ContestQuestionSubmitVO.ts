/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContestQuestionVO } from './ContestQuestionVO';
import type { JudgeInfo } from './JudgeInfo';
import type { UserVO } from './UserVO';

export type ContestQuestionSubmitVO = {
    code?: string;
    contestQuestionVO?: ContestQuestionVO;
    createTime?: string;
    id?: number;
    judgeInfo?: JudgeInfo;
    language?: string;
    questionId?: number;
    result?: number;
    status?: number;
    updateTime?: string;
    userId?: number;
    userVO?: UserVO;
};
