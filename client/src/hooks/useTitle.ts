import  { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `Samridhi Studio | ${title}`;
  }, [title]);
};

export default useTitle;
