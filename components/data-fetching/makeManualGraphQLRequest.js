import axios from 'axios';
export default async function makeManualGraphQLRequest({strapiToken, query, variables}) {
  try {
    const headers = {
      Authorization: `Bearer ${strapiToken}`,
    };
    const q = {
      query: query,
    };
    if (variables) {
      q.variables = variables
    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, q, {
      headers: headers,
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
