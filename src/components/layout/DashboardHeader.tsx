import { ThemeToggle } from '../theme/ThemeToggle'

export function DashboardHeader() {
  return (
    <header className="surface p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="label uppercase tracking-[0.2em]">Pontificia Universidad Javeriana</p>
          <h1 className="text-3xl leading-tight text-ink md:text-5xl">
            Lead and Events Manager
          </h1>
          <p className="text-sm text-muted md:text-base">
            Monitorea la oferta academica y registra prospectos con validaciones, trazabilidad y
            persistencia local para el equipo de mercadeo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="label">Tema</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
