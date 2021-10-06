// utils/graphql-test-utils.js

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req
  return (
    body.hasOwnProperty('query') && body.query.includes(operationName)
  )
}


export const hasVariable = (req, variableName, variableValue) => {
  const { body } = req
  return (
    body.hasOwnProperty('variables') && body.variables[variableName] === variableValue
  )
}

// Alias query if operationName matches
export const aliasQuery = (req, operationName, i) => {
  if (hasOperationName(req, operationName)) {
    if (i) {
      req.alias = `gql${operationName}${i}Query`
    } else {
      req.alias = `gql${operationName}Query`
    }
  }
}

// Alias query if operationName matches + specify variables
export const aliasQueryByVariable = (req, operationName, variableName, variableValue) => {
  if (hasOperationName(req, operationName) && hasVariable(req, variableName, variableValue)) {
    req.alias = `gql${operationName}Query`
  }
}

// Alias mutation if operationName matches
export const aliasMutation = (req, operationName) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`
  }
}
