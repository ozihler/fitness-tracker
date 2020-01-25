import {SetRaw} from "./SetRaw";
import {Set} from "./Set";

export class SetFactory {
  static from(setRaw: SetRaw): Set {
    return {
      ...setRaw
    };
  }
}
