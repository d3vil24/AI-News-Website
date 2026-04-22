export function isAuthorized(request: Request) {
  const apiKey = process.env.PUBLISH_API_KEY;
  if (!apiKey) return true;
  return request.headers.get("x-api-key") === apiKey;
}

export function isAdminAuthorized(request: Request): boolean {
  // Support both server-only token and public token (for client-side admin UI)
  const token =
    process.env.ADMIN_BEARER_TOKEN ||
    process.env.NEXT_PUBLIC_ADMIN_TOKEN;

  // If no token is configured at all, allow (dev/local mode)
  if (!token) return true;

  const authHeader = request.headers.get("authorization") ?? "";
  const apiKeyHeader = request.headers.get("x-api-key") ?? "";

  return (
    authHeader === `Bearer ${token}` ||
    apiKeyHeader === token
  );
}
