/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from '../models/BaseResponse_boolean_';
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_UserContestVO_ } from '../models/BaseResponse_Page_UserContestVO_';
import type { BaseResponse_UserContestVO_ } from '../models/BaseResponse_UserContestVO_';
import type { DeleteRequest } from '../models/DeleteRequest';
import type { UserContestAddRequest } from '../models/UserContestAddRequest';
import type { UserContestQueryRequest } from '../models/UserContestQueryRequest';
import type { UserContestUpdateRequest } from '../models/UserContestUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserContestControllerService {

    /**
     * addUserContest
     * @param userContestAddRequest userContestAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addUserContestUsingPost(
userContestAddRequest: UserContestAddRequest,
): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_contest/add',
            body: userContestAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteUserContest
     * @param deleteRequest deleteRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteUserContestUsingPost(
deleteRequest: DeleteRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_contest/delete',
            body: deleteRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getUserContestVOById
     * @param id id
     * @returns BaseResponse_UserContestVO_ OK
     * @throws ApiError
     */
    public static getUserContestVoByIdUsingGet(
id?: number,
): CancelablePromise<BaseResponse_UserContestVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_contest/get/vo',
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
     * listUserContestVOByPage
     * @param userContestQueryRequest userContestQueryRequest
     * @returns BaseResponse_Page_UserContestVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listUserContestVoByPageUsingPost(
userContestQueryRequest: UserContestQueryRequest,
): CancelablePromise<BaseResponse_Page_UserContestVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_contest/list/page/vo',
            body: userContestQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyUserContestVOByPage
     * @param userContestQueryRequest userContestQueryRequest
     * @returns BaseResponse_Page_UserContestVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listMyUserContestVoByPageUsingPost(
userContestQueryRequest: UserContestQueryRequest,
): CancelablePromise<BaseResponse_Page_UserContestVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_contest/my/list/page/vo',
            body: userContestQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateUserContest
     * @param userContestUpdateRequest userContestUpdateRequest
     * @returns BaseResponse_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateUserContestUsingPost(
userContestUpdateRequest: UserContestUpdateRequest,
): CancelablePromise<BaseResponse_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_contest/update',
            body: userContestUpdateRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
