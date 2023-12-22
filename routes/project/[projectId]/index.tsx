import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {
  Deployment,
  getDeploymentsInProject,
  getProjectDetail,
  GetProjectDetailResponse,
  Project,
} from "../../../internal/subhosting.ts";
import DeployEditor from "../../../islands/DeployEditor.tsx";

type Params = {
  projectId: string;
};

type RootProps = {
  project: Project;
  deployments: Deployment[];
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const project = await getProjectDetail(ctx.params.projectId as string);
    const deployments = await getDeploymentsInProject(
      ctx.params.projectId as string,
    );
    const resp = await ctx.render({ project, deployments } as RootProps);
    return resp;
  },
};

export default function ProjectDetailPage(props: PageProps<RootProps>) {
  return (
    <>
      <div>
        Project Detail: {props.params.projectId}
        <br />
        <details>
          <summary>project</summary>
          <pre>
          <code>
            {JSON.stringify(props.data.project, null, 2)}
          </code>
          </pre>
        </details>

        <details>
          <summary>deployments</summary>
          <pre>
          <code>
            {JSON.stringify(props.data.deployments, null, 2)}
          </code>
          </pre>
        </details>
      </div>
      <div>
        <ul>
          {props.data.deployments.map((deploy) => (
            <li key={deploy.id}>
              <a
                className="text-blue-500"
                href={`/deployment/${deploy.id}`}
              >
                [{deploy.status}] {deploy.id} - {deploy.createdAt}
              </a>
            </li>
          ))}
        </ul>
        <DeployEditor projectId={props.params.projectId} />
      </div>
    </>
  );
}
