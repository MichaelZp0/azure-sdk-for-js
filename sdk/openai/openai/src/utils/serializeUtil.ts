// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatRequestUserMessage as ChatRequestUserMessageRest,
  ChatRequestAssistantMessage as ChatRequestAssistantMessageRest,
  ChatRequestToolMessage as ChatRequestToolMessageRest,
  ChatRequestMessage as ChatRequestMessageRest,
  ChatMessageImageContentItem as ChatMessageImageContentItemRest,
  ChatMessageContentItem as ChatMessageContentItemRest,
} from "../rest/index.js";
import {
  ChatRequestUserMessage,
  ChatRequestAssistantMessage,
  ChatRequestToolMessage,
  ChatRequestMessageUnion,
  ChatMessageImageContentItem,
  ChatMessageContentItemUnion,
} from "../models/models.js";
import { snakeCaseKeys } from "../api/util.js";

/** serialize function for ChatRequestUserMessage */
function serializeChatRequestUserMessage(obj: ChatRequestUserMessage): ChatRequestUserMessageRest {
  return {
    role: obj["role"],
    content:
      typeof obj["content"] === "string"
        ? obj["content"]
        : obj["content"].map(serializeChatRequestContentItemUnion),
    name: obj["name"],
  };
}

/** serialize function for ChatMessageImageContentItem */
function serializeChatRequestContentItemUnion(
  obj: ChatMessageContentItemUnion,
): ChatMessageContentItemRest {
  switch (obj.type) {
    case "image_url":
      return serializeChatMessageImageContentItem(obj as ChatMessageImageContentItem);
    default:
      return obj;
  }
}
/** serialize function for ChatRequestAssistantMessage */
function serializeChatRequestAssistantMessage(
  obj: ChatRequestAssistantMessage,
): ChatRequestAssistantMessageRest {
  if (obj.content === undefined) {
    obj.content = null;
  }
  const { functionCall, toolCalls, ...rest } = obj;
  return {
    ...snakeCaseKeys(rest),
    ...(!toolCalls || toolCalls.length === 0 ? {} : { tool_calls: toolCalls }),
    ...(functionCall ? { function_call: functionCall } : {}),
  };
}

/** serialize function for ChatRequestToolMessage */
function serializeChatRequestToolMessage(obj: ChatRequestToolMessage): ChatRequestToolMessageRest {
  return {
    role: obj["role"],
    content: obj["content"],
    tool_call_id: obj["toolCallId"],
  };
}

/** serialize function for ChatRequestMessageUnion */
export function serializeChatRequestMessageUnion(
  obj: ChatRequestMessageUnion,
): ChatRequestMessageRest {
  switch (obj.role) {
    case "user":
      return serializeChatRequestUserMessage(obj as ChatRequestUserMessage);
    case "assistant":
      return serializeChatRequestAssistantMessage(obj as ChatRequestAssistantMessage);
    case "tool":
      return serializeChatRequestToolMessage(obj as ChatRequestToolMessage);
    default:
      return obj;
  }
}

/** serialize function for ChatMessageImageContentItem */
function serializeChatMessageImageContentItem(
  obj: ChatMessageImageContentItem,
): ChatMessageImageContentItemRest {
  return {
    type: obj["type"],
    image_url: { url: obj.imageUrl["url"], detail: obj.imageUrl["detail"] },
  };
}

/** serialize function for ChatMessageContentItemUnion */
export function serializeChatMessageContentItemUnion(
  obj: ChatMessageContentItemUnion,
): ChatMessageContentItemRest {
  switch (obj.type) {
    case "image_url":
      return serializeChatMessageImageContentItem(obj as ChatMessageImageContentItem);
    default:
      return obj;
  }
}
