
export class BaseResponse<T> {
  success: boolean;
  resource: T;
  message: string;

  constructor(arg: string | T) {
    if (typeof arg === 'string') {
      this.success = false;
      this.message = arg;
      this.resource = null;
    } else {
      this.success = true;
      this.message = '';
      this.resource = arg;
    }
  }
}
