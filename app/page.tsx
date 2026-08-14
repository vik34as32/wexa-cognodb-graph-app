"use client";

import { useEffect, useState } from "react";

type Developer = {
  id: string;
  name: string;
  experience: number;
  role: string;
};

export default function Home() {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/developers");

        if (!response.ok) {
          throw new Error("Failed to fetch developers");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Something went wrong");
        }

        setDevelopers(result.data);
      } catch (error) {
        console.error(error);
        setError("Unable to load developers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter((developer) =>
    `${developer.name} ${developer.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalExperience = developers.reduce(
    (total, developer) => total + developer.experience,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Developer Graph Explorer
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Explore developers, skills, projects and company relationships
            </p>
          </div>

        <div className="flex items-center gap-3">
  <a
    href="/graph"
    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
  >
    Explore Graph
  </a>

  <div className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
    CognoDB
  </div>
</div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Developers"
            value={developers.length}
            description="Developers in graph"
          />

          {/* <StatCard
            title="Total Experience"
            value={`${totalExperience.toFixed(1)} yrs`}
            description="Combined experience"
          /> */}

          <StatCard
            title="Graph Database"
            value="Connected"
            description="Powered by CognoDB"
          />
        </section>

        {/* Search */}
        <section className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Find a Developer
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search by developer name or role
              </p>
            </div>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search developers..."
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </section>

        {/* Developer List */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Developers
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Explore developers and their graph relationships
              </p>
            </div>

            {!loading && (
              <span className="text-sm text-slate-500">
                {filteredDevelopers.length} result
                {filteredDevelopers.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="mt-3 h-4 w-28 rounded bg-slate-200" />
                  <div className="mt-6 h-4 w-20 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
              <h3 className="font-semibold text-red-800">
                Unable to load data
              </h3>

              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredDevelopers.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <h3 className="font-semibold text-slate-900">
                No developers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try a different search term.
              </p>
            </div>
          )}

          {/* Data */}
          {!loading && !error && filteredDevelopers.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDevelopers.map((developer) => (
                <DeveloperCard
                  key={developer.id}
                  developer={developer}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

function DeveloperCard({
  developer,
}: {
  developer: Developer;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {developer.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {developer.role}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
          {developer.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Experience
        </p>

        <p className="mt-1 text-lg font-semibold text-slate-800">
          {developer.experience} years
        </p>
      </div>

      <button
        onClick={() => {
          window.location.href = `/developers/${developer.id}`;
        }}
        className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
      >
        View Profile
      </button>
<br/>

   
    </div>
  );
}