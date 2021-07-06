import useSWR from "swr"

export default async function useGraph(query, variables) {
  const { data, error } = useSWR([query, variables])
  console.log(data, error)
  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}