import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div className="layout">
      <h1 className="text-2xl font-bold">My App</h1>
      <nav className="flex space-x-4">
        <a href="/" className="text-blue-500 hover:text-blue-700">Home</a>
      </nav>
      <br />
      <Component />
    </div>
  );
}
