# LionsBank - UI/UX Design Specification

## 1. Overall Design Concept
The LionsBank landing page embodies a **"Modern Financial Expertise"** theme. It balances corporate trust with cutting-edge tech aesthetics. The design relies heavily on a dark mode presentation, utilizing deep backgrounds (black/dark overlays on imagery) to allow content and vibrant accents to pop. The core narrative positions LionsBank as a strategic, highly technical financial hub serving Morocco and the African continent.

## 2. UI Layout Structure (Section by Section)

### A. Global Header (Navbar)
- **Logo:** "LionsBanks" (Text-based, clean, and bold).
- **Navigation:** Links to `Réalisations` (Achievements), `Expertises` (Skills/Services), and `Contact`.
- **Authentication:** Conditional rendering for "Dashboard" (if logged in) or "Log in" & "Register".

### B. Hero Section
- **Visuals:** Full-screen background image (`bg_hero`) with a `bg-black/60` overlay to ensure text readability.
- **Micro-copy:** "Depuis 2003" indicating heritage and stability.
- **Main Headline:** "Financial expertise at the service of **Morocco**". The country name is highlighted to emphasize localization and focus.
- **Value Proposition:** A concise paragraph detailing the bank's strategic role in Africa for high-tech projects.
- **Call-to-Action (CTA):** Dual buttons for direct contact ("Talk to our team") and portfolio exploration ("Our achievements").
- **Social Proof/Stats:** A glassmorphism badge highlighting "+1.1M active clients".

### C. Regional Context (`<BankMaroc />`)
- Details LionsBank's specific operations, infrastructure, and footprint within Morocco.

### D. Core Skills & Technical Offerings (`<Techniques />`)
- **[Focus Area]** The primary section for the "skills-based design" strategy. Details specific financial techniques, technological tools, or specialized services the bank offers.

### E. Interactive Visual/Feature Highlight (`<Blurpage />`)
- A dynamic, potentially interactive section (e.g., using 3D elements like a globe pulse) with blurred backgrounds to create depth and highlight a specific global or technological feature.

### F. Information & About (`<Info />`)
- Corporate information, mission statement, or organizational structure.

### G. Lead Generation & Contact (`<ContactSection />`)
- A structured area for user inquiries, support requests, or service applications.

### H. Insights & Content (`<Publiction />`)
- Articles, financial reports, or news updates demonstrating thought leadership.

### I. Footer (`<Footer />`)
- Standard corporate footer with links, legal, and secondary navigation.

## 3. Skill-Based Presentation Strategy
To maximize the impact of LionsBank's "Expertise" and "Techniques", the design should adopt a **Skill-Based Architecture**:

1. **Logical Grouping:**
   - **Strategic Consulting:** M&A, Financial Restructuring.
   - **Technical Deployment:** Tech infrastructure funding, continental expansion.
   - **Core Banking:** High-net-worth management, corporate banking.
2. **Visual Presentation (The `<Techniques />` Section):**
   - **Bento Box or Grid Layout:** Present skills in a modern grid where each "skill" or "expertise" is a distinct card.
   - **Iconography:** Use crisp, tech-forward icons for each skill to make them instantly recognizable.
   - **Progressive Disclosure:** Keep initial descriptions brief. Allow users to hover or click a skill card to reveal deep technical details or case studies ("Réalisations").
3. **Integration with Proof:** Tie the skills directly to the "Our achievements" CTA. Every skill listed should link to a concrete project demonstrating that capability.

## 4. Typography Suggestions
- **Primary Font:** **Instrument Sans** (Currently imported). This sans-serif font offers a clean, geometric, and highly legible aesthetic suitable for modern financial interfaces.
- **Hierarchy:**
  - `h1`: 6xl (Desktop), Bold, tight leading (`leading-tight`).
  - `h2/h3` (for Skills/Sections): 3xl/4xl, Semi-bold.
  - `p` (Body text): text-lg (Desktop), text-gray-300 for reduced contrast against dark backgrounds.
  - `micro-copy`: text-sm, uppercase tracking for labels like "Depuis 2003".

## 5. Color Palette Ideas
- **Primary Background:** Deep Charcoal / Black (`#000000` to `#0F172A`).
- **Primary Accent (Brand Green):** Neon/Tech Green (`#22C55E`). Used for critical highlights, primary CTA buttons, and active states.
- **Secondary/Surface:** Glassmorphism (`bg-white/10 backdrop-blur-md`). Used for cards, badges, and floating navigation.
- **Text:**
  - Primary: Pure White (`#FFFFFF`).
  - Secondary/Muted: Light Gray (`text-gray-300`, `#D1D5DB`).

## 6. Component Breakdown
- **Primary CTA Button:** Solid green (`bg-[#22C55E]`), white text, distinct border-radius (`rounded-[5px] rounded-br-[15px]`) for a unique, modern geometric feel.
- **Secondary Button:** Transparent with white border (`border-white/30`), hover effect to solid light white (`hover:bg-white/10`).
- **Stats Badge:** Pill-shaped, frosted glass background, combining large bold numbers with smaller descriptive text.
- **Skill Cards (for Techniques):** Dark cards with a subtle border on hover, green accent icon, and concise text.

## 7. Animations/Interaction Ideas
- **Scroll Reveal:** Utilizing AOS (Animate On Scroll) for sections (`fade-right` on hero text). Future sections should use `fade-up` to reveal skill cards sequentially.
- **Hover States:** Links and secondary buttons should have smooth color transitions. Skill cards should slightly elevate or glow green on hover to indicate interactivity.
- **Parallax/Depth:** The `Blurpage` component and the hero background can utilize slow parallax effects to give the page a premium, layered feel.

## 8. Responsive Behavior
- **Mobile (sm):**
  - Hamburger menu replaces the desktop navbar links.
  - Hero text scales down (`text-3xl`).
  - Buttons stack vertically full-width.
  - Stats badge converts to a stacked layout.
- **Tablet (md):**
  - Navigation links appear.
  - Buttons align side-by-side.
  - Grid layouts for skills (2 columns).
- **Desktop (lg/xl):**
  - Maximum width container (`max-w-7xl`) centers the content.
  - Large, immersive typography (`text-6xl`).
  - Grid layouts for skills expand to 3 or 4 columns.
