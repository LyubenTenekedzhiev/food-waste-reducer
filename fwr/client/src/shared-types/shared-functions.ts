import { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync } from "react-async-hook";

// Generic reusable hook
const useDebouncedSearch = (searchFunction: (payload: string, type?: string) => void) => {
  const [inputText, setInputText] = useState("");

  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, 600));

  const searchResults = useAsync(async () => {
    if (inputText.length === 0 && !inputText) {
      return "";
    } else {
      return debouncedSearchFunction(inputText);
    }
  }, [debouncedSearchFunction, inputText]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
};

export default useDebouncedSearch;
