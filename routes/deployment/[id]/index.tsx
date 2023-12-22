import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import {
  getDeploymentDetail,
  GetDeploymentDetailResponse,
} from "../../../internal/subhosting.ts";

type RootProps = {
  deployment: GetDeploymentDetailResponse;
};

export const handler: Handlers = {
  async GET(_req: Request, ctx: FreshContext) {
    const deployment = await getDeploymentDetail(ctx.params.id as string);
    const resp = await ctx.render({ deployment } as RootProps);
    return resp;
  },
};

export default function ProjectDetailPage(props: PageProps<RootProps>) {
  const firstDomain = props.data.deployment.domains?.[0];
  const releasedUrl = firstDomain ? `https://${firstDomain}` : null;
  return (
    <>
      <nav className="bg-gray-200">
        <a href="/project/" className="text-blue-500">Home</a>
      </nav>
      <div className="bg-white p-4">
        <h1 className="text-2xl font-bold">
          Deployment Detail: {props.params.id}
        </h1>
        <pre className="bg-gray-100 p-4 mt-4">
          <code>
            {JSON.stringify(props.data.deployment, null, 2)}
          </code>
        </pre>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">Endpoint</h2>
        {releasedUrl && (
          <a href={releasedUrl} about="_blank" className="text-blue-500">
            {releasedUrl}
          </a>
        )}
      </div>
    </>
  );
}
