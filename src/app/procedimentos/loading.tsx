export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-200 skeleton rounded"></div>
      ))}
    </div>
  )
}
