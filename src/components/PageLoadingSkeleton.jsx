const PageLoadingSkeleton = ({ category = false }) => (
  <main className="mx-auto min-h-[65vh] w-full max-w-6xl animate-pulse px-4 py-6 sm:px-6 sm:py-8">
    {category && <div className="mb-6 h-24 rounded-2xl bg-gray-200" />}
    <div className="mb-5 h-8 w-40 max-w-full rounded bg-gray-200" />
    <div className="mb-5 h-12 rounded-2xl bg-gray-200" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }, (_, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-3 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
          <div className="h-3 w-1/4 rounded bg-gray-200" />
          <div className="mt-2 h-6 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  </main>
);

export default PageLoadingSkeleton;
