"use client";

import { useEffect, useState } from "react";

type Technology = {
  id: string;
  name: string;
  category: string;
};

type GraphItem = {
  developer: {
    id: string;
    name: string;
    role: string;
    experience: number;
  };
  project: {
    id: string;
    name: string;
    description: string;
  };
  technology: {
    id: string;
    name: string;
    category: string;
  };
};

export default function GraphExplorer() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState("React");
  const [results, setResults] = useState<GraphItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  // Load technologies
  useEffect(() => {
    const loadTechnologies = async () => {
      try {
        const response = await fetch("/api/technologies");

        if (!response.ok) {
          throw new Error("Failed to load technologies");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setTechnologies(result.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load technologies.");
      } finally {
        setInitialLoading(false);
      }
    };

    loadTechnologies();
  }, []);

  // Search graph
  useEffect(() => {
    if (!selectedTechnology) return;

    const loadGraph = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/technology?technology=${encodeURIComponent(
            selectedTechnology
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to load graph");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setResults(result.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load graph relationships.");
      } finally {
        setLoading(false);
      }
    };

    loadGraph();
  }, [selectedTechnology]);

  // Group projects
  const projectMap = new Map<
    string,
    {
      project: GraphItem["project"];
      developers: GraphItem["developer"][];
    }
  >();

  results.forEach((item) => {
    if (!projectMap.has(item.project.id)) {
      projectMap.set(item.project.id, {
        project: item.project,
        developers: [],
      });
    }

    projectMap.get(item.project.id)!.developers.push(item.developer);
  });

  const projects = Array.from(projectMap.values());

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <a
            href="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Developers
          </a>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Graph Explorer
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Explore multi-hop relationships between technologies,
            projects and developers.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Technology selector */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="text-sm font-semibold text-slate-800">
            Select Technology
          </label>

          {initialLoading ? (
            <div className="mt-3 h-12 animate-pulse rounded-xl bg-slate-200" />
          ) : (
            <select
              value={selectedTechnology}
              onChange={(e) =>
                setSelectedTechnology(e.target.value)
              }
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {technologies.map((technology) => (
                <option
                  key={technology.id}
                  value={technology.name}
                >
                  {technology.name} — {technology.category}
                </option>
              ))}
            </select>
          )}
        </section>

        {/* Graph path */}
        <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <h2 className="font-semibold text-indigo-900">
            Multi-hop Graph Traversal
          </h2>

          <p className="mt-4 text-sm text-indigo-800">
            The application follows this graph path:
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <GraphNode label="Developer" />

            <GraphArrow label="WORKED_ON" />

            <GraphNode label="Project" />

            <GraphArrow label="USES" />

            <GraphNode label={selectedTechnology || "Technology"} />
          </div>
        </section>

        {/* Error */}
        {error && (
          <section className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h3 className="font-semibold text-red-800">
              Something went wrong
            </h3>

            <p className="mt-1 text-sm text-red-600">
              {error}
            </p>
          </section>
        )}

        {/* Loading */}
        {loading && (
          <section className="mt-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-48 animate-pulse rounded-2xl bg-white"
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty */}
        {!loading && !error && results.length === 0 && (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <h3 className="font-semibold text-slate-900">
              No connections found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              No developer-project relationship was found for{" "}
              {selectedTechnology}.
            </p>
          </section>
        )}

        {/* Results */}
        {!loading && !error && projects.length > 0 && (
          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                {selectedTechnology} Connections
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {results.length} graph relationships found
              </p>
            </div>

            <div className="space-y-5">
              {projects.map(({ project, developers }) => (
                <div
                  key={project.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  {/* Technology */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                      {selectedTechnology}
                    </span>

                    <span className="text-slate-400">
                      →
                    </span>

                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800">
                      {project.name}
                    </span>

                    <span className="text-slate-400">
                      →
                    </span>

                    <span className="text-sm text-slate-500">
                      {developers.length} developer
                      {developers.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    {project.description}
                  </p>

                  {/* Developers */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {developers.map((developer) => (
                      <a
                        key={developer.id}
                        href={`/developers/${developer.id}`}
                        className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {developer.name
                              .split(" ")
                              .map((name) => name[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {developer.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              {developer.role}
                            </p>
                          </div>
                        </div>

                        <p className="mt-3 text-xs text-slate-400">
                          {developer.experience} years experience
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function GraphNode({ label }: { label: string }) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm">
      {label}
    </div>
  );
}

function GraphArrow({ label }: { label: string }) {
  return (
    <div className="text-center">
      <div className="text-indigo-400">→</div>

      <div className="text-[10px] font-medium uppercase tracking-wide text-indigo-500">
        {label}
      </div>
    </div>
  );
}