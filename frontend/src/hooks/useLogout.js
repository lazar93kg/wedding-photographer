
export const useLogout = () => {
    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user')
        window.location.reload(false);
    }
    return { logout }
}
