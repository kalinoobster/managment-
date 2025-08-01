
export default function SalesPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no sales data
        </h3>
        <p className="text-sm text-muted-foreground">
          Your sales data will be displayed here once available.
        </p>
      </div>
    </div>
  );
}
