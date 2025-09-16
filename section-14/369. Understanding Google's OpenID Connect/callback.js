const sid = new URLSearchParams(location.search).get("sid")
const error = new URLSearchParams(location.search).get("error")

if (sid) {
    const baseUrl = 'http://localhost:4000';
    const res = await fetch(`${baseUrl}/session-cookie?sid=${sid}`, {
        credentials: 'include'
    })

    if (res.status === 200) {
        window.opener.postMessage({ message: "success" })
        window.close()
    }
}
if(error) {
    window.close()
}