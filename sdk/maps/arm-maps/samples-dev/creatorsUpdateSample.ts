/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  CreatorUpdateParameters,
  AzureMapsManagementClient
} from "@azure/arm-maps";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 *
 * @summary Updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags.
 * x-ms-original-file: specification/maps/resource-manager/Microsoft.Maps/preview/2021-12-01-preview/examples/UpdateMapsCreator.json
 */
async function updateCreatorResource() {
  const subscriptionId = "21a9967a-e8a9-4656-a70b-96ff1c4d05a0";
  const resourceGroupName = "myResourceGroup";
  const accountName = "myMapsAccount";
  const creatorName = "myCreator";
  const creatorUpdateParameters: CreatorUpdateParameters = {
    storageUnits: 10,
    tags: { specialTag: "true" }
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMapsManagementClient(credential, subscriptionId);
  const result = await client.creators.update(
    resourceGroupName,
    accountName,
    creatorName,
    creatorUpdateParameters
  );
  console.log(result);
}

updateCreatorResource().catch(console.error);