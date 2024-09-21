export const UserRoles = {
    User: "user",
    Member: "member",
    Raider: "raider",
    Officer: "officer",
    Guildlead: "guildlead",
    Admin: "admin",
} as const;

export type UserRole = keyof typeof UserRoles;