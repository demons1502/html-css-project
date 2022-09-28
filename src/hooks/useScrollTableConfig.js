import {useState, useEffect} from 'react';
import useWindowSize from './useWindowSize';

export default function useScrollTableConfig(ref, dependencies) {
  const size = useWindowSize();
  const [scrollConfig, setScrollConfig] = useState({});

  useEffect(() => {
    // console.log(dependencies)
    // if (dependencies.length > 0) {
    let parentHeight = ref.current.parentElement.parentElement.clientHeight
    const allEl = ref.current.parentNode.childNodes
    let totalHeight = 0
    let siblingHeight = 0
    let scroll = {}
    console.log(ref, Object.getOwnPropertyDescriptor(ref.current, 'offsetHeight'));
    allEl.forEach(element => {
      if (ref.current !== element) {
        siblingHeight += element.clientHeight
      }
  
      totalHeight += element.clientHeight
    })
    
    if (size.width < size.height) {
      parentHeight = parentHeight/2
    }

    if (totalHeight > parentHeight) {
      const heightScroll = parentHeight - (siblingHeight + 70);
      scroll = {y: heightScroll, scrollToFirstRowOnChange: false}
    }
    // setScrollConfig(scroll)
    // }
   
  }, []);

  return scrollConfig;
}