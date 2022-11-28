import { isRef, unref, watchEffect, Ref } from "vue";
import { Utils } from "@/utils";
import axios from "axios";
import { DataRepository } from "@/services";

export function runFetchSystem<TResponseType>(url: string | Ref<string>) {
  function runFetch() {
    try {
      /**
       *  reset state before fetching..
       *  data.value = null;
       *  error.value = null;
       */
      // Make the axios fetch.
    } catch (error: unknown) {
      if (Utils.isAxiosError<TResponseType>(error)) {
        // error is properly typed here:
      }
    }

    // unref() unwraps potential refs
    // fetch(unref(url))
    // .then((res) => res.json())
    // .then((json) => (data.value = json))
    // .catch((err) => (error.value = err));
  }

  isRef(url)
    ? watchEffect(runFetch) // setup reactive re-fetch if input URL is a ref
    : runFetch(); // otherwise, just fetch once and avoid the overhead of a watcher

  // return { data, error };
}
