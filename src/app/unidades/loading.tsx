export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-6">
        <div className="h-8 w-64 bg-gray-200 rounded-md mb-6 skeleton"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="w-full sm:w-80 h-10 bg-gray-200 rounded-md skeleton"></div>
          <div className="w-40 h-10 bg-gray-200 rounded-md skeleton"></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 skeleton rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
