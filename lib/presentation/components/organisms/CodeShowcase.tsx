"use client";

import {
  Box,
  Container,
  Typography,
  IconButton,
  Snackbar,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import {
  ContentCopy,
  Check,
  Code,
  FolderOpen,
  InsertDriveFile,
  Menu,
  Close,
  Terminal,
  Circle,
} from "@mui/icons-material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Force LTR cache for Code Showcase
const ltrCache = createCache({
  key: "code-ltr",
  prepend: true,
});

interface CodeShowcaseProps {
  title: string;
}

interface CodeFile {
  name: string;
  path: string;
  language: string;
  code: string;
  description: string;
  patterns: string[];
}

interface FolderItem {
  name: string;
  type: "folder" | "file";
  level: number;
  index?: number;
}

const codeFiles: CodeFile[] = [
  {
    name: "useApi.ts",
    path: "src/hooks/useApi.ts",
    language: "typescript",
    description: "Custom Hook for API calls with loading & error states",
    patterns: ["Custom Hook", "Generic Types", "Error Handling"],
    code: `// Custom Hook Pattern - Reusable API Logic with SOLID Principles
import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T, P extends unknown[]>(
  apiFunction: (...args: P) => Promise<T>,
  options?: UseApiOptions<T>
) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const data = await apiFunction(...args);
        setState({ data, loading: false, error: null });
        options?.onSuccess?.(data);
        return data;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        setState({ data: null, loading: false, error: err });
        options?.onError?.(err);
        return null;
      }
    },
    [apiFunction, options]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}`,
  },
  {
    name: "withAuth.tsx",
    path: "src/hoc/withAuth.tsx",
    language: "typescript",
    description: "Higher-Order Component for route protection",
    patterns: ["HOC Pattern", "Auth Guard", "Role-Based Access"],
    code: `// Higher-Order Component Pattern - Authentication Wrapper
import { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface WithAuthOptions {
  redirectTo?: string;
  roles?: string[];
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const { redirectTo = '/login', roles = [] } = options;

  function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace(redirectTo);
      }

      if (!isLoading && isAuthenticated && roles.length > 0) {
        const hasRequiredRole = roles.some(role => 
          user?.roles?.includes(role)
        );
        if (!hasRequiredRole) {
          router.replace('/unauthorized');
        }
      }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) return <LoadingSpinner />;
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  }

  AuthenticatedComponent.displayName = 
    \`withAuth(\${WrappedComponent.displayName || WrappedComponent.name})\`;

  return AuthenticatedComponent;
}`,
  },
  {
    name: "UserRepository.ts",
    path: "src/domain/repositories/UserRepository.ts",
    language: "typescript",
    description: "Repository Pattern with Interface Segregation",
    patterns: ["Repository", "SOLID", "Dependency Inversion"],
    code: `// Repository Pattern - Clean Architecture Data Layer
import { User, UserCreateDTO, UserUpdateDTO } from '@/domain/entities/User';

interface IReadRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
}

interface IWriteRepository<T, CreateDTO, UpdateDTO, ID> {
  create(data: CreateDTO): Promise<T>;
  update(id: ID, data: UpdateDTO): Promise<T>;
  delete(id: ID): Promise<void>;
}

export interface IUserRepository 
  extends IReadRepository<User, string>,
          IWriteRepository<User, UserCreateDTO, UserUpdateDTO, string> {
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: string): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  constructor(private readonly apiClient: IApiClient) {}

  async findById(id: string): Promise<User | null> {
    return this.apiClient.get<User>(\`/users/\${id}\`);
  }

  async findAll(): Promise<User[]> {
    return this.apiClient.get<User[]>('/users');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.apiClient.get<User>(\`/users/email/\${email}\`);
  }

  async findByRole(role: string): Promise<User[]> {
    return this.apiClient.get<User[]>(\`/users/role/\${role}\`);
  }

  async create(data: UserCreateDTO): Promise<User> {
    return this.apiClient.post<User>('/users', data);
  }

  async update(id: string, data: UserUpdateDTO): Promise<User> {
    return this.apiClient.patch<User>(\`/users/\${id}\`, data);
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete(\`/users/\${id}\`);
  }
}`,
  },
  {
    name: "ServiceFactory.ts",
    path: "src/application/factories/ServiceFactory.ts",
    language: "typescript",
    description: "Factory Pattern for Dependency Injection",
    patterns: ["Factory", "Singleton", "DI Container"],
    code: `// Factory Pattern - Dependency Injection Container
import { IUserRepository, UserRepository } from '@/domain/repositories';
import { IApiClient, AxiosApiClient } from '@/infrastructure/api';
import { UserService } from '@/application/services/UserService';

class ServiceFactory {
  private static instance: ServiceFactory;
  private readonly services = new Map<string, unknown>();

  private constructor() {}

  static getInstance(): ServiceFactory {
    if (!ServiceFactory.instance) {
      ServiceFactory.instance = new ServiceFactory();
    }
    return ServiceFactory.instance;
  }

  private getOrCreate<T>(key: string, factory: () => T): T {
    if (!this.services.has(key)) {
      this.services.set(key, factory());
    }
    return this.services.get(key) as T;
  }

  getApiClient(): IApiClient {
    return this.getOrCreate('apiClient', () => 
      new AxiosApiClient(process.env.NEXT_PUBLIC_API_URL!)
    );
  }

  getUserRepository(): IUserRepository {
    return this.getOrCreate('userRepository', () => 
      new UserRepository(this.getApiClient())
    );
  }

  getUserService(): UserService {
    return this.getOrCreate('userService', () => 
      new UserService(this.getUserRepository())
    );
  }
}

export const factory = ServiceFactory.getInstance();`,
  },
  {
    name: "useForm.ts",
    path: "src/hooks/useForm.ts",
    language: "typescript",
    description: "Type-Safe Form Hook with Zod Validation",
    patterns: ["Custom Hook", "Zod Schema", "Form State"],
    code: `// Advanced Form Hook - Type-Safe Form Management
import { useState, useCallback, useMemo } from 'react';
import { z, ZodSchema } from 'zod';

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  schema: ZodSchema<T>;
  onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, unknown>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((data: T): FormErrors<T> => {
    const result = schema.safeParse(data);
    if (result.success) return {};
    
    return result.error.issues.reduce((acc, issue) => {
      const field = issue.path[0] as keyof T;
      acc[field] = issue.message;
      return acc;
    }, {} as FormErrors<T>);
  }, [schema]);

  const isValid = useMemo(() => 
    Object.keys(validate(values)).length === 0, 
    [values, validate]
  );

  const handleChange = useCallback((field: keyof T) => 
    (value: T[keyof T]) => {
      setValues(prev => ({ ...prev, [field]: value }));
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }, []);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const validationErrors = validate(values);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  return { values, errors, isSubmitting, isValid, handleChange, handleSubmit };
}`,
  },
];

const folderStructure: FolderItem[] = [
  { name: "src", type: "folder", level: 0 },
  { name: "hooks", type: "folder", level: 1 },
  { name: "useApi.ts", type: "file", level: 2, index: 0 },
  { name: "useForm.ts", type: "file", level: 2, index: 4 },
  { name: "hoc", type: "folder", level: 1 },
  { name: "withAuth.tsx", type: "file", level: 2, index: 1 },
  { name: "domain", type: "folder", level: 1 },
  { name: "repositories", type: "folder", level: 2 },
  { name: "UserRepository.ts", type: "file", level: 3, index: 2 },
  { name: "application", type: "folder", level: 1 },
  { name: "factories", type: "folder", level: 2 },
  { name: "ServiceFactory.ts", type: "file", level: 3, index: 3 },
];

interface FileExplorerProps {
  activeTab: number;
  onFileSelect: (index: number) => void;
  isMobile: boolean;
  onClose?: () => void;
}

function FileExplorer({
  activeTab,
  onFileSelect,
  isMobile,
  onClose,
}: FileExplorerProps) {
  return (
    <Box
      sx={{
        width: isMobile ? "100%" : 220,
        bgcolor: "#252526",
        borderRight: "1px solid #404040",
        overflow: "auto",
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderBottom: "1px solid #404040",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <FolderOpen sx={{ fontSize: 16, color: "#858585" }} />
        <Typography
          variant="caption"
          sx={{ color: "#cccccc", fontWeight: 600, letterSpacing: 1, flex: 1 }}
        >
          EXPLORER
        </Typography>
        {isMobile && onClose && (
          <IconButton size="small" onClick={onClose} sx={{ color: "#858585" }}>
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>
      <List dense sx={{ py: 0 }}>
        {folderStructure.map((item, idx) => (
          <ListItemButton
            key={idx}
            onClick={() => {
              if (item.type === "file" && item.index !== undefined) {
                onFileSelect(item.index);
                if (isMobile && onClose) onClose();
              }
            }}
            sx={{
              pl: item.level * 1.5 + 1,
              py: 0.3,
              minHeight: 24,
              bgcolor:
                item.type === "file" && item.index === activeTab
                  ? "#37373d"
                  : "transparent",
              "&:hover": { bgcolor: "#2a2d2e" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 20 }}>
              {item.type === "folder" ? (
                <FolderOpen sx={{ fontSize: 16, color: "#dcb67a" }} />
              ) : (
                <InsertDriveFile sx={{ fontSize: 16, color: "#519aba" }} />
              )}
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              primaryTypographyProps={{
                fontSize: "0.75rem",
                color:
                  item.type === "file" && item.index === activeTab
                    ? "#ffffff"
                    : "#cccccc",
                fontFamily: "monospace",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export function CodeShowcase({ title }: CodeShowcaseProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeFiles[activeTab].code);
    setCopied(true);
  }, [activeTab]);

  const handleFileSelect = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  // Create LTR theme
  const ltrTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        direction: "ltr",
      }),
    [theme]
  );

  return (
    <CacheProvider value={ltrCache}>
      <ThemeProvider theme={ltrTheme}>
        <Box
          component="section"
          sx={{ py: { xs: 6, md: 10 }, bgcolor: "background.default" }}
          dir="ltr"
        >
          <Container maxWidth="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  maxWidth: 700,
                  mx: "auto",
                  px: 2,
                  textAlign: "center",
                }}
              >
                Clean Architecture • SOLID Principles • Design Patterns •
                TypeScript
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                dir="ltr"
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  bgcolor: "#1e1e1e",
                  textAlign: "left",
                  border: "1px solid #404040",
                }}
              >
                {/* Title Bar */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2,
                    py: 1,
                    bgcolor: "#323233",
                    borderBottom: "1px solid #404040",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ display: "flex", gap: 0.8 }}>
                      <Circle sx={{ fontSize: 12, color: "#ff5f57" }} />
                      <Circle sx={{ fontSize: 12, color: "#febc2e" }} />
                      <Circle sx={{ fontSize: 12, color: "#28c840" }} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "#858585", fontFamily: "monospace", ml: 1 }}
                    >
                      {codeFiles[activeTab].name} — Code Showcase
                    </Typography>
                  </Box>
                  {isMobile && (
                    <IconButton
                      size="small"
                      onClick={() => setSidebarOpen(true)}
                      sx={{ color: "#858585" }}
                    >
                      <Menu fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Box sx={{ display: "flex", height: { xs: 420, md: 500 } }}>
                  {/* Sidebar - Desktop */}
                  {!isMobile && (
                    <FileExplorer
                      activeTab={activeTab}
                      onFileSelect={handleFileSelect}
                      isMobile={false}
                    />
                  )}

                  {/* Sidebar - Mobile Drawer */}
                  <Drawer
                    anchor="left"
                    open={sidebarOpen && isMobile}
                    onClose={() => setSidebarOpen(false)}
                    PaperProps={{ sx: { bgcolor: "#252526", width: 260 } }}
                  >
                    <FileExplorer
                      activeTab={activeTab}
                      onFileSelect={handleFileSelect}
                      isMobile={true}
                      onClose={() => setSidebarOpen(false)}
                    />
                  </Drawer>

                  {/* Main Editor Area */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    {/* File Tabs */}
                    <Box
                      sx={{
                        display: "flex",
                        bgcolor: "#252526",
                        borderBottom: "1px solid #404040",
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { height: 4 },
                        "&::-webkit-scrollbar-thumb": {
                          bgcolor: "#424242",
                          borderRadius: 2,
                        },
                      }}
                    >
                      <Tabs
                        value={activeTab}
                        onChange={(_, v) => setActiveTab(v)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                          minHeight: 36,
                          "& .MuiTab-root": {
                            minHeight: 36,
                            textTransform: "none",
                            color: "#858585",
                            fontSize: "0.75rem",
                            fontFamily: "monospace",
                            px: 1.5,
                            py: 0,
                            "&.Mui-selected": {
                              color: "#ffffff",
                              bgcolor: "#1e1e1e",
                            },
                          },
                          "& .MuiTabs-indicator": {
                            bgcolor: "#007acc",
                            height: 2,
                            top: 0,
                          },
                        }}
                      >
                        {codeFiles.map((file, idx) => (
                          <Tab
                            key={idx}
                            icon={<Code sx={{ fontSize: 14 }} />}
                            iconPosition="start"
                            label={file.name}
                          />
                        ))}
                      </Tabs>
                      <Box sx={{ flexGrow: 1 }} />
                      <IconButton
                        size="small"
                        onClick={handleCopy}
                        sx={{
                          color: "#858585",
                          mx: 1,
                          "&:hover": { color: "white" },
                        }}
                      >
                        {copied ? (
                          <Check fontSize="small" />
                        ) : (
                          <ContentCopy fontSize="small" />
                        )}
                      </IconButton>
                    </Box>

                    {/* File Info Bar */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        px: 2,
                        py: 0.75,
                        bgcolor: "#1e1e1e",
                        borderBottom: "1px solid #333",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ color: "#858585", fontFamily: "monospace" }}
                      >
                        {codeFiles[activeTab].path}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {codeFiles[activeTab].patterns.map((pattern) => (
                          <Chip
                            key={pattern}
                            label={pattern}
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              bgcolor: "#007acc33",
                              color: "#4fc3f7",
                              border: "1px solid #007acc55",
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Code Content */}
                    <Box sx={{ flex: 1, overflow: "auto" }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ height: "100%" }}
                        >
                          <SyntaxHighlighter
                            language={codeFiles[activeTab].language}
                            style={vscDarkPlus}
                            showLineNumbers
                            wrapLines
                            customStyle={{
                              margin: 0,
                              borderRadius: 0,
                              fontSize: isMobile ? "0.7rem" : "0.8rem",
                              padding: "1rem",
                              background: "#1e1e1e",
                              direction: "ltr",
                              textAlign: "left",
                              height: "100%",
                              overflow: "auto",
                            }}
                            lineNumberStyle={{
                              color: "#6e7681",
                              paddingRight: "1rem",
                              minWidth: isMobile ? "2rem" : "2.5rem",
                              fontSize: isMobile ? "0.65rem" : "0.75rem",
                            }}
                          >
                            {codeFiles[activeTab].code}
                          </SyntaxHighlighter>
                        </motion.div>
                      </AnimatePresence>
                    </Box>

                    {/* Status Bar */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        py: 0.5,
                        bgcolor: "#007acc",
                        color: "white",
                        fontSize: "0.7rem",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Terminal sx={{ fontSize: 14 }} />
                          <Typography variant="caption">
                            TypeScript React
                          </Typography>
                        </Box>
                        {!isMobile && (
                          <Typography variant="caption">UTF-8</Typography>
                        )}
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Typography variant="caption">
                          Ln {codeFiles[activeTab].code.split("\n").length}
                        </Typography>
                        {!isMobile && (
                          <>
                            <Typography variant="caption">Spaces: 2</Typography>
                            <Typography variant="caption">Prettier</Typography>
                          </>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Description Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, textAlign: "left" }}
                  >
                    {codeFiles[activeTab].name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "left" }}
                  >
                    {codeFiles[activeTab].description}
                  </Typography>
                </Box>
              </motion.div>
            </motion.div>

            <Snackbar
              open={copied}
              autoHideDuration={2000}
              onClose={() => setCopied(false)}
              message="Code copied to clipboard!"
            />
          </Container>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
