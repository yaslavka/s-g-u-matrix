/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { onHidden } from './onHidden';

let firstHiddenTime: number;

type HiddenType = {
  readonly timeStamp: number;
};

export const getFirstHidden = (): HiddenType => {
  if (firstHiddenTime === undefined) {
    // If the document is hidden when this code runs, assume it was hidden
    // since navigation start. This isn't a perfect heuristic, but it's the
    // best we can do until an API is available to support querying past
    // visibilityState.
    firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;

    // Update the time if/when the document becomes hidden.
    onHidden(({ timeStamp }) => (firstHiddenTime = timeStamp), true);
  }

  return {
    get timeStamp() {
      return firstHiddenTime;
    },
  };
};
