
# PrisPilot - Fullstendig Applikasjonsarkitektur og Designdokumentasjon

## Oversikt
PrisPilot er en moderne sammenligningstjeneste bygget som en Single Page Application (SPA) med React, TypeScript og Supabase. Applikasjonen hjelper norske forbrukere med å sammenligne priser på essensielle tjenester som strøm, mobil, internett, forsikring og mer.

## Teknisk Arkitektur

### Core Technologies
- **Frontend Framework**: React 18.3.1 med TypeScript
- **Build Tool**: Vite (moderne, rask bundler)
- **Styling**: Tailwind CSS 3.x med custom utility classes
- **UI Components**: shadcn/ui komponentbibliotek
- **State Management**: React useState/useEffect + TanStack Query
- **Routing**: React Router DOM 6.26.2
- **Database**: Supabase (PostgreSQL med REST API)
- **Deployment**: Lovable.dev platform

### Prosjektstruktur

```
prispilot/
├── src/
│   ├── components/              # Gjenbrukbare komponenter
│   │   ├── ui/                 # shadcn/ui base komponenter
│   │   ├── admin/              # Admin-spesifikke komponenter
│   │   ├── category/           # Kategori-spesifikke komponenter
│   │   ├── Header.tsx          # Hovednavigasjon
│   │   ├── HeroSection.tsx     # Forside hero med registrering
│   │   ├── CategoryCard.tsx    # Kategorikort på forsiden
│   │   ├── ProviderCarousel.tsx # Leverandørkarusell
│   │   ├── QuoteForm.tsx       # Tilbudsskjema modal
│   │   └── ...
│   ├── pages/                  # Sidekomponenter
│   │   ├── Index.tsx           # Forside (/)
│   │   ├── CategoryPage.tsx    # Kategoriside (/:kategori)
│   │   ├── Admin.tsx           # Admin panel (/admin)
│   │   ├── About.tsx           # Om oss (/om-prispilot)
│   │   ├── Contact.tsx         # Kontakt (/kontakt-oss)
│   │   ├── Blog.tsx            # Blogg (/blogg)
│   │   └── NotFound.tsx        # 404 side
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAdminData.ts     # Admin data management
│   │   ├── useCategoryData.ts  # Kategori data fetching
│   │   └── use-toast.ts        # Toast notifications
│   ├── integrations/           # Tredjepartsintegrasjoner
│   │   └── supabase/           # Supabase konfigurasjon
│   │       ├── client.ts       # Supabase klient
│   │       └── types.ts        # TypeScript typer
│   ├── lib/                    # Utility biblioteker
│   │   └── utils.ts            # Tailwind merge utilities
│   ├── utils/                  # Hjelpefunksjoner
│   │   └── imageUtils.ts       # Bildehåndtering
│   └── App.tsx                 # Hovedapplikasjon med routing
├── public/                     # Statiske filer
├── supabase/                   # Database migrasjoner
└── package.json                # Avhengigheter og scripts
```

## Sidestruktur og Navigasjon

### 1. Forside (/) - Index.tsx
**Hovedkomponenter**:
- **Header**: Responsiv navigasjon med dropdown menyer
- **HeroSection**: Hero banner med registreringsskjema og GIF bakgrunn
- **Kategoriseksjon**: 8 kategorikort i responsivt grid (2x4 på desktop, 1x8 på mobil)
- **ProviderCarousel**: Tretrinnig karusell med leverandørlogoer (kun hvis data finnes)
- **Why Choose Us**: 3-kolonne informasjonsseksjon
- **CTA Section**: Call-to-action med gradient bakgrunn

**Kategorier**:
1. Strøm (/strom)
2. Mobil (/mobil)
3. Internett (/internett)
4. Forsikring (/forsikring)
5. Lån (/lan)
6. Boligalarm (/boligalarm)
7. Håndverkere (/handverkere)
8. Renhold (/renhold)

**Navigasjonslogikk**:
- Hvis kategori har leverandører: navigerer til kategoriside
- Hvis kategori mangler leverandører: åpner tilbudsskjema direkte

### 2. Kategorisider (/:kategori) - CategoryPage.tsx
**Dynamisk routing** basert på URL parameter
**Innhold**:
- Tilbake-navigasjon
- Kategoritittel (automatisk kapitalisering)
- Leverandørgrid (1-4 kolonner responsivt)
- Leverandørkort med logo, navn, beskrivelse

**Leverandørkort Design**:
- Glassmorphism effekt (backdrop-blur)
- Hover animasjoner (scale + border endring)
- Logo container: fast høyde 20px
- Responsive layout

### 3. Statiske Sider
- **/om-prispilot**: Bedriftsinformasjon
- **/hvordan-det-fungerer**: Prosessbeskrivelse
- **/kontakt-oss**: Kontaktinformasjon og skjema
- **/blogg**: Artikler og nyheter
- **/admin**: Administratorpanel (beskyttet)

## Komponentarkitektur

### Header Komponenter
```
Header.tsx (hovedkomponent)
├── DesktopNavigation.tsx     # Desktop meny
├── MobileMenuButton.tsx      # Hamburger knapp
└── MobileMenuOverlay.tsx     # Fullskjerm mobil meny
```

**Navigasjonsstruktur**:
- **Desktop**: Horizontal meny med hover dropdowns
- **Mobile**: Fullskjerm overlay med kollapsible seksjoner

### HeroSection.tsx
**Funksjonalitet**:
- Registreringsskjema (navn, telefon, e-post)
- Live søk i leverandører
- Supabase integrasjon for leads
- Toast feedback
- Responsiv 2-kolonne layout

**Bakgrunn**:
- GIF bakgrunn med overlay
- Scroll-basert (ikke fixed) for mobil kompatibilitet
- Gradient overlay for tekstlesbarhet

### ProviderCarousel.tsx
**Teknisk implementasjon**:
- Trippel-duplisering av data for sømløs loop
- CSS keyframe animasjon (300s full syklus)
- Hover pause funksjonalitet
- Responsive logo størrelser (max 160x100px)
- Fallback til tekst hvis logo feiler

**Animasjon**:
```css
@keyframes scroll-provider-slow {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
```

### QuoteForm.tsx
**Modal-basert tilbudsskjema**:
- Forhåndsutfylling basert på kontekst
- Validering med zod
- Supabase lagring
- GDPR samtykke
- Toast feedback

### CategoryCard.tsx
**Design elementer**:
- Glassmorphism bakgrunn
- Gradient knapper
- Hover scale effekter
- Responsive tekst størrelser

## Database Schema (Supabase)

### Tabeller

#### providers
```sql
CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  navn TEXT,
  log_url TEXT,
  kategori TEXT,
  beskrivelse TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### leads
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  navn TEXT NOT NULL,
  telefon TEXT NOT NULL,
  epost TEXT,
  tjeneste TEXT,
  leverandor TEXT,
  samtykke BOOLEAN DEFAULT FALSE,
  melding TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### admin_users
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Styling og Design System

### Tailwind CSS Konfiguration
**Custom farger**:
- `prispilot-blue`: #1E40AF
- `prispilot-light-blue`: #3B82F6

**Animasjoner**:
- `fade-in`: 0.6s ease-out
- `scale-in`: 0.5s ease-out
- `pulse-slow`: 2s infinite

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: 1024px+ (xl)

### Design Prinsipper
1. **Glassmorphism**: backdrop-blur effekter
2. **Gradient knapper**: Blue-to-blue variations
3. **Hover animasjoner**: Subtle scale og color changes
4. **Responsive grid**: 1-2-3-4 kolonne progression
5. **Consistent spacing**: Tailwind spacing scale

## Data Flow og State Management

### Data Fetching Strategy
```typescript
// TanStack Query for caching
const { data, isLoading, error } = useQuery({
  queryKey: ['providers', category],
  queryFn: () => fetchProviders(category),
});
```

### State Management Patterns
1. **Local State**: useState for komponent-spesifikk state
2. **Server State**: TanStack Query for API data
3. **Form State**: React Hook Form for skjemaer
4. **Navigation State**: React Router for URL state

### Error Handling
- Try-catch blokker for API kall
- Toast notifikasjoner for brukerfeedback
- Console logging for debugging
- Fallback UI komponenter

## Routing Arkitektur

### React Router Konfigurasjon
```typescript
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/admin" element={<Admin />} />
  <Route path="/om-prispilot" element={<About />} />
  <Route path="/hvordan-det-fungerer" element={<HowItWorks />} />
  <Route path="/kontakt-oss" element={<Contact />} />
  <Route path="/blogg" element={<Blog />} />
  <Route path="/:kategori" element={<CategoryPage />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

**Viktiq rekkefølge**: Catch-all route (*) MÅ være sist!

### Navigasjonslogikk
```typescript
const handleCategoryClick = (category) => {
  if (categoryProviders[category.slug]) {
    navigate(`/${category.slug}`);
  } else {
    setPreSelectedCategory(category.title);
    setIsQuoteFormOpen(true);
  }
};
```

## Performance Optimalisering

### Code Splitting
- React.lazy() for sidekomponenter
- Dynamic imports for store komponenter
- Route-based splitting

### Image Optimization
- Lazy loading av bilder
- Error handling for brutte logoer
- Responsive image størrelser

### Caching Strategy
- TanStack Query for API caching
- Browser caching av statiske ressurser
- Supabase query optimization

## Sikkerhet og Compliance

### Data Sikkerhet
- Supabase Row Level Security (RLS)
- Input validering med zod
- XSS beskyttelse
- CORS konfiguration

### GDPR Compliance
- Eksplisitt samtykke checkboxes
- Data minimering
- Transparent databruk
- Sletting av persondata

## Deployment og DevOps

### Lovable Platform
- Automatisk deployment ved code push
- Built-in staging environment
- SSL sertifikater
- CDN distribusjon

### Build Process
1. TypeScript compilation
2. Vite bundling og optimalisering
3. Tailwind CSS purging
4. Asset compression
5. Deploy til global CDN

### Environment Management
- Development: Lokal Supabase instance
- Production: Hosted Supabase
- Environment variables via .env

## Testing og Quality Assurance

### Manual Testing Checklist
- [ ] Cross-browser kompatibilitet (Chrome, Firefox, Safari, Edge)
- [ ] Responsive design (Mobile, Tablet, Desktop)
- [ ] Form submissions og validering
- [ ] Navigation og routing
- [ ] Image loading og fallbacks
- [ ] Performance og loading times

### Accessibility (a11y)
- Semantic HTML struktur
- ARIA labels på interaktive elementer
- Keyboard navigation støtte
- Color contrast compliance
- Screen reader kompatibilitet

## Vedlikehold og Utvikling

### Code Quality Standards
- TypeScript strict mode
- Consistent naming conventions
- Component-based arkitektur
- Separation of concerns
- Documentation standards

### Development Workflow
1. Feature utvikling i små iterasjoner
2. Testing på tvers av devices
3. Code review via Lovable editor
4. Deployment til staging
5. Production release

### Monitoring og Debugging
- Console logging for utviklingsformål
- Error tracking via browser dev tools
- Performance monitoring
- User feedback integration

## Fremtidige Forbedringer

### Planlagte Features
- [ ] Brukerautentisering og profiler
- [ ] Lagrede sammenligninger
- [ ] E-post notifikasjoner
- [ ] Advanced filtering og søk
- [ ] Prishistorikk og trends
- [ ] API integrasjoner med leverandører
- [ ] Real-time chat support
- [ ] Mobile app (React Native)

### Technical Debt
- [ ] Unit testing implementasjon (Jest + React Testing Library)
- [ ] E2E testing (Playwright/Cypress)
- [ ] Performance optimization
- [ ] SEO forbedringer
- [ ] Accessibility audit
- [ ] Security penetration testing

### Skalering Muligheter
- [ ] Microservices arkitektur
- [ ] Caching layer implementasjon
- [ ] Database query optimization
- [ ] CDN for dynamisk innhold
- [ ] Load balancing
- [ ] Monitoring og alerting system

## Browser Support og Kompatibilitet

### Minimum Requirements
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

### Progressive Enhancement
- Core functionality fungerer uten JavaScript
- CSS Grid og Flexbox fallbacks
- Touch-friendly interface
- Offline-first approach (fremtidig)

## Konklusjon

PrisPilot er bygget som en moderne, skalerbar og brukervenlig sammenligningstjeneste. Arkitekturen prioriterer:

1. **Brukeropplevelse**: Rask, responsiv og intuitiv
2. **Utvikleropplevelse**: TypeScript, moderne tooling, klar struktur
3. **Skalering**: Komponent-basert, modulær arkitektur
4. **Vedlikehold**: Dokumentert, testbar, refaktorerbar
5. **Sikkerhet**: GDPR-compliant, input validering, XSS beskyttelse

Applikasjonen er designet for å vokse med virksomheten og kan enkelt utvides med nye kategorier, leverandører og funksjoner.

---

**Dokumentasjon versjon**: 3.0
**Sist oppdatert**: 2024-12-26
**Utviklingsplattform**: Lovable.dev
**Teknisk kontakt**: PrisPilot Development Team
