import { json, urlencoded } from "body-parser";
import { ErrorHandler } from "./error-handler.middleware";
import { CheckAndCacheID } from "./cache-id.middleware";
import { UnCacheID } from "./uncache-id.middleware";

export abstract class Middlewares {
  static Json = () => {
    return json({ inflate: true, limit: "1mb", strict: true, type: "*/json" });
  };

  static UrlEncoded = () => {
    return urlencoded({ extended: true, limit: "1mb", inflate: true });
  };

  static ErrorHandler = ErrorHandler;
  static CheckAndCacheID = CheckAndCacheID;
  static UnCacheID = UnCacheID;
}
