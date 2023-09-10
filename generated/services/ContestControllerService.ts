/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_ContestVO_ } from '../models/BaseResponse_ContestVO_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_ContestVO_ } from '../models/BaseResponse_Page_ContestVO_';
import type { ContestAddRequest } from '../models/ContestAddRequest';
import type { ContestEditRequest } from '../models/ContestEditRequest';
import type { ContestQueryRequest } from '../models/ContestQueryRequest';
import type { ContestUpdateRequest } from '../models/ContestUpdateRequest';
import type { DeleteRequest } from '../models/DeleteRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ContestControllerService {

    /**
     * addContest
     * @param contestAddRequest contestAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addContestUsingPost(
contestAddRequest: ContestAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest/question_contest/add',
            body: contestAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteContest
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteContestUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest/question_contest/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * editContest
     * @param contestEditRequest contestEditRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static editContestUsingPost(
contestEditRequest: ContestEditRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest/question_contest/edit',
            body: contestEditRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getContestVOById
     * @param id id
     * @returns BaseResponse_ContestVO_ OK
     * @throws ApiError
     */
    public static getContestVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_ContestVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contest/question_contest/get/vo',
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
     * listContestVOByPage
     * @param contestQueryRequest contestQueryRequest
     * @returns BaseResponse_Page_ContestVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listContestVoByPageUsingPost(
contestQueryRequest: ContestQueryRequest,
): CancelablePromise<BaseResponse_Page_ContestVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest/question_contest/list/page/vo',
            body: contestQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyContestVOByPage
     * @param contestQueryRequest contestQueryRequest
     * @returns BaseResponse_Page_ContestVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyContestVoByPageUsingPost(
contestQueryRequest: ContestQueryRequest,
): CancelablePromise<BaseResponse_Page_ContestVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest/question_contest/my/list/page/vo',
            body: contestQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateContest
     * @param contestUpdateRequest contestUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateContestUsingPost(
contestUpdateRequest: ContestUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contest/question_contest/update',
            body: contestUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
