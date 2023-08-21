/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';

export type ContestQuestionVO = {
    acceptedNum?: number;
    content?: string;
    createTime?: string;
    id?: number;
    judgeConfig?: JudgeConfig;
    rate?: number;
    submitNum?: number;
    tags?: Array<string>;
    title?: string;
    updateTime?: string;
    userVO?: UserVO;
};
