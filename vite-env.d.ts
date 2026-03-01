// Source - https://stackoverflow.com/a/78706043
// Posted by Menial Orchestra
// Retrieved 2026-02-27, License - CC BY-SA 4.0

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
