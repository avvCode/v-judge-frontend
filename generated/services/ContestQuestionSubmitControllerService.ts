/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_ContestQuestionSubmitVO_ } from '../models/BaseResponse_ContestQuestionSubmitVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ContestQuestionSubmitVO_ } from '../models/BaseResponse_Page_ContestQuestionSubmitVO_';
import type { BaseResponse_Page_ContestRankingVO_ } from '../models/BaseResponse_Page_ContestRankingVO_';
import type { ContestQuestionSubmitAddRequest } from '../models/ContestQuestionSubmitAddRequest';
import type { ContestQuestionSubmitQueryRequest } from '../models/ContestQuestionSubmitQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContestQuestionSubmitControllerService {

    /**
     * doContestQuestionSubmit
     * @param contestQuestionSubmitAddRequest contestQuestionSubmitAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doContestQuestionSubmitUsingPost(
contestQuestionSubmitAddRequest: ContestQuestionSubmitAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question_submit/',
            body: contestQuestionSubmitAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getContestQuestionSubmitById
     * @param id id
     * @returns BaseResponse_ContestQuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getContestQuestionSubmitByIdUsingPost(
id?: number,
): CancelablePromise<BaseResponse_ContestQuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question_submit/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listContestQuestionSubmitByPage
     * @param contestQuestionSubmitQueryRequest contestQuestionSubmitQueryRequest
     * @returns BaseResponse_Page_ContestQuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContestQuestionSubmitByPageUsingPost(
contestQuestionSubmitQueryRequest: ContestQuestionSubmitQueryRequest,
): CancelablePromise<BaseResponse_Page_ContestQuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question_submit/list/page',
            body: contestQuestionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getContestRanking
     * @param contestId 
     * @param current 
     * @param pageSize 
     * @param sortField 
     * @param sortOrder 
     * @returns BaseResponse_Page_ContestRankingVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static getContestRankingUsingPost(
contestId?: number,
current?: number,
pageSize?: number,
sortField?: string,
sortOrder?: string,
): CancelablePromise<BaseResponse_Page_ContestRankingVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question_submit/ranking',
            query: {
                'contestId': contestId,
                'current': current,
                'pageSize': pageSize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
