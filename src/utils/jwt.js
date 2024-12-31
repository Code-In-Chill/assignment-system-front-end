export default function parseToken(token) {
    if (!token) {
        return null;
    }

    const arrayToken = token.split(".");

    return JSON.parse(atob(arrayToken[1]));
}

export function getRolesArray(token) {
    if (!token) {
        return [];
    }
    const parsedToken = parseToken(token);

    if (!parsedToken) {
        return [];
    }

    return parsedToken.realm_access.roles;
}

export function hasRole(role, roles) {
    if (roles.length > 0) {
        let i = roles.length;

        while (i--) {
            if (roles[i] === role) {
                return true;
            }
        }
    }

    return false;
}

export function hasAnyRoles(rolesToCheck, rolesArray) {
    for (let i = 0; i < rolesToCheck.length; i++) {
        const role = rolesToCheck[i];
        if (hasRole(role, rolesArray)) {
            return true;
        }
    }
    return false;
}