import { FILTER_CATEGORIES, type FilterCategory } from '../../lib/constants/categories'

interface FilterPanelProps {
  searchTerm: string
  category: FilterCategory
  onSearchChange: (value: string) => void
  onCategoryChange: (value: FilterCategory) => void
  onClear: () => void
}

export function FilterPanel({
  searchTerm,
  category,
  onSearchChange,
  onCategoryChange,
  onClear,
}: FilterPanelProps) {
  return (
    <section className="surface space-y-4 p-5" aria-label="Filtros de eventos">
      <div>
        <h2 className="text-2xl text-ink">Filtrado avanzado</h2>
        <p className="text-sm text-muted">Busca por nombre o limita por categoria academica.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
        <label className="space-y-2">
          <span className="label">Buscar por nombre</span>
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            type="search"
            placeholder="Ejemplo: Ingenieria de Software"
            className="w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2">
          <span className="label">Categoria</span>
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value as FilterCategory)}
            className="w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {FILTER_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-line px-4 py-3 text-sm font-semibold text-muted transition hover:border-primary hover:text-primary"
        >
          Limpiar
        </button>
      </div>
    </section>
  )
}
