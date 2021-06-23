import useSWR from "swr"
import Typography from "@material-ui/core/Typography";

export default function DataFetcher({ query, variables, children }) {
    const { data, error } = useSWR([query, variables])
    if (error) return <Typography>There has been an error fetching the data</Typography>
    if (!data) return <Typography>Loading</Typography>
    return children(data)
}
