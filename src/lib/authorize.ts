export const AuthorizationMiddleware = (role: string): unknown => {
  // Check if the current user has the required role
  console.log("Authorization executed...");

  const currentUserRole = "admin"; // Get the current user's role from your authentication system
  if (currentUserRole === role) {
    console.log("Exxxbb");

    // redirect("/unauth");
    return true;
  } else return false;
};
