# Repo Summary: Get Fluent Creole

A full-stack app for learning Haitian Creole. People can browse English-to-Creole phrases without an account. Registered users can also save flashcards, take quizzes, and see their quiz score history.

```
/
├── README.md          Project overview, features, screenshots
├── backend/           Spring Boot REST API (Java 17, Maven)
├── frontend/          React 19 + Vite SPA (deployed on Netlify)
├── data/phrases.csv   Seed data for phrases
└── docs/screenshots/  UI screenshots + ERD.png
```

## Backend (`backend/`)

Spring Boot 4.1 with Spring Data JPA/Hibernate, MySQL, Spring Security and JWT (jjwt 0.9.1), and ModelMapper. It is built with the Maven wrapper (`mvnw`).

Package `com.example.getfluentcreole`:

| Package | Contents |
|---|---|
| `config/` | `AppConfig`, `CorsConfig` (allows Netlify), `JwtRequestFilter`, `WebSecurityConfig` |
| `controllers/` | REST controllers (see endpoints below) |
| `dto/`, `dto/request/`, `dto/response/` | DTOs for phrases, users, flashcards, auth, quiz scores (incl. paginated `QuizScorePageResponseDTO`) |
| `exceptions/` | `GlobalExceptionHandler`, `ErrorObject`, `ItemAlreadyExistsException` |
| `models/` | JPA entities: `User`, `Phrase`, `UserFlashcard`, `QuizScore`, enum `FlashcardStatus` |
| `repositories/` | Spring Data repositories, one per entity |
| `services/` | `UserService`/`UserServiceImpl`, `CustomUserDetailsService`, `TokenBlacklistService` (logout) |
| `utils/` | `JwtTokenUtil` |

### API endpoints

| Base | Endpoints |
|---|---|
| `/api/user` | `POST /register`, `/login`, `/logout`, `/validate-token` |
| `/api/phrases` | `GET /` (all), `GET /randomPhrase` |
| `/api/userFlashcards` | `POST /addFlashcard`, `GET /{email}`, `PUT /update/{flashcardId}`, `DELETE /{flashcardId}` |
| `/api/quizScores` | `POST /submit`, `GET /{emailAddress}` (paginated) |

The config file is `src/main/resources/application.properties`. It sets the local MySQL database `get_fluent_creole` and `ddl-auto=update`. The only test is the default context-load test.

## Frontend (`frontend/`)

React 19, Vite, React Router, Axios, react-hot-toast and Font Awesome. Vitest/Testing Library are configured as dev dependencies.

```
src/
├── App.jsx, main.jsx       Routing / entry point
├── config/api-client.js    Axios instance
├── context/                AuthContext, DataContext, ModalContext
├── services/               authService, phraseService, quizScoreService,
│                           userFlashcardService, storageService
├── utils/                  generatePhrase, validateForm
└── components/
    ├── common/             Button, Card, IconButton, Modal, ResourceLink, form inputs
    ├── layout/             Header/PublicHeader/UserHeader, NavMenu/UserNavMenu, Footer
    ├── mock-data/          Static resource link data (Haiti resources)
    └── pages/              HomePage, AboutPage, AllPhrasesPage, FlashcardPage,
                            UserProfilePage, auth/ (Login, Register),
                            flashcards/, quiz/ (QuizPage, QuizCard, ProgressBar,
                            QuizResultsPage, QuizScore*, util/shuffle, checkAnswer)
```

**Routes:** `/`, `/about`, `/all-phrases`, `/login`, `/register`, `/profile`, `/flashcards`, `/quiz`, `/quizResults`. Any other path redirects to `/`.

**Deployment and proxy:**
- In development, `vite.config.js` proxies `/api` to `VITE_API_URL`.
- In production, `netlify.toml` proxies `/api/*` to the backend at `http://3.90.112.145:8080` and sends every other path to `index.html` so the SPA handles routing.

## Notes
- `backend/src/main/resources/application.properties` has the database password and the JWT secret committed in plain text. They should move to environment variables.
- `vite.config.js` points to the test setup file `./src/tests/setup.js`, which is not in the repo.
- Backend test coverage is minimal.
