/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ContestQuestion_ } from '../models/BaseResponse_ContestQuestion_';
import type { BaseResponse_ContestQuestionVO_ } from '../models/BaseResponse_ContestQuestionVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ContestQuestion_ } from '../models/BaseResponse_Page_ContestQuestion_';
import type { BaseResponse_Page_ContestQuestionVO_ } from '../models/BaseResponse_Page_ContestQuestionVO_';
import type { ContestQuestionAddRequest } from '../models/ContestQuestionAddRequest';
import type { ContestQuestionEditRequest } from '../models/ContestQuestionEditRequest';
import type { ContestQuestionQueryRequest } from '../models/ContestQuestionQueryRequest';
import type { ContestQuestionUpdateRequest } from '../models/ContestQuestionUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContestQuestionControllerService {

    /**
     * addContestQuestion
     * @param contestQuestionAddRequest contestQuestionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addContestQuestionUsingPost(
contestQuestionAddRequest: ContestQuestionAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/add',
            body: contestQuestionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteContestQuestion
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteContestQuestionUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * editContestQuestion
     * @param contestQuestionEditRequest contestQuestionEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editContestQuestionUsingPost(
contestQuestionEditRequest: ContestQuestionEditRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/edit',
            body: contestQuestionEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getContestQuestionVOById
     * @param id id
     * @returns BaseResponse_ContestQuestionVO_ OK
     * @throws ApiError
     */
    public static getContestQuestionVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_ContestQuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contest_question/get',
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
     * getContestQuestionById
     * @param id id
     * @returns BaseResponse_ContestQuestion_ OK
     * @throws ApiError
     */
    public static getContestQuestionByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_ContestQuestion_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contest_question/get/vo',
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
     * listContestQuestionByPage
     * @param contestQuestionQueryRequest contestQuestionQueryRequest
     * @returns BaseResponse_Page_ContestQuestion_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContestQuestionByPageUsingPost(
contestQuestionQueryRequest: ContestQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_ContestQuestion_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/list/page',
            body: contestQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listContestQuestionVOByPage
     * @param contestQuestionQueryRequest contestQuestionQueryRequest
     * @returns BaseResponse_Page_ContestQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContestQuestionVoByPageUsingPost(
contestQuestionQueryRequest: ContestQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_ContestQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/list/page/vo',
            body: contestQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyContestQuestionVOByPage
     * @param contestQuestionQueryRequest contestQuestionQueryRequest
     * @returns BaseResponse_Page_ContestQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyContestQuestionVoByPageUsingPost(
contestQuestionQueryRequest: ContestQuestionQueryRequest,
): CancelablePromise<BaseResponse_Page_ContestQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/my/list/page/vo',
            body: contestQuestionQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateContestQuestion
     * @param contestQuestionUpdateRequest contestQuestionUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateContestQuestionUsingPost(
contestQuestionUpdateRequest: ContestQuestionUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest_question/update',
            body: contestQuestionUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
