import useSWR from "swr"
import { useEffect } from "react";
import Typography from "@material-ui/core/Typography";

export default function DataFetcher({ query, children, variables }) {
    
    const { data, error } = useSWR([query, variables])
 
    if (error) return <Typography>There has been an error fetching the data</Typography>
    if (!data) return <Typography>Loading</Typography>
    if(data[Object.keys(data)[0]].length === 0) return <Typography>No records found.</Typography>
    return `<p>${data.groups[0].name}</p>`
}
