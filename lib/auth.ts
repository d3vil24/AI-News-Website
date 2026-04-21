export function isAuthorized(request: Request) {
  const apiKey = process.env.PUBLISH_API_KEY;
  if (!apiKey) return true;
  return request.headers.get('x-api-key') === apiKey;
}
