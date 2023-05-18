import { createContext, useContext } from "react";

interface ITagContext {
  inputFields: string[];
  setInputFields: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagContext = createContext<ITagContext>({
    inputFields: [],
    setInputFields: () => {}
})

export function useTagContext() {
    return useContext(TagContext);
}

export default TagContext;