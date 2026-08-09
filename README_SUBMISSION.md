# ABTalks 60-Day Coding Challenge — Frontend

A mobile-first (390px) React + Vite + Tailwind product for ABTalks' 60-day coding
challenge, covering the landing page, student dashboard, and a single challenge day.

## Route Map

```text
/
/dashboard
/day/12
```

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Stack

React (Vite) · Tailwind CSS · React Router DOM · Framer Motion · Lucide Icons.
No backend — all data is mocked in `src/data/*.json` and `src/context/AppContext.jsx`,
with light localStorage persistence so a real user's progress on this device survives
a refresh (no accounts, no database).

## What's real (not just visual)

- **Working mock login/logout** — `Login` / `Get Started` opens a real modal
  (`src/components/AuthModal.jsx`). Signup or "Quick Demo Login" sets a user in
  context + localStorage, personalizes the dashboard greeting, and routes to
  `/dashboard`. Logout clears it. No password is stored anywhere real — this is
  explicitly out of scope per the brief, but the *interaction* is real.
- **Persisted daily progress** — checking off checklist items and submitting Day 12's
  GitHub/LinkedIn URLs is saved to localStorage, so it survives a page refresh.
- **Working submission validation** — the deliverables form rejects empty fields and
  non-github.com / non-linkedin.com URLs before "submitting."
- **Real LinkedIn share integration** — "Generate post & open LinkedIn" writes an
  on-brand caption (day, task, current streak), copies it to the clipboard, and opens
  LinkedIn's actual share dialog in a new tab — not a fake button.
- **Edge Case Demo Panel** (bottom-right floating button) — lets a reviewer instantly
  flip between every required edge case without needing separate accounts:
  New Student (Day 1, 0 streak, empty everything), No Streak, Missed Yesterday,
  Empty Badges, No Submissions, and the normal Active state.

## Thoughtful idea (the brief asked for at least one)

Students use ABTalks **late at night, after college**, and the #1 way people
silently break a streak is falling asleep before they realize the day is about to
reset. So every screen that matters (Dashboard task card, Challenge Day sidebar)
shows a **live countdown to midnight** — "11h 5m left to submit today" — that turns
urgent red once under 3 hours remain, and flips to a calm "Streak secured for today"
confirmation once submitted. It's a small, honest nudge instead of a notification
the student has to opt into. (`src/components/StreakCountdown.jsx`)

A second smaller one: the LinkedIn share generator above removes the actual daily
friction point (writing a caption from scratch at midnight) rather than just
collecting a URL.

## Edge cases handled

| Case | Where |
|---|---|
| First day, no streak yet | Dashboard + Challenge Day, via "New Student" demo state |
| Missed a day | Red streak-freeze banner + reset streak, "Missed Yesterday" demo state |
| Empty profile / no achievements | Badge grid empty state, "Empty Badges" demo state |
| No submissions yet | Recent Activity + submission form empty states |

## Project structure

```
src/
  components/   Navbar, Hero, FeatureCard, StatCard, Timeline, ProgressCard,
                BadgeCard, Calendar, TaskCard, SubmissionForm, AuthModal,
                BottomNav, EmptyState, StreakCountdown, DemoController, Footer
  pages/        Landing.jsx, Dashboard.jsx, ChallengeDay.jsx
  data/         student.json, challenge.json
  context/      AppContext.jsx (all state, mock auth, persistence)
```
