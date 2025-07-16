
# PrisPilot - Detaljert Nettside Dokumentasjon

## Oversikt
PrisPilot er en sammenligningstjeneste bygget med React, TypeScript, Tailwind CSS og Supabase. Nettsiden hjelper brukere med å sammenligne priser på ulike tjenester som strøm, mobil, internett, forsikring og mer.

## Teknisk Stack
- **Frontend**: React 18 med TypeScript
- **Styling**: Tailwind CSS med shadcn/ui komponenter
- **Routing**: React Router v6
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **Deployment**: Lovable platform

## Prosjektstruktur

### Hovedmapper
```
src/
├── components/          # Gjenbrukbare React komponenter
│   ├── ui/             # shadcn/ui komponenter (buttons, inputs, etc.)
│   ├── Header.tsx      # Navigasjonsmeny
│   ├── HeroSection.tsx # Hovedseksjon på forsiden
│   ├── CategoryCard.tsx # Kategorikort
│   ├── QuoteForm.tsx   # Tilbudsskjema
│   └── ...
├── pages/              # Sidekomponenter
│   ├── Index.tsx       # Forsiden
│   ├── CategoryPage.tsx # Kategoriside
│   ├── About.tsx       # Om oss side
│   └── ...
├── integrations/       # Supabase integrasjon
├── hooks/              # Custom React hooks
├── lib/                # Utility funksjoner
└── utils/              # Hjelpefunksjoner
```

## Sider og Paths

### 1. Forside (/)
**Fil**: `src/pages/Index.tsx`
**Innhold**:
- **Header**: Navigasjonsmeny med dropdown for tjenester og om oss
- **Hero Section**: Hovedbanner med registreringsskjema og søkefelt
- **Kategoriseksjon**: 8 kategorikort i 4x2 grid layout
- **Partner Carousel**: Vises kun hvis leverandører finnes i databasen
- **"Why Choose Us"**: 3-kolonne seksjon med ikoner og forklaringer
- **CTA Section**: Call-to-action med blå gradient bakgrunn

**Kategorier**:
- Strøm (`/strom`)
- Internett (`/internett`) 
- Mobil (`/mobil`)
- Forsikring (`/forsikring`)
- Lån (`/lan`)
- Boligalarm (`/boligalarm`)
- Håndverkere (`/handverkere`)
- Renhold (`/renhold`)

**Logikk**:
- Sjekker om hver kategori har leverandører i databasen
- Hvis kategori har leverandører: navigerer til kategoriside
- Hvis kategori mangler leverandører: åpner tilbudsskjema direkte

### 2. Kategorisider (/:kategori)
**Fil**: `src/pages/CategoryPage.tsx`
**URL eksempler**: `/strom`, `/mobil`, `/internett`

**Innhold**:
- **Header**: Standard navigasjon
- **Tilbake-knapp**: Navigerer tilbake til forrige side
- **Kategoritittel**: Dynamisk basert på URL parameter
- **Leverandørgrid**: 2-4 kolonner avhengig av skjermstørrelse
- **Leverandørkort**: Logo, navn, beskrivelse og "Få tilbud" knapp

**Leverandørkort Design**:
- Hvit bakgrunn med backdrop-blur effekt
- Hover effekter med blå border
- 20px høyde for logo container
- Skalering av logo ved hover

**Logikk**:
- Henter leverandører fra Supabase basert på kategori
- Hvis ingen leverandører: åpner tilbudsskjema automatisk
- Klikk på leverandør: åpner tilbudsskjema med forhåndsvalgt leverandør

### 3. Om PrisPilot (/om-prispilot)
**Fil**: `src/pages/About.tsx`
**Innhold**: Informasjon om selskapet og tjenesten

### 4. Hvordan det fungerer (/hvordan-det-fungerer)
**Fil**: `src/pages/HowItWorks.tsx`
**Innhold**: Steg-for-steg guide for hvordan tjenesten fungerer

### 5. Kontakt oss (/kontakt-oss)
**Fil**: `src/pages/Contact.tsx`
**Innhold**: Kontaktinformasjon og kontaktskjema

### 6. Blogg (/blogg)
**Fil**: `src/pages/Blog.tsx`
**Innhold**: Bloggartikler og nyheter

### 7. Admin Panel (/admin)
**Fil**: `src/pages/Admin.tsx`
**Innhold**: Administratorgrensesnitt for å administrere leverandører og leads

### 8. 404 Side (*)
**Fil**: `src/pages/NotFound.tsx`
**Innhold**: Feilside for ukjente URLs

## Hovedkomponenter

### Header (`src/components/Header.tsx`)
**Funksjonalitet**:
- Responsiv navigasjon med mobile hamburger-meny
- Dropdown menyer for "Tjenester" og "Om oss"
- Logo med hjemnavigasjon
- "Meld på" og "Hjem" knapper
- Dynamisk sjekk av leverandører per kategori

**Design**:
- Glassmorphism effekt (backdrop-blur)
- Fixed positioning
- Kollapsible mobile menyer

**Komponenter**:
- `DesktopNavigation.tsx`: Desktop navigasjonsmeny
- `MobileMenuOverlay.tsx`: Fullskjerm mobile meny
- `MobileMenuButton.tsx`: Hamburger-knapp for mobile

### HeroSection (`src/components/HeroSection.tsx`)
**Funksjonalitet**:
- Registreringsskjema med navn, telefon og e-post
- Søkefelt for leverandører med live resultater
- Supabase integrasjon for lagring av leads
- Toast notifikasjoner for feedback

**Design**:
- Fullskjerm bakgrunnsbilde med overlay
- 2-kolonne layout (tekst + skjema)
- Glassmorphism effekt på skjema
- Animerte elementer

### CategoryCard (`src/components/CategoryCard.tsx`)
**Design**:
- Kort med ikon, tittel og knapp
- Hover effekter med skalering
- Gradient bakgrunn på knapp
- Glassmorphism bakgrunn

### QuoteForm (`src/components/QuoteForm.tsx`)
**Funksjonalitet**:
- Modal dialog for tilbudsforespørsler
- Støtter forhåndsvalgte kategorier og leverandører
- Integrert med Supabase for lagring

## Navigasjonsarkitektur

### Desktop Navigation
**Komponenter**:
- **Tjenester**: Direkte knapper for hver tjeneste med ikoner
- **Om oss**: Dropdown med underpunkter
- **Blogg**: Direkteknapp
- **Action buttons**: "Meld på" og "Hjem"

### Mobile Navigation
**Struktur**:
- **Fullskjerm overlay** med backdrop-blur
- **Scrollbar område** for lang innhold
- **Kollapsible "Om oss"** seksjon
- **Action buttons** nederst i menyen
- **Lukk-knapp** øverst høyre

## Database Schema (Supabase)

### Tabeller:

#### `providers`
- **id**: integer (primary key)
- **navn**: text (leverandørnavn)
- **logo_url**: text (logo URL)
- **kategori**: text (kategori slug)
- **beskrivelse**: text (leverandørbeskrivelse)
- **created_at**: timestamp

#### `leads`
- **id**: uuid (primary key)
- **navn**: text (kundenavn)
- **telefon**: text (telefonnummer)
- **epost**: text (e-post, valgfri)
- **tjeneste**: text (ønsket tjeneste)
- **leverandor**: text (foretrukket leverandør)
- **samtykke**: boolean (GDPR samtykke)
- **melding**: text (tilleggsmelding)
- **created_at**: timestamp
- **updated_at**: timestamp

#### `admin_users`
- **id**: uuid (primary key)
- **email**: text (admin e-post)
- **password_hash**: text (hashet passord)
- **name**: text (admin navn)
- **created_at**: timestamp
- **updated_at**: timestamp

## Design System

### Fargepalett
- **Primær**: Blå gradient (from-blue-600 to-blue-800)
- **Sekundær**: Grå nyanser (gray-50 til gray-900)
- **Accent**: Hover blå (blue-50, blue-600)
- **Bakgrunn**: Hvit med glassmorphism effekter

### Typography
- **Hovedtitler**: text-xl til text-4xl, font-bold
- **Undertitler**: text-lg til text-xl, font-semibold
- **Brødtekst**: text-sm til text-base, font-medium/normal
- **Knapper**: text-sm, font-medium

### Layout System
- **Container**: container mx-auto px-4
- **Grid**: responsive grid system
- **Spacing**: Tailwind spacing scale (p-2 til p-8)
- **Breakpoints**: sm (640px), lg (1024px), xl (1280px)

### Animasjoner
- **Fade-in**: animate-fade-in med staggered delays
- **Scale**: hover:scale-105 på interaktive elementer
- **Transitions**: transition-all duration-200
- **Blur effects**: backdrop-blur-sm/md

## Responsive Design

### Breakpoint Strategy
- **Mobile**: < 640px (1 kolonne)
- **Tablet**: 640px - 1024px (2 kolonner)
- **Desktop**: 1024px - 1280px (3-4 kolonner)
- **Large**: > 1280px (4+ kolonner)

### Navigation Behavior
- **Desktop**: Horizontal meny med dropdowns
- **Mobile**: Hamburger meny med fullskjerm overlay
- **Tablet**: Hybrid tilnærming

### Grid Layouts
- **Kategorikort**: 1/2/4 kolonner basert på skjerm
- **Leverandører**: 1/2/3/4 kolonner responsivt
- **Hero section**: Stacked på mobile, side-by-side på desktop

## Datahåndtering

### Supabase Queries
```typescript
// Hente leverandører for kategori
const { data, error } = await supabase
  .from('providers')
  .select('*')
  .eq('kategori', category);

// Søke i leverandører
const { data, error } = await supabase
  .from('providers')
  .select('*')
  .or(`navn.ilike.%${term}%,kategori.ilike.%${term}%`)
  .limit(5);

// Lagre lead
const { error } = await supabase
  .from('leads')
  .insert([leadData]);
```

### State Management
- **React State**: useState for lokal komponentstate
- **TanStack Query**: For data fetching og caching
- **Form State**: React Hook Form for skjemahåndtering

### Error Handling
- Try-catch blokker for API kall
- Toast notifikasjoner for brukerfeedback
- Console logging for debugging
- Fallback UI komponenter

## Navigasjonslogikk

### Routing Strategy
1. **Statisk ruter**: Definerte sider (/om-prispilot, /kontakt-oss, /blogg)
2. **Dynamisk ruter**: Kategorisider (/:kategori)
3. **Catch-all**: 404 side (*) - MÅ være sist i routes array

### Kategorilogikk
```typescript
// Sjekk om kategori har leverandører
if (categoryProviders[slug]) {
  // Naviger til kategoriside
  navigate(`/${slug}`);
} else {
  // Åpne tilbudsskjema direkte
  setPreSelectedCategory(category.title);
  setIsQuoteFormOpen(true);
}
```

### Scroll Management
- Automatisk scroll til topp ved navigasjon
- ScrollArea komponenter for lange lister
- Smooth scrolling behavior

## Performance Optimalisering

### Code Splitting
- Lazy loading av sider med React.lazy()
- Dynamic imports for store komponenter
- Route-based splitting

### Image Optimization
- Fallback håndtering for brutte bilder
- Responsive images med srcset
- Lazy loading av bilder

### Bundle Optimization
- Tree shaking via Vite
- Minification i produksjon
- Gzip komprimering
- CSS purging

### Caching Strategy
- TanStack Query for API caching
- Browser caching av statiske ressurser
- Service worker for offline support

## Sikkerhet

### Data Validation
- Zod schemas for type validation
- Input sanitization
- XSS protection

### API Security
- Supabase Row Level Security (RLS)
- API key management
- CORS konfiguration

### GDPR Compliance
- Samtykke checkboxes
- Data minimization
- Sletting av persondata

## Deployment

### Lovable Platform
- Automatisk deployment ved code push
- Built-in staging environment
- Custom domain støtte (krever betalt plan)
- SSL sertifikater automatisk

### Environment Variables
- Supabase URL og API keys
- Konfigurasjon via .env filer
- Produksjon vs development settings

### Build Process
1. TypeScript compilation
2. Vite bundling
3. Tailwind CSS processing
4. Asset optimization
5. Deploy til CDN

## Testing Strategy

### Manual Testing
- Cross-browser kompatibilitet
- Responsive design testing
- Accessibility testing
- Performance testing

### User Experience Testing
- Navigation flow testing
- Form submission testing
- Error state testing
- Loading state testing

## Vedlikehold

### Code Organization
- Komponent-basert arkitektur
- Separation of concerns
- Consistent naming conventions
- Documentation standards

### Monitoring
- Error tracking
- Performance metrics
- User analytics
- Console logging

### Updates og Patches
- Dependency updates
- Security patches
- Feature additions
- Bug fixes

## Fremtidige Forbedringer

### Planlagte Features
- Brukerautentisering
- Lagrede sammenligninger
- E-post notifikasjoner
- Advanced filtering
- Prishistorikk
- API integrasjoner med leverandører

### Technical Debt
- Unit testing implementasjon
- E2E testing setup
- Performance optimization
- Accessibility improvements
- SEO optimization

### Refaktoreringsmuligheter
- Dele opp store komponenter
- Implementere custom hooks
- Database query optimization
- Component library utvikling

## Browser Support

### Minimum Requirements
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Features Used
- CSS Grid og Flexbox
- ES6+ JavaScript features
- Modern CSS (backdrop-filter)
- Responsive design units

---

**Sist oppdatert**: 2024-12-24
**Versjon**: 2.0
**Utviklingsplattform**: Lovable.dev
**Repository**: PrisPilot sammenligningstjeneste
