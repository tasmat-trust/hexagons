import useSWR from "swr"
import { useEffect } from "react";
import Typography from "@material-ui/core/Typography";

export default function DataFetcher({ query, children, variables, setMutate }) {
    const { data, mutate, error } = useSWR([query, variables])

    useEffect(() => {
        if (mutate && setMutate) setMutate({ mutate: mutate })
    }, [mutate])

    if (error) return <Typography>There has been an error fetching the data</Typography>
    if (!data) return <Typography>Loading</Typography>
    return children(data)
}
