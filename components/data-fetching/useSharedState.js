import useSWR from "swr"

const useSharedState = (key, initial) => {
  const { data: state, mutate: setState, error } = useSWR(key, {
    initialData: initial
  })
  return [state, setState, error]
}

export default useSharedState