import { useState } from "preact/hooks";

const rand = Math.random().toString(36).slice(2);
const initialCode = `Deno.serve(() => new Response("Hello, ${rand}"));`;

export default function DeployEditor(
  props: { projectId: string },
) {
  const [code, setCode] = useState(initialCode);
  return (
    <div>
      <DeployButton projectId={props.projectId} code={code} />
      <div className="mt-4">
        <textarea
          value={code}
          onChange={(ev) => {
            setCode(ev.currentTarget.value);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
        </textarea>
      </div>
    </div>
  );
}

function DeployButton(
  props: { projectId: string; code: string },
) {
  return (
    <button
      type="button"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        const res = await fetch(`/api/deploy`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: props.projectId,
            code: props.code,
          }),
        });
        const data = await res.json();
        console.log(data);
        location.href = `/deployment/${data.id}`;
      }}
    >
      deploy
    </button>
  );
}
