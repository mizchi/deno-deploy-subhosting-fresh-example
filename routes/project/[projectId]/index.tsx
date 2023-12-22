import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {
  getProjectDetail,
  GetProjectDetailResponse,
} from "../../../internal/subhosting.ts";
import DeployEditor from "../../../islands/DeployEditor.tsx";

type Params = {
  projectId: string;
};

type RootProps = {
  project: GetProjectDetailResponse;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const project = await getProjectDetail(ctx.params.projectId as string);
    const resp = await ctx.render({ project } as RootProps);
    return resp;
  },
};

export default function ProjectDetailPage(props: PageProps<RootProps>) {
  return (
    <>
      <div>
        Project Detail: {props.params.projectId}
        <br />
        <pre>
          <code>
            {JSON.stringify(props.data.project, null, 2)}
          </code>
        </pre>
      </div>
      <div>
        <DeployEditor projectId={props.params.projectId} />
      </div>
    </>
  );
}
