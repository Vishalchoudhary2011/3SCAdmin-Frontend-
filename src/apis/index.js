import axios from 'axios'
import { toast } from 'react-toastify'

const IAM_API = process.env.REACT_APP_API_ENDPOINT;
const SCAI_API = process.env.REACT_APP_SCAI_API_ENDPOINT;

const token = JSON.parse(localStorage.getItem('token'))

// For dev
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJhY2Nlc3MiLCJleHAiOjE2NjY3ODI3NTIsImlhdCI6MTY2NjY5NjM1MiwianRpIjoiZjNiNjU4NWIzYzM0NDI4MWJlZjk4MmUzMTVlMGNkOWEiLCJ1c2VyX2lkIjoiMzIzOGRlMjQtNGEzNS00Yzg4LWE2M2QtZGI1YTZlMzM1NjhkIiwicm9sZXMiOlsiU1lTX0FETUlOIl0sInBlcm1pc3Npb25zIjpbIlNLVV9WSUVXIiwiUFJPRFVDVF9WSUVXIl0sInRlbmFudF9pZCI6IjFlOGI4OGUyLTEwZTQtNDNiMS1hMGY4LTk2Y2JhZmUxY2NkMyIsInRlbmFudF9uYW1lIjoib3JnMSIsImVtYWlsIjoiZ295YWwuYW5raXQuMDQ5QGdtYWlsLmNvbSIsImJ1c2luZXNzX3VuaXRfaWQiOiIiLCJidXNpbmVzc191bml0X25hbWUiOiIifQ.bT7BWUOOPP3PfNhsqQj0kbV_m3WFYcFGV2ZlAGlg90A";

const config = {
  headers: { Authorization: `Bearer ${token}` },
  params: {},
}

const config1 = {
  headers: { Authorization: `Bearer ${token}` },
  params: { org_id: '1e8b88e2-10e4-43b1-a0f8-96cbafe1ccd3' },
}

export const uploadCSVDataAPI = async (body) => {
  const { csvFile } = body

  const uploadData = new FormData()

  uploadData.append('csvFile', csvFile)
  // uploadData.append("tenantId", tenantId);

  // const uploadConfig = {
  //   headers: { "Content-Type": "multipart/form-data" },
  // };

  // return await axios.post(`${SCAI_API}`, uploadData, uploadConfig);
}

export const getClientsAPI = async () =>
  axios.get(`${IAM_API}/organizations/`, config);

export const getClientByIdAPI = async (id) =>
  axios.get(`${IAM_API}/organizations/${id}`, config);

export const createClientAPI = async (client) =>
  await axios.post(`${IAM_API}/organizations/`, client, config);

export const editClientAPI = async (client) => {
  try {
    const res = await axios.put(
      `${IAM_API}/organizations/${client.id}`,
      client,
      config
    );
    toast.success("Client Updated Sucessfully");
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export const getAllBusinessUnitsAPI = async (selectedClient) =>
  axios.get(`${IAM_API}/org/${selectedClient.id}/business-unit/`, config);

export const getByIdBusinessUnitsAPI = async (body) =>
  axios.post(`${IAM_API}/org/${body.id}/business-unit/`, body, config);

export const createBUAPI = async (payload) =>
  await axios.post(
    `${IAM_API}/org/${payload.org_id}/business-unit/`,
    payload.formData,
    config
  );

export const editBUAPI = async (payload) =>
  axios.patch(
    `${IAM_API}/org/${payload.org_id}/business-unit/${payload.business_id}`,
    payload.formData,
    config
  );

export const getClientConfigAPI = async (id) =>
  await axios.get(`${SCAI_API}/configuration/v1?tenant_id=${id}`, {
    headers: { "Content-Type": "application/json" },
  });

export const updateClientConfigAPI = async (payload) => {
  return await axios.put(
    `${SCAI_API}/configuration/v1/${payload.config}/?tenant_id=${payload.id}`,
    payload.formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const getAllTeamUnitAPI = async (selectedBU) => {
  return await axios.get(
    `${IAM_API}/org/${selectedBU.organization}/team/?business_unit=${selectedBU.id}/`,
    config,
  )
}

export const createTeamUnitAPI = async (body) => {
  return await axios.post(`${IAM_API}/org/${body.org_id}/team/`, body.formData, config)
}

export const editTeamAPI = async (body) => {
  await axios.put(`${IAM_API}/org/${body.organization}/team/${body.id}`, body, config);
};

// hello  i am git demo 