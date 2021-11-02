import { TextField, Button } from "@material-ui/core"
import FormControl from '@material-ui/core/FormControl';

import MultipleSelect from "./MultipleSelect";
import { useContext, useState } from "react";


import useSWR from "swr";
import { allGroups } from '../../queries/Groups'

import createPupil from '../forms/handlers/createPupil'
import createTeacher from '../forms/handlers/createTeacher'
import createGroup from '../forms/handlers/createGroup'
import createGuidance from '../forms/handlers/createGuidance'
import updateCapabilityText from '../forms/handlers/updateCapabilityText'
import Alert from "@material-ui/lab/Alert";
import { HexagonsContext } from "../data-fetching/HexagonsContext";
import { getAllOrgs } from "../../queries/Organizations";
import roles from '../../utils/roles'
import { SingleSelect } from "./SingleSelect";
import Loading from "../ui-globals/Loading";
function AddNew(props) {
  const {
    orgs,
    roles,
    userId,
    updateHandler,
    modelname,
    actionName,
    triggerSharedState,
    nameFieldName,
    includeName,
    includeEmail,
    includeText,
    initialTextValue,
    selectItems,
    capabilityId,
    successCallback } = props

  const [loading, setLoading] = useState(false)
  const [selectValue, setSelectValue] = useState([]);
  const [role, setRole] = useState([])
  const [nameValue, setNameValue] = useState('');
  const [textValue, setTextValue] = useState(initialTextValue ? initialTextValue : '');
  const [emailValue, setEmailValue] = useState('');
  const [errorValue, setErrorValue] = useState(false)
  const [successValue, setSuccessValue] = useState(false)

  function validateNames(value) {
    let response = {
    }
    const illegalCharacters = ['!', '"', "£", "$", "^", "&", "<", ">", "*", "|", "~", "#", "{", "}", ";", ":"]
    if (value.length > 30) {
      response.error = {
        message: 'Names must contain fewer than 30 characters.'
      }

      return response
    }

    const gotIllegal = illegalCharacters.filter(char => value.includes(char))
    if (gotIllegal.length > 0) {
      response.error = {
        message: "Names must not include any illegal characters."
      }

      return response
    }

    response.success = true
    return response
  }


  const { gqlClient, orgId } = useContext(HexagonsContext)

  async function handleForm(event) {
    event.preventDefault()
    setLoading(true)
    setErrorValue(false)
    setSuccessValue(false)

    let formData = {}

    if (event.target['text']) {
      formData.text = event.target['text'].value
    }

    if (event.target['email']) {
      formData.email = event.target['email'].value
    }
    if (event.target['username']) {
      formData.username = event.target['username'].value
    }
    if (event.target['name']) {
      const gotValidName = validateNames(nameValue)
      if (gotValidName.error) {
        setErrorValue(gotValidName.error.message)
        setLoading(false)
        return
      }
      formData.name = nameValue
    }
    if (selectItems) {
      const groups = event.target['select-multiple-chip'].value.split(',');
      formData.groups = groups;
    }
    if (roles && role.length === 0) {
      setErrorValue('Please choose a role')
      setLoading(false)
      return
    }
    if (roles && role) {
      formData.role = role;
    }

    const formResult = await updateHandler({
      orgs,
      formData,
      gqlClient,
      orgId,
      userId,
      triggerSharedState,
      capabilityId
    })

    if (formResult.error) {
      handleError(formResult.error)
      if (formResult.success) {
        resetForm('Data saved successfully. Please refresh.')
      }
    } else if (formResult.success) {
      const message = formResult.successMessage ? formResult.successMessage : `${modelname} saved successfully.`
      resetForm(message)
      if (successCallback) {
        successCallback(formResult)
      }
    }
    setLoading(false)
  }

  function handleError(message) {
    setErrorValue(message)
  }

  function resetForm(message) {
    setSuccessValue(message)
    setSelectValue([])
    setNameValue('')
    setTextValue('')
    setEmailValue('')
    setTimeout(() => {
      setSuccessValue('')
    }, 2500)
  }

  return (
    <form id={`new-${modelname}`} onSubmit={handleForm}>
      {errorValue && <Alert data-test-id="error" severity="error">{errorValue}</Alert>}
      {successValue && <Alert data-test-id="success" severity="success">{successValue}</Alert>}
      {loading && <Loading message="Submitting form..." />}
      {!loading && (
        <>
          <FormControl fullWidth required margin="normal">
            {includeName && <TextField
              id={nameFieldName ? nameFieldName : 'name'}
              label="Name"
              value={nameValue}
              required
              onChange={(event) => setNameValue(event.target.value)}
            />}
            {includeText && <TextField
              data-test-id="text-field"
              id='text'
              label='Text'
              required
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
            />}
          </FormControl>
          {includeEmail && (
            <FormControl fullWidth required margin="normal">
              <TextField
                id="email"
                label="Email address"
                value={emailValue}
                required
                onChange={(event) => setEmailValue(event.target.value)}
              />
            </FormControl>
          )}

          {roles && <SingleSelect
            itemLabel="Role"
            selectItems={roles}
            selectValue={role}
            setSelectValue={setRole} />}
          {selectItems && <MultipleSelect itemsLabel="Groups" selectItems={selectItems} selectValue={selectValue} setSelectValue={setSelectValue} />}
          <FormControl margin="normal">
            <Button data-test-id={`add-new-${modelname}`} fullWidth type="submit" variant="contained" color="secondary">
              {actionName ? actionName : 'Add new'} {modelname}
            </Button>
          </FormControl>
        </>
      )}
    </form>
  )
}

function AddNewGroup(props) {
  return (
    <AddNew
      {...props}
      includeName={true}
      updateHandler={createGroup}
      modelname={"group"}
      nameFieldName={'name'}
    />
  )
}

function AddNewGuidance(props) {
  return (
    <AddNew
      {...props}
      includeText={true}
      updateHandler={createGuidance}
      modelname="guidance"
    />
  )
}

function AddNewCapabilityText(props) {
  return (
    <AddNew
      {...props}
      capabilityId={props.capability.id}
      initialTextValue={props.capability.text}
      includeText={true} 
      actionName='Edit'
      updateHandler={updateCapabilityText}
      modelname="capability"
    />
  )
}

function AddNewTeacher(props) {
  const { data } = useSWR(getAllOrgs, { suspense: true })
  return <AddNew orgs={data.organizations} roles={roles}  {...props} />
}

function AddNewUserWithGroups(props) {
  const { variables, userType } = props
  const { data: groupsData } = useSWR([allGroups, variables], { suspense: true })
  const groups = groupsData.groups
  return (
    <>
      {userType === 'teacher' &&

        <AddNewTeacher
          {...props}
          modelname="user"
          updateHandler={createTeacher}
          nameFieldName={'username'}
          includeName={true}
          includeEmail={true}
          selectItems={groups} />

      }
      {userType === 'pupil' && <AddNew
        {...props}
        modelname="pupil"
        includeName={true}
        updateHandler={createPupil}
        nameFieldName={'name'}
        selectItems={groups} />}
    </>
  )
}

export {
  AddNewUserWithGroups,
  AddNewGroup,
  AddNewGuidance,
  AddNewCapabilityText
}