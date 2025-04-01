// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Divider,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";

// const AllRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     const admin_id = sessionStorage.getItem("admin_id");

//     if (!token || !admin_id || !token.startsWith("Admin")) {
//       navigate("/error");
//       return;
//     }

//     axios
//       .get("http://localhost:8080/viewAllfoodRequestsDetails")
//       .then((response) => {
//         const headers = [
//           "rid",
//           "uid",
//           "name",
//           "fid",
//           "description",
//           "posted_quantity",
//           "requested_quantity",
//           "posted_date",
//           "requested_date",
//           "food_status",
//           "request_status",
//           "food_provider_feedback",
//           "food_receiver_feedback",
//         ];

//         const structured = response.data.map((row) => {
//           const obj = {};
//           headers.forEach((key, i) => {
//             obj[key] = row[i];
//           });
//           return obj;
//         });

//         setRequests(structured);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load food requests:", err);
//         setError("Failed to load food requests.");
//         setLoading(false);
//       });
//   }, [navigate]);

//   return (
//     <div className="container mt-5" style={{ padding: 4,  minHeight: "100vh" }}>
//       <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ marginTop:4 }}>
//         All Food Requests
//       </Typography>
//       <Divider sx={{ my: 3 }} />

//       {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
//       {error && <Alert severity="error">{error}</Alert>}

//       {!loading && requests.length === 0 ? (
//         <Typography variant="h6" align="center" color="textSecondary">
//           No food requests found.
//         </Typography>
//       ) : (
//         <Box sx={{ overflowX: "auto" }}>
//           <TableContainer
//             component={Paper}
//             sx={{
//               border: "6px solid rgba(134, 239, 172, 0.8)",
//               borderRadius: 2,
//               minWidth: 1300,
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#d4edda" }}>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>RID</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>UID</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>Name</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>FID</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>Description</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>Posted Qty</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>Requested Qty</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 180 }}>
//                     Posted Date
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 180 }}>
//                     Requested Date
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>Food Status</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green" }}>Request Status</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 220 }}>
//                     Provider Feedback
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 220 }}>
//                     Receiver Feedback
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {requests.map((r, index) => (
//                   <TableRow
//                     key={index}
//                     sx={{
//                       "&:hover": {
//                         backgroundColor: "#f0fff4",
//                       },
//                     }}
//                   >
//                     <TableCell>{r.rid}</TableCell>
//                     <TableCell>{r.uid}</TableCell>
//                     <TableCell>{r.name}</TableCell>
//                     <TableCell>{r.fid}</TableCell>
//                     <TableCell>{r.description}</TableCell>
//                     <TableCell>{r.posted_quantity}</TableCell>
//                     <TableCell>{r.requested_quantity}</TableCell>
//                     <TableCell>{dayjs(r.posted_date).format("DD-MM-YY HH:mm:ss")}</TableCell>
//                     <TableCell>{dayjs(r.requested_date).format("DD-MM-YY HH:mm:ss")}</TableCell>
//                     <TableCell>{r.food_status}</TableCell>
//                     <TableCell>{r.request_status}</TableCell>
//                     <TableCell>{r.food_provider_feedback || "—"}</TableCell>
//                     <TableCell>{r.food_receiver_feedback || "—"}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       )}

//       <Divider sx={{ my: 3 }} />
//     </div>
//   );
// };

// export default AllRequests;





import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const admin_id = sessionStorage.getItem("admin_id");

    if (!token || !admin_id || !token.startsWith("Admin")) {
      navigate("/error");
      return;
    }

    axios
      .get("http://localhost:8080/viewAllfoodRequestsDetails")
      .then(async (response) => {
        const headers = [
          "food_id", // index 0 (internal use only)
          "rid",
          "uid",
          "name",
          "fid",
          "description",
          "posted_quantity",
          "requested_quantity",
          "posted_date",
          "requested_date",
          "food_status",
          "request_status",
          "food_provider_feedback",
          "food_receiver_feedback",
        ];

        const now = dayjs();

        const structured = await Promise.all(
          response.data.map(async (row) => {
            const obj = {};
            headers.forEach((key, i) => {
              obj[key] = row[i];
            });

            const isExpired =
              (obj.food_status === "Available" || obj.food_status === "Requested to Collect") &&
              dayjs(obj.requested_date).isBefore(now);

            if (isExpired) {
              try {
                await axios.put(`http://localhost:8080/markExpired/${obj.food_id}`);
                obj.food_status = "Expired";
              } catch (err) {
                console.error(`Failed to mark food ${obj.food_id} as expired`);
              }
            }

            return obj;
          })
        );

        setRequests(structured);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load food requests:", err);
        setError("Failed to load food requests.");
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="container mt-5" style={{ padding: 4, minHeight: "100vh" }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ marginTop: 4 }}>
        All Food Requests
      </Typography>
      <Divider sx={{ my: 3 }} />

      {loading && <CircularProgress sx={{ display: "block", margin: "20px auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && requests.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No food requests found.
        </Typography>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer
            component={Paper}
            sx={{
              border: "6px solid rgba(134, 239, 172, 0.8)",
              borderRadius: 2,
              minWidth: 1300,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#d4edda" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Request ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Food ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 180  }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Posted Qty</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Requested Qty</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 180 }}>
                    Posted Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 180 }}>
                    Requested Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Food Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green" }}>Request Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 220 }}>
                    Provider Feedback
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "green", minWidth: 220 }}>
                    Receiver Feedback
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((r, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f0fff4",
                      },
                    }}
                  >
                    <TableCell>{r.rid}</TableCell>
                    <TableCell>{r.uid}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.fid}</TableCell>
                    <TableCell>{r.description}</TableCell>
                    <TableCell>{r.posted_quantity}</TableCell>
                    <TableCell>{r.requested_quantity}</TableCell>
                    <TableCell>{dayjs(r.posted_date).format("DD-MM-YY HH:mm:ss")}</TableCell>
                    <TableCell>{dayjs(r.requested_date).format("DD-MM-YY HH:mm:ss")}</TableCell>
                    <TableCell>{r.food_status}</TableCell>
                    <TableCell>{r.request_status}</TableCell>
                    <TableCell>{r.food_provider_feedback || "—"}</TableCell>
                    <TableCell>{r.food_receiver_feedback || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />
    </div>
  );
};

export default AllRequests;
