import {ɵisObservable as isObservable, ɵisPromise as isPromise} from '@angular/core';
import {Observable, from, of } from 'rxjs';

/**
 * from: https://github.com/angular/angular/blob/b72fce8acf01639438df5ef92473e088f35e2e94/packages/router/src/utils/collection.ts#L110
 */
export function wrapIntoObservable<T>(value: T | Promise<T>| Observable<T>): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    // Use `Promise.resolve()` to wrap promise-like instances.
    // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
    // change detection.
    return from(Promise.resolve(value));
  }

  return of (value);
}
