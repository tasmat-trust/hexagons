import useSWR from "swr"

const useStateOnce = (key) => {
  const { data, error } = useSWR(key)
  return [data, error]
}

export default useStateOnce