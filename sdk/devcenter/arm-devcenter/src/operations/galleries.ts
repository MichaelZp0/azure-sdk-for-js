/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { Galleries } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { DevCenterClient } from "../devCenterClient";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  Gallery,
  GalleriesListByDevCenterNextOptionalParams,
  GalleriesListByDevCenterOptionalParams,
  GalleriesListByDevCenterResponse,
  GalleriesGetOptionalParams,
  GalleriesGetResponse,
  GalleriesCreateOrUpdateOptionalParams,
  GalleriesCreateOrUpdateResponse,
  GalleriesDeleteOptionalParams,
  GalleriesListByDevCenterNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing Galleries operations. */
export class GalleriesImpl implements Galleries {
  private readonly client: DevCenterClient;

  /**
   * Initialize a new instance of the class Galleries class.
   * @param client Reference to the service client
   */
  constructor(client: DevCenterClient) {
    this.client = client;
  }

  /**
   * Lists galleries for a devcenter.
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param options The options parameters.
   */
  public listByDevCenter(
    resourceGroupName: string,
    devCenterName: string,
    options?: GalleriesListByDevCenterOptionalParams
  ): PagedAsyncIterableIterator<Gallery> {
    const iter = this.listByDevCenterPagingAll(
      resourceGroupName,
      devCenterName,
      options
    );
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByDevCenterPagingPage(
          resourceGroupName,
          devCenterName,
          options
        );
      }
    };
  }

  private async *listByDevCenterPagingPage(
    resourceGroupName: string,
    devCenterName: string,
    options?: GalleriesListByDevCenterOptionalParams
  ): AsyncIterableIterator<Gallery[]> {
    let result = await this._listByDevCenter(
      resourceGroupName,
      devCenterName,
      options
    );
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByDevCenterNext(
        resourceGroupName,
        devCenterName,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByDevCenterPagingAll(
    resourceGroupName: string,
    devCenterName: string,
    options?: GalleriesListByDevCenterOptionalParams
  ): AsyncIterableIterator<Gallery> {
    for await (const page of this.listByDevCenterPagingPage(
      resourceGroupName,
      devCenterName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists galleries for a devcenter.
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param options The options parameters.
   */
  private _listByDevCenter(
    resourceGroupName: string,
    devCenterName: string,
    options?: GalleriesListByDevCenterOptionalParams
  ): Promise<GalleriesListByDevCenterResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, devCenterName, options },
      listByDevCenterOperationSpec
    );
  }

  /**
   * Gets a gallery
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param galleryName The name of the gallery.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesGetOptionalParams
  ): Promise<GalleriesGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, devCenterName, galleryName, options },
      getOperationSpec
    );
  }

  /**
   * Creates or updates a gallery.
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param galleryName The name of the gallery.
   * @param body Represents a gallery.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    body: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<GalleriesCreateOrUpdateResponse>,
      GalleriesCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<GalleriesCreateOrUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, devCenterName, galleryName, body, options },
      createOrUpdateOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates a gallery.
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param galleryName The name of the gallery.
   * @param body Represents a gallery.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    body: Gallery,
    options?: GalleriesCreateOrUpdateOptionalParams
  ): Promise<GalleriesCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      devCenterName,
      galleryName,
      body,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes a gallery resource.
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param galleryName The name of the gallery.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { resourceGroupName, devCenterName, galleryName, options },
      deleteOperationSpec
    );
    const poller = new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "azure-async-operation"
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a gallery resource.
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param galleryName The name of the gallery.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    devCenterName: string,
    galleryName: string,
    options?: GalleriesDeleteOptionalParams
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      devCenterName,
      galleryName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByDevCenterNext
   * @param resourceGroupName Name of the resource group within the Azure subscription.
   * @param devCenterName The name of the devcenter.
   * @param nextLink The nextLink from the previous successful call to the ListByDevCenter method.
   * @param options The options parameters.
   */
  private _listByDevCenterNext(
    resourceGroupName: string,
    devCenterName: string,
    nextLink: string,
    options?: GalleriesListByDevCenterNextOptionalParams
  ): Promise<GalleriesListByDevCenterNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, devCenterName, nextLink, options },
      listByDevCenterNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByDevCenterOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.Gallery
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.Gallery
    },
    201: {
      bodyMapper: Mappers.Gallery
    },
    202: {
      bodyMapper: Mappers.Gallery
    },
    204: {
      bodyMapper: Mappers.Gallery
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.body5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DevCenter/devcenters/{devCenterName}/galleries/{galleryName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.galleryName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByDevCenterNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.GalleryListResult
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.top],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.devCenterName,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};