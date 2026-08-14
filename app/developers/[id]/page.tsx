"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Developer = {
  id: string;
  name: string;
  experience: number;
  role: string;
};

type Technology = {
  id: string;
  name: string;
  category: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
};

type Company = {
  id: string;
  name: string;
  location: string;
};

type DeveloperData = {
  developer: Developer;
  technologies: Technology[];
  projects: Project[];
  companies: Company[];
};

export default function DeveloperProfile() {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState<DeveloperData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(
          `/api/developers/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch developer");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setData(result.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load developer profile.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDeveloper();
    }
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-40 rounded bg-slate-200" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="h-32 rounded-2xl bg-white" />
            <div className="h-32 rounded-2xl bg-white" />
            <div className="h-32 rounded-2xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="font-semibold text-red-800">
            Unable to load profile
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to Developers
          </button>
        </div>
      </main>
    );
  }

  const { developer, technologies, projects, companies } = data;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <button
            onClick={() => router.push("/")}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Back to Developers
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Developer Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-100 text-2xl font-bold text-indigo-700">
              {developer.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {developer.name}
              </h1>

              <p className="mt-1 text-slate-500">
                {developer.role}
              </p>

              <p className="mt-3 text-sm text-slate-600">
                {developer.experience} years of experience
              </p>
            </div>
          </div>
        </section>

        {/* Graph Connections */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Graph Connections
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Relationships connected to this developer
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {/* Skills */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Skills
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                HAS_SKILL
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology.id}
                    className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                  >
                    {technology.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Projects
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                WORKED_ON
              </p>

              <div className="mt-4 space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <p className="font-medium text-slate-800">
                      {project.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Companies */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Companies
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                WORKED_AT
              </p>

              <div className="mt-4 space-y-3">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <p className="font-medium text-slate-800">
                      {company.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {company.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Relationship Explanation */}
        <section className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
          <h2 className="font-semibold text-indigo-900">
            How this developer connects
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-lg bg-white px-3 py-2 font-medium text-slate-800">
              {developer.name}
            </span>

            <span className="text-indigo-500">→ HAS_SKILL →</span>

            <span className="rounded-lg bg-white px-3 py-2 font-medium text-slate-800">
              {technologies.length} Technologies
            </span>

            <span className="text-indigo-500">→ WORKED_ON →</span>

            <span className="rounded-lg bg-white px-3 py-2 font-medium text-slate-800">
              {projects.length} Projects
            </span>

            <span className="text-indigo-500">→ WORKED_AT →</span>

            <span className="rounded-lg bg-white px-3 py-2 font-medium text-slate-800">
              {companies.length} Companies
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}