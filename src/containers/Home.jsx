import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@material-ui/core";
import Refresh from "@material-ui/icons/Refresh";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import ImageUpload from "../components/ImageUpload";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [userRows, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [newOrder, setNewOrder] = useState({ customer: "", amount: "", status: "pending" });

  useEffect(() => {
    fetchUsers();
    fetchNotifications();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    setUserLoading(true);
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
    setUsers(response.data);
    setUserLoading(false);
  };

  const fetchNotifications = async () => {
    setNotificationLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/notifications`
    );
    setNotifications(response.data);
    setNotificationLoading(false);
  };

  const fetchOrders = async () => {
    setOrderLoading(true);
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/orders`
    );
    setOrders(response.data);
    setOrderLoading(false);
  };

  const handleCreateOrder = async () => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/orders`, {
      customer: newOrder.customer,
      amount: parseFloat(newOrder.amount),
      status: newOrder.status,
    });
    setOrderOpen(false);
    setNewOrder({ customer: "", amount: "", status: "pending" });
    fetchOrders();
  };

  const handleSubmit = async (data) => {
    const { firstName, lastName, email } = data;
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users`, {
      firstName,
      lastName,
      email,
      imageUrl,
    });
    if (response.status === 200) {
      fetchUsers();
    }
    setOpen(false);
  };

  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const imageurl = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/users/upload`,
      fd,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setImageUrl(imageurl.data.imageUrl);
  };

  return (
    <div style={{width:"60%",margin: "auto"}}>
      <Grid container spacing={2} direction="column">
        <Grid sm={12} xs={12} md={12} lg={12}>
          <Paper style={{ padding: 50, margin: 50 }}>
            <Grid container justify="space-between">
              <Typography variant="h5">Users</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                style={{ margin: 10, height: 30 }}
              >
                Add user
              </Button>
            </Grid>
            <Table
              aria-label="simple table"
              style={{ border: "solid 1px #E0E0E0" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    FirstName
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    LastName
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    email
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Image
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  userRows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.firstName}</TableCell>
                      <TableCell align="right">{row.lastName}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        <img
                          src={row.imageUrl}
                          alt=""
                          width="60"
                          height="60"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid sm={12} xs={12} md={12} lg={12}>
          <Paper style={{ padding: 50, margin: 50 }}>
            <Grid container justify="space-between">
              <Typography variant="h5">Notifications</Typography>
              <IconButton
                color="primary"
                aria-label="Refresh"
                onClick={fetchNotifications}
              >
                <Refresh />
              </IconButton>
            </Grid>
            <Table
              aria-label="simple table"
              style={{ border: "solid 1px #E0E0E0" }}
            >
              <TableHead>
                <TableRow style={{ borderCollapse: "unset" }}>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Id
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Type
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Notification
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notificationLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  notifications.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.message}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid sm={12} xs={12} md={12} lg={12}>
          <Paper style={{ padding: 50, margin: 50 }}>
            <Grid container justify="space-between">
              <Typography variant="h5">Orders</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOrderOpen(true)}
                style={{ margin: 10, height: 30 }}
              >
                Add Order
              </Button>
            </Grid>
            <Table
              aria-label="simple table"
              style={{ border: "solid 1px #E0E0E0" }}
            >
              <TableHead>
                <TableRow style={{ borderCollapse: "unset" }}>
                  <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Amount
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Customer
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="right">{row.customer}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={orderOpen} onClose={() => setOrderOpen(false)}>
        <div style={{ margin: 50, minWidth: 300 }}>
          <DialogTitle style={{ fontWeight: 500, textAlign: "center" }}>
            Add Order
          </DialogTitle>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <input
                placeholder="Customer name"
                value={newOrder.customer}
                onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
              />
            </Grid>
            <Grid item>
              <input
                placeholder="Amount"
                type="number"
                value={newOrder.amount}
                onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
              />
            </Grid>
            <Grid item>
              <select
                value={newOrder.status}
                onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                style={{ width: "100%", padding: 8 }}
              >
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
              </select>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCreateOrder}
                disabled={!newOrder.customer || !newOrder.amount}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </div>
      </Dialog>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div style={{ margin: 50 }}>
          <DialogTitle
            id="simple-dialog-title"
            style={{ fontWeight: 500, textAlign: "center" }}
          >
            Add user
          </DialogTitle>
          <Grid item style={{ margin: 20 }}>
            <ImageUpload upload={uploadImage} />
          </Grid>
          <AddUser handleSubmit={handleSubmit} />
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
