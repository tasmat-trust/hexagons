import useSWROriginal from 'swr';

function flattenDataAttributes(obj: any): any {
    if (typeof obj !== 'object' || obj === null) return obj;
  
    if (Array.isArray(obj)) {
      return obj.map(item => flattenDataAttributes(item));
    }
  
    if (obj.hasOwnProperty('data') && Array.isArray(obj.data)) {
      return flattenDataAttributes(obj.data);
    }
  
    const newObj: any = {};
    for (const key in obj) {
      if (key === 'attributes') {
        Object.assign(newObj, flattenDataAttributes(obj[key]));
      } else {
        newObj[key] = flattenDataAttributes(obj[key]);
      }
    }
  
    return newObj;
  }


const useSWR = (query, args) => {
    const {data: originalData, error, mutate} = useSWROriginal(query, args) 
    const data = flattenDataAttributes(originalData)
    return {data, error, mutate}
}

export default useSWR