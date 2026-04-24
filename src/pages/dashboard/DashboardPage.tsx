import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { DashboardHeader } from '../../components/layout/DashboardHeader'
import { EventGrid } from '../../components/events/EventGrid'
import { FilterPanel } from '../../components/filters/FilterPanel'
import { LeadForm } from '../../components/leads/LeadForm'
import { LeadsList } from '../../components/leads/LeadsList'
import { fetchEvents } from '../../features/events/eventsThunks'
import { selectEvents, selectEventsError, selectEventsStatus, selectFilteredEvents } from '../../features/events/eventsSelectors'
import { clearFilters, setCategory, setSearchTerm } from '../../features/filters/filtersSlice'
import { addLead, hydrateLeads } from '../../features/leads/leadsSlice'
import { selectLeads, selectLeadsHydrated } from '../../features/leads/leadsSelectors'
import { setThemeMode } from '../../features/theme/themeSlice'
import { applyThemeMode } from '../../lib/theme/theme'
import {
  loadLeads,
  loadThemePreference,
  saveLeads,
  saveThemePreference,
} from '../../lib/storage/localStorage'
import type { FilterCategory } from '../../lib/constants/categories'

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const hasThemeEffectRun = useRef(false)
  const skipNextThemeAnimation = useRef(false)

  const events = useAppSelector(selectEvents)
  const filteredEvents = useAppSelector(selectFilteredEvents)
  const eventsStatus = useAppSelector(selectEventsStatus)
  const eventsError = useAppSelector(selectEventsError)

  const filters = useAppSelector((state) => state.filters)

  const leads = useAppSelector(selectLeads)
  const leadsHydrated = useAppSelector(selectLeadsHydrated)

  const themeMode = useAppSelector((state) => state.theme.mode)

  useEffect(() => {
    if (eventsStatus === 'idle') {
      dispatch(fetchEvents())
    }
  }, [dispatch, eventsStatus])

  useEffect(() => {
    dispatch(hydrateLeads(loadLeads()))
  }, [dispatch])

  useEffect(() => {
    if (!leadsHydrated) {
      return
    }

    saveLeads(leads)
  }, [leads, leadsHydrated])

  useEffect(() => {
    const savedTheme = loadThemePreference()

    if (savedTheme) {
      skipNextThemeAnimation.current = true
      dispatch(setThemeMode(savedTheme))
      applyThemeMode(savedTheme, { animate: false })
    } else {
      applyThemeMode('system', { animate: false })
    }
  }, [dispatch])

  useEffect(() => {
    const shouldAnimate = hasThemeEffectRun.current && !skipNextThemeAnimation.current

    applyThemeMode(themeMode, { animate: shouldAnimate })
    saveThemePreference(themeMode)

    hasThemeEffectRun.current = true

    if (skipNextThemeAnimation.current) {
      skipNextThemeAnimation.current = false
    }

    if (themeMode !== 'system') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => {
      applyThemeMode('system', { animate: true })
    }

    mediaQuery.addEventListener('change', listener)

    return () => mediaQuery.removeEventListener('change', listener)
  }, [themeMode])

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 md:py-8">
      <DashboardHeader />

      <FilterPanel
        searchTerm={filters.searchTerm}
        category={filters.category}
        onSearchChange={(value) => dispatch(setSearchTerm(value))}
        onCategoryChange={(value) => dispatch(setCategory(value as FilterCategory))}
        onClear={() => dispatch(clearFilters())}
      />

      <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <section className="space-y-4" aria-label="Oferta academica">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-ink">Oferta academica</h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {filteredEvents.length} visibles
            </span>
          </div>

          <EventGrid
            items={filteredEvents}
            status={eventsStatus}
            error={eventsError}
            onRetry={() => dispatch(fetchEvents())}
          />
        </section>

        <aside className="space-y-5">
          <LeadForm
            interestOptions={events.map((event) => event.name)}
            onCreateLead={(lead) => dispatch(addLead(lead))}
          />
          <LeadsList leads={leads} />
        </aside>
      </div>
    </main>
  )
}
