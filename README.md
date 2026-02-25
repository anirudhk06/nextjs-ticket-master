tickethive-frontend/
│
├── app/
│   ├── layout.tsx                          → Root layout (html, body, fonts)
│   ├── not-found.tsx                       → Global 404 page
│   │
│   ├── (auth)/                             → No Navbar group
│   │   ├── layout.tsx                      → Centered auth layout
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   └── (customer)/                         → With Navbar group
│       ├── layout.tsx                      → Navbar + th-page wrapper
│       ├── page.tsx                        → / Landing page
│       ├── events/
│       │   ├── page.tsx                    → /events Listing + filters
│       │   └── [id]/
│       │       └── page.tsx               → /events/:id Detail page
│       ├── book/
│       │   └── [eventId]/
│       │       └── page.tsx               → /book/:eventId Booking + payment
│       └── my-tickets/
│           └── page.tsx                   → /my-tickets
│
├── components/
│   ├── ui/                                 → Shadcn auto-generated components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   │
│   ├── layout/                             → App shell components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageWrapper.tsx
│   │
│   ├── event/                              → Event related components
│   │   ├── EventCard.tsx
│   │   ├── EventGrid.tsx
│   │   ├── EventHero.tsx
│   │   ├── EventMeta.tsx
│   │   └── EventFilters.tsx
│   │
│   ├── ticket/                             → Ticket related components
│   │   ├── TicketTierSelector.tsx
│   │   ├── TicketCard.tsx
│   │   ├── QRTicketModal.tsx
│   │   └── TicketDownloadBtn.tsx
│   │
│   ├── booking/                            → Booking flow components
│   │   ├── BookingSteps.tsx
│   │   ├── AttendeeForm.tsx
│   │   ├── OrderSummary.tsx
│   │   └── PaymentButton.tsx
│   │
│   └── shared/                             → Reusable across features
│       ├── CategoryPill.tsx
│       ├── StatusBadge.tsx
│       ├── SectionHeader.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
│
├── lib/
│   ├── axios.ts                            → Axios instance + interceptors
│   ├── razorpay.ts                         → Razorpay load + payment handler
│   ├── utils.ts                            → cn(), formatDate(), formatPrice()
│   └── constants.ts                        → API base URL, categories list etc.
│
├── hooks/
│   ├── useAuth.ts                          → Auth state helpers
│   ├── useEvents.ts                        → Fetch events (React Query)
│   ├── useEventDetail.ts                   → Fetch single event
│   ├── useBooking.ts                       → Booking flow logic
│   └── useMyTickets.ts                     → Fetch user's tickets
│
├── services/                               → All API call functions
│   ├── auth.service.ts                     → login, register, logout, refresh
│   ├── event.service.ts                    → getEvents, getEventById, getSlots
│   ├── booking.service.ts                  → createBooking, cancelBooking
│   ├── payment.service.ts                  → createOrder, verifyPayment
│   └── ticket.service.ts                   → getTickets, downloadTicket
│
├── store/
│   └── authStore.ts                        → Zustand: user, token, login, logout
│
├── types/
│   ├── auth.types.ts                       → User, LoginPayload, RegisterPayload
│   ├── event.types.ts                      → Event, TicketTier, EventFilters
│   ├── booking.types.ts                    → Booking, BookingItem, Attendee
│   ├── payment.types.ts                    → Payment, RazorpayOrder
│   └── ticket.types.ts                     → Ticket, QRTicket
│
├── public/
│   └── images/
│       └── placeholder-event.png
│
├── .env.local                              → Environment variables
├── .env.example                            → Env template to commit
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json