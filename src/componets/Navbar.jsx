import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useAuthContext } from "../context/AuthProvider";

const drawerWidth = 240;

function Navbar(props) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem onClick={() => navigate("/")} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/register")} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Register" />
          </ListItemButton>
        </ListItem>

        {user ? (
          <ListItem onClick={() => logout()} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem onClick={() => navigate("/login")} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const logout = async () => {
    signOut(auth);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
          >
            {"< HMZAYGN />"}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
              sx={{ color: "#fff" }}
            >
              Home
            </Button>

            <Button
              onClick={() => navigate("/register")}
              variant="outlined"
              sx={{ color: "#fff" }}
            >
              Register
            </Button>

            {user ? (
              <Button
                onClick={logout}
                variant="outlined"
                sx={{ color: "#fff" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                variant="outlined"
                sx={{ color: "#fff" }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
