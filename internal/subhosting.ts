// import { DENO_DEPLOYMENT_ID } from "$fresh/src/server/build_id.ts";

const API = "https://api.deno.com/v1";
const DEPLOY_ACCESS_TOKEN = Deno.env.get("DEPLOY_ACCESS_TOKEN")!;
const DEPLOY_ORG_ID = Deno.env.get("DEPLOY_ORG_ID")!;

async function _request(
  method: string,
  pathname: string,
  accessToken: string,
  data: object | undefined = undefined,
) {
  const url = new URL(API + pathname);
  if (method === "GET" && data) {
    for (const [key, value] of Object.entries(data)) {
      url.searchParams.set(key, value as string);
    }
  }
  console.log("[request]", url.toString());
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(data),
  });
  return res;
}

async function _requestJson(
  method: string,
  pathname: string,
  accessToken: string,
  data: object | undefined = undefined,
) {
  return await _request(method, pathname, accessToken, data).then((res) =>
    res.json()
  );
}

export type Asset = {
  kind: string;
  content: string;
  encoding: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Deployment = {
  id: string;
  projectId: string;
  description: string;
  status: string;
  domains: string[];
  databases: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export type CreateDeploymentRequest = {
  entryPointUrl: string;
  assets: Record<string, Asset>;
  envVars: Record<string, string>;
};

export type CreateDeploymentResponse = Deployment;
export type GetDeploymentDetailResponse = Deployment;
export type GetProjectDetailResponse = Project;

type CreateProjectRequest = {
  name: string | null;
};
type CreateProjectResponse = Project;

type ListProjectsParams = {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
  order?: string;
  organization_id?: string;
};
export type ListProjectsResponse = Project[];

export async function createDeployment(
  projectId: string,
  body: CreateDeploymentRequest,
): Promise<CreateDeploymentResponse> {
  return await _requestJson(
    "POST",
    `/projects/${projectId}/deployments`,
    DEPLOY_ACCESS_TOKEN,
    body,
  );
}

export async function getProjectDetail(
  projectId: string,
): Promise<GetProjectDetailResponse> {
  return await _requestJson(
    "GET",
    `/projects/${projectId}`,
    DEPLOY_ACCESS_TOKEN,
  );
}

export async function getProjectsInOrg(
  params: ListProjectsParams = {},
): Promise<ListProjectsResponse> {
  const organizationId = params?.organization_id ?? DEPLOY_ORG_ID;
  return await _requestJson(
    "GET",
    `/organizations/${organizationId}/projects`,
    DEPLOY_ACCESS_TOKEN,
    { ...params, organization_id: organizationId },
  );
}

export async function getDeploymentsInProject(
  projectId: string,
): Promise<Deployment[]> {
  return await _requestJson(
    "GET",
    `/projects/${projectId}/deployments`,
    DEPLOY_ACCESS_TOKEN,
    {},
  );
}

export async function createProject(
  body: CreateProjectRequest,
): Promise<CreateProjectResponse> {
  return await _requestJson(
    "POST",
    `/organizations/${DEPLOY_ORG_ID}/projects`,
    DEPLOY_ACCESS_TOKEN,
    body,
  );
}

export async function deleteProject(
  projectId: string,
): Promise<number> {
  return await _request(
    "DELETE",
    `/projects/${projectId}`,
    DEPLOY_ACCESS_TOKEN,
    {},
  )
    .then((res) => res.status);
}

export async function getDeploymentDetail(
  deploymentId: string,
): Promise<GetDeploymentDetailResponse> {
  return await _requestJson(
    "GET",
    `/deployments/${deploymentId}`,
    DEPLOY_ACCESS_TOKEN,
  );
}

// if (import.meta.main) {
//   const accessToken = Deno.env.get("DEPLOY_ACCESS_TOKEN")!;
//   const orgId = Deno.env.get("DEPLOY_ORG_ID")!;
//   const project = await createProject({ accessToken, orgId }, { name: null });
//   console.log('[project]', project);
//   const deployment = await createDeployment(
//     {
//       accessToken,
//       orgId,
//       projectId: project.id,
//     },
//     {
//       assets: {
//         "main.ts": {
//           kind: "file",
//           content: `Deno.serve(() => new Response("Hello, World!"));`,
//           encoding: "utf-8",
//         },
//       },
//       entryPointUrl: "main.ts",
//       envVars: {},
//       // permissions: {
//       //   net: false,
//       // }
//     }
//   );
//   console.log('[deployment]', deployment);
//   const detail = await getDeploymentDetail({
//     accessToken,
//     deploymentId: deployment.id,
//   });
//   console.log('[detail]', detail);
//   const result = await deleteProject({
//     accessToken: accessToken!,
//     projectId: '72c41fbc-06aa-43fa-bc36-8423f38522f5',
//   });
//   console.log('[result]', result);
// }
