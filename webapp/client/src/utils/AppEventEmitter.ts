// @ts-ignore
import {EventEmitter} from "events";

export class AppEventEmitter {
  private static instance: EventEmitter;

  static getInstance() {
    if(!AppEventEmitter.instance) {
      AppEventEmitter.instance = new EventEmitter();
    }
    return AppEventEmitter.instance;
  }
}
