/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JudgeCase } from './JudgeCase';
import type { JudgeConfig } from './JudgeConfig';

export type ContestQuestionEditRequest = {
    answer?: string;
    content?: string;
    contestId?: number;
    displayId?: string;
    id?: number;
    judgeCase?: Array<JudgeCase>;
    judgeConfig?: JudgeConfig;
    rate?: number;
    tags?: Array<string>;
    title?: string;
    userId?: number;
};
