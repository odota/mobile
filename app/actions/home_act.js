export const types = {
    SET_HOME_PROFILE: 'SET_HOME_PROFILE',
    RESET_HOME_PROFILE: 'RESET_HOME_PROFILE'
}

export function setHomeProfile(profile) {
    return {
        type: types.SET_HOME_PROFILE,
        profile
    };
}

export function resetHomeProfile() {
    return {
        type: types.RESET_HOME_PROFILE
    };
}
