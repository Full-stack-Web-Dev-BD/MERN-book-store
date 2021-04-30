import { Button, Link, List, ListItem, ListItemIcon } from "@material-ui/core"
import { useEffect, useState } from "react"

const AuthButton = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        if (window.localStorage.getItem('st_app')) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    },[])
    const logout = () => {
        window.localStorage.removeItem('st_app')
        window.location.reload()
    }
    return (
        <>
            {
                auth ?
                    <List>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <Button onClick={() => { logout() }} color="warning" variant="contained">Logout</Button>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <Button onClick={() => window.location.href = '/cart'} color="primary" variant="contained">Cart</Button>
                        </ListItem>
                    </List>
                    :
                    <List style={{ textAlign: 'center' }}>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <Button onClick={() => window.location.href = '/login'} color="primary" variant="contained">Signin</Button>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <Button onClick={() => window.location.href = '/register'} color="primary" variant="contained">Register</Button>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon></ListItemIcon>
                            <Button onClick={() => window.location.href = '/cart'} color="primary" variant="contained">Cart</Button>
                        </ListItem>
                    </List>
            }
        </>
    )
}

export default AuthButton