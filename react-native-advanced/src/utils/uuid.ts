/**
 * Custom UUID generator for React Native that doesn't rely on crypto.getRandomValues()
 * This avoids the common error in React Native: "crypto.getRandomValues() not supported"
 */
export const generateUUID = (): string => {
  // Use timestamp and random numbers to create a UUID-like string
  const timestamp = new Date().getTime().toString(16);
  const randomPart = Math.floor(Math.random() * 1000000000).toString(16);
  const secondRandomPart = Math.floor(Math.random() * 1000000000).toString(16);
  
  // Format it like a UUID
  return `${timestamp.padStart(8, '0')}-${randomPart.padStart(4, '0')}-4${secondRandomPart.substring(0, 3)}-${
    Math.floor(Math.random() * 10000).toString(16).padStart(4, '0')}-${Math.floor(Math.random() * 10000000000).toString(16).padStart(12, '0')}`;
};
