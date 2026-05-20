export const mockAgents = [
  {
    id: 1,
    name: "Requirements Analysis Agent",
    description: "Analyzes SRS and extracts functional/non-functional requirements",
    status: "complete",
  },
  {
    id: 2,
    name: "Architecture Advisor Agent",
    description: "Recommends optimal architecture patterns based on requirements",
    status: "complete",
  },
  {
    id: 3,
    name: "UML Generation Agent",
    description: "Generates use case, class, and sequence diagrams",
    status: "complete",
  },
  {
    id: 4,
    name: "Database Design Agent",
    description: "Creates database schema and ER diagrams",
    status: "complete",
  },
  {
    id: 5,
    name: "Testing Agent",
    description: "Generates comprehensive test cases and strategies",
    status: "complete",
  },
  {
    id: 6,
    name: "Project Bootstrap Agent",
    description: "Generates project structure and config files",
    status: "complete",
  },
  {
    id: 7,
    name: "Report Builder Agent",
    description: "Compiles comprehensive architecture report",
    status: "complete",
  },
];

export const mockRequirements = {
  actors: [
    { id: 1, name: "Admin User", description: "Manages system configuration and users" },
    { id: 2, name: "Regular User", description: "Uses core application features" },
    { id: 3, name: "Guest User", description: "Views public information" },
  ],
  functional: [
    { id: 1, text: "User authentication with JWT tokens" },
    { id: 2, text: "Role-based access control (RBAC)" },
    { id: 3, text: "Real-time notifications system" },
    { id: 4, text: "Data export in multiple formats (PDF, CSV, JSON)" },
    { id: 5, text: "Advanced search with filters and sorting" },
    { id: 6, text: "User activity audit logging" },
  ],
  constraints: [
    { id: 1, text: "Must support 10,000+ concurrent users" },
    { id: 2, text: "Response time < 200ms for 95th percentile" },
    { id: 3, text: "99.9% uptime SLA requirement" },
    { id: 4, text: "GDPR and SOC 2 compliance mandatory" },
    { id: 5, text: "Data retention: 7 years minimum" },
  ],
};

export const mockArchitecture = {
  pattern: "Microservices with Event-Driven Architecture",
  reasoning: "Provides scalability, independent deployment, and loose coupling needed for high-traffic systems",
  components: [
    { id: 1, name: "API Gateway", technology: "Kong/Nginx", responsibility: "Request routing and rate limiting" },
    { id: 2, name: "Auth Service", technology: "Node.js + Passport", responsibility: "Authentication and JWT generation" },
    { id: 3, name: "User Service", technology: "Python FastAPI", responsibility: "User management and profiles" },
    { id: 4, name: "Data Service", technology: "Node.js Express", responsibility: "Core business logic and data operations" },
    { id: 5, name: "Notification Service", technology: "Node.js + Socket.io", responsibility: "Real-time updates" },
    { id: 6, name: "Message Queue", technology: "RabbitMQ", responsibility: "Async event processing" },
    { id: 7, name: "Cache Layer", technology: "Redis", responsibility: "Session and data caching" },
  ],
};

export const mockDiagrams = {
  useCaseDiagram: `graph TB
    Actor1[User]
    Actor2[Admin]
    System[System]
    
    Actor1 -->|Login| System
    Actor1 -->|View Dashboard| System
    Actor1 -->|Export Data| System
    Actor2 -->|Manage Users| System
    Actor2 -->|View Logs| System
    Actor2 -->|Configure Settings| System`,

  classDiagram: `graph TD
    User[User<br/>---<br/>id: UUID<br/>email: String<br/>password: Hash<br/>role: Role<br/>---<br/>login()<br/>logout()]
    
    Role[Role<br/>---<br/>id: UUID<br/>name: String<br/>permissions: List<br/>---<br/>hasPermission()]
    
    Audit[AuditLog<br/>---<br/>id: UUID<br/>userId: UUID<br/>action: String<br/>timestamp: Date<br/>---<br/>log()]
    
    User -->|has| Role
    User --|triggers| Audit`,

  sequenceDiagram: `sequenceDiagram
    participant Client
    participant Gateway as API Gateway
    participant Auth as Auth Service
    participant User as User Service
    participant DB as Database
    
    Client->>Gateway: POST /login
    Gateway->>Auth: Verify Credentials
    Auth->>User: Query User
    User->>DB: SELECT user
    DB-->>User: User Data
    User-->>Auth: Return User
    Auth-->>Gateway: JWT Token
    Gateway-->>Client: 200 OK + Token`,
};

export const mockDatabase = {
  schema: `CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY,
  role_id UUID NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  UNIQUE(role_id, action, resource)
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  action VARCHAR(255) NOT NULL,
  resource VARCHAR(100) NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);`,

  erDiagram: `graph TB
    Users["USERS<br/>---<br/>PK: id<br/>FK: role_id<br/>email<br/>password_hash"]
    
    Roles["ROLES<br/>---<br/>PK: id<br/>name<br/>description"]
    
    Permissions["PERMISSIONS<br/>---<br/>PK: id<br/>FK: role_id<br/>action<br/>resource"]
    
    AuditLogs["AUDIT_LOGS<br/>---<br/>PK: id<br/>FK: user_id<br/>action<br/>timestamp"]
    
    Users -->|belongs_to| Roles
    Roles -->|has_many| Permissions
    Users -->|generates| AuditLogs`,
};

export const mockTestCases = [
  {
    id: "TC001",
    name: "Valid User Login",
    type: "Functional",
    priority: "Critical",
    steps: [
      "1. Navigate to login page",
      "2. Enter valid email and password",
      "3. Click Login button",
      "4. Verify redirect to dashboard",
    ],
  },
  {
    id: "TC002",
    name: "Invalid Password Handling",
    type: "Functional",
    priority: "Critical",
    steps: [
      "1. Navigate to login page",
      "2. Enter valid email with wrong password",
      "3. Click Login button",
      "4. Verify error message displayed",
    ],
  },
  {
    id: "TC003",
    name: "Password Reset Flow",
    type: "Functional",
    priority: "High",
    steps: [
      "1. Click Forgot Password",
      "2. Enter email address",
      "3. Check email for reset link",
      "4. Click link and set new password",
    ],
  },
  {
    id: "TC004",
    name: "Role-Based Access Control",
    type: "Security",
    priority: "Critical",
    steps: [
      "1. Login as regular user",
      "2. Attempt to access admin panel",
      "3. Verify access denied error",
      "4. Login as admin and verify access granted",
    ],
  },
  {
    id: "TC005",
    name: "API Response Time - Login",
    type: "Performance",
    priority: "High",
    steps: [
      "1. Measure login API response time",
      "2. Verify response time < 200ms",
      "3. Test under 1000 concurrent users",
      "4. Verify p95 latency < 200ms",
    ],
  },
  {
    id: "TC006",
    name: "Data Export Functionality",
    type: "Functional",
    priority: "Medium",
    steps: [
      "1. Login to application",
      "2. Select data to export",
      "3. Choose format (CSV, PDF, JSON)",
      "4. Verify file download",
    ],
  },
];

export const bootstrapLogs = [
  "Analyzing architecture recommendation...",
  "Creating folder structure...",
  "Generating config files...",
  "Initializing mock database...",
  "Creating task board tickets...",
  "Bootstrap complete ✓",
];

export const beforeState = {
  icon: "📁",
  label: "No workspace",
  description: "Empty state",
};

export const afterState = {
  icon: "🎯",
  label: "Project Initialized",
  structure: [
    "src/",
    "tests/",
    "config/",
    "docs/",
    "migrations/",
  ],
  stats: {
    files: 42,
    folders: 8,
    tickets: 15,
  },
};
