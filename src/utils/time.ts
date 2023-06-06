export class TimeUtil {
  /**
   * Shortens the 64 digit addess
   */
  static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
