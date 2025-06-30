import {
  createTeacherQuery,
  emailTeacherCredentials,
  singleTeacher,
  getServerEntropy,
} from '../../../queries/Teachers';
import getPermittedDomains from '../../../utils/getPermittedDomains';
import generatePassword from '../../../utils/generatePassword';
import roles from '../../../utils/roles';
import { flattenDataAttributes } from '../../data-fetching/useSWRWrapped';

async function createTeacher({ formData, gqlClient, orgId, orgs, triggerSharedState }) {
  const result = {};
  const { humanOrgsArray, computerOrgsArray, error } = getPermittedDomains(orgId, orgs);
  if (error) {
    result.error = error.message;
    return result;
  }

  let validDomain = false;
  computerOrgsArray.map((domain) => {
    if (formData.email.includes(domain)) {
      validDomain = true;
    }
  });

  if (!validDomain) {
    result.error = `Email domain must be ${humanOrgsArray}`;
    return result;
  }

  const data = await gqlClient.request(singleTeacher, { email: formData.email });
  const flattenedData = flattenDataAttributes(data);
  if (flattenedData && flattenedData.usersPermissionsUsers && flattenedData.usersPermissionsUsers.data) {
    if (flattenedData.usersPermissionsUsers.data.length > 0) {
      result.error = 'A user with that email address already exists.';
      return result;
    }
  }

  const password = generatePassword();

  const variables = {
    role: formData.role,
    username: formData.username,
    email: formData.email,
    orgId: orgId,
    password: password,
    groupId: formData.groups,
    confirmed: true,
  };

  try {
    const lumpyData = await gqlClient.request(createTeacherQuery, variables);
    const data = flattenDataAttributes(lumpyData);
    if (data) {
      triggerSharedState.update();
      const roleName = roles.filter((role) => role.id === parseInt(formData.role))[0].name;
      const emailTeacherVariables = {
        email: formData.email,
        role: roleName.toLowerCase(),
        username: formData.username,
        loginUrl: `${window.location.href.split('/manage/teachers')[0]}/login`,
        password: password,
      };
      await gqlClient.request(emailTeacherCredentials, emailTeacherVariables);
      result.success = true;
      result.successMessage = `${formData.username}'s account has been created and an email with login instructions has been sent to them at ${formData.email}.`;
    }
  } catch (e) {
    result.error = e.message;
    console.error(e);
  }

  return result;
}

export default createTeacher;
