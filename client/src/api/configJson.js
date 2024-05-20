let user = JSON.parse(localStorage.getItem("user"));

const requestConfigJson = {
    headers: {
        Authorization: user ? `Bearer ${user.accessToken}` : "",
        "Content-Type": "application/json",
    },
};

export default requestConfigJson;
