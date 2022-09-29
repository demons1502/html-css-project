import {useState, useEffect} from 'react';
import useWindowSize from './useWindowSize';

export default function useScrollTableConfig(ref, depends) {
  const size = useWindowSize();
  const [scrollConfig, setScrollConfig] = useState({});
  
  useEffect(() => {
    let parentHeight = ref.current.parentElement.parentElement.clientHeight
    const allEl = ref.current.parentNode.childNodes
    let siblingHeight = 0
    let scroll = {}
    allEl.forEach(element => {
      if (ref.current !== element) {
        siblingHeight += element.offsetHeight
      }
    })
    
    if (size.width < size.height) {
      parentHeight = parentHeight/2
    }
  
    if ((siblingHeight + (depends.length * 41)) > parentHeight) {
      const heightScroll = parentHeight - (siblingHeight + 70);
      scroll = {y: heightScroll, scrollToFirstRowOnChange: false}
    }
    setScrollConfig(scroll)
  }, [size, depends]);

  return scrollConfig;
}