import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Alert,
  Avatar,
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Person, CreditCard } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const admin_id = sessionStorage.getItem("admin_id");
  const token = sessionStorage.getItem("token");

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/viewAllusers")
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => {
          if (a.user_status === "Banned" && b.user_status !== "Banned") return 1;
          if (a.user_status !== "Banned" && b.user_status === "Banned") return -1;
          return 0;
        });
        setUsers(sortedUsers);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!admin_id || !token || !token.startsWith("Admin")) {
        navigate("/error");
        return;
    }
    fetchUsers();
  }, [admin_id, token, navigate]);


  const handleOpenDialog = (user, action) => {
    setSelectedUser(user);
    setActionType(action);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setActionType("");
  };

  const handleConfirmAction = () => {
    const url =
      actionType === "ban"
        ? "http://localhost:8080/banUser"
        : "http://localhost:8080/unbanUser";

    axios
      .put(url, {
        user_id: selectedUser.user_id,
        user_status: selectedUser.user_status,
      })
      .then(() => {
        fetchUsers();
        handleCloseDialog();
      })
      .catch((err) => {
        console.error(err);
        setError("Operation failed. Try again.");
        handleCloseDialog();
      });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: 4, textAlign: "center" }}>
        {error}
      </Alert>
    );
  }

  return (
      <Box sx={{ padding: 4, minHeight: "100vh", marginTop: 8 }}>
        <Typography variant="h4" fontWeight="bold" align="center" mb={4}>
          All Registered Users
        </Typography>

        <Box mb={4} display="flex" justifyContent="center">
          <TextField
            label="Search User"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              minWidth: 300,
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "black",
                color: "rgba(134, 239, 172, 0.8)",
                "& fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
                "&:hover fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
                "&.Mui-focused fieldset": { borderColor: "rgba(134, 239, 172, 0.8)" },
              },
              "& .MuiInputLabel-root": { color: "rgba(134, 239, 172, 0.8)" },
              "& .MuiInputLabel-root.Mui-focused": { color: "rgba(134, 239, 172, 0.8)" },
            }}
          />
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.user_id}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 2,
                  height: 500,
                  bgcolor: user.user_status === "Banned" ? "#f8d7da" : "white",
                }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "8px solid rgba(134, 239, 172, 0.8)",
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {user.uid}
                    </Typography>
                    <Avatar
                      src={user.profile_pic || ""}
                      sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                    >
                      {!user.profile_pic && <Person sx={{ fontSize: 40 }} />}
                    </Avatar>

                    <Typography variant="h6" fontWeight="bold">
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Phone: {user.phone}
                    </Typography>

                    <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                      Aadhar Card
                    </Typography>

                    {user.aadhar ? (
                      <Box
                        component="img"
                        src={user.aadhar}
                        alt="Aadhar Card"
                        sx={{
                          width: "100%",
                          maxWidth: 240,
                          height: 140,
                          objectFit: "cover",
                          borderRadius: 1,
                          mx: "auto",
                        }}
                      />
                    ) : (
                      <Avatar variant="square" sx={{ width: 140, height: 140, mx: "auto" }}>
                        <CreditCard sx={{ fontSize: 40 }} />
                      </Avatar>
                    )}
                  </Box>

                  <Box>
                    {user.user_status === "Banned" ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenDialog(user, "unban")}
                      >
                        Unban User
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpenDialog(user, "ban")}
                      >
                        Ban User
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{actionType === "ban" ? "Confirm Ban User" : "Confirm Unban User"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to {actionType} <strong>{selectedUser?.name}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleConfirmAction}
              color={actionType === "ban" ? "error" : "success"}
              variant="contained"
            >
              {actionType === "ban" ? "Ban User" : "Unban User"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
   
  );
};

export default AllUsers;
