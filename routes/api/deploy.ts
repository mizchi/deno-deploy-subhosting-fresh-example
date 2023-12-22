import type { FreshContext, Handlers } from "$fresh/server.ts";
import { createDeployment } from "../../internal/subhosting.ts";
// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/

type RequestType = {
  code: string;
  projectId: string;
};

export const handler: Handlers<RequestType> = {
  POST: async (req: Request, _ctx: FreshContext): Promise<Response> => {
    const deployment = (await req.json()) as RequestType;
    const json = await createDeployment(deployment.projectId, {
      entryPointUrl: "main.ts",
      envVars: {},
      assets: {
        "main.ts": {
          kind: "file",
          content: deployment.code,
          encoding: "utf-8",
        },
      },
    });
    return Response.json(json);
  },
};
