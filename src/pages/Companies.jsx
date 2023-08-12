import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Modal,
  TextField,
  IconButton,
  Box,
  InputLabel,
  styled,
  Tooltip,
  Pagination, // Import Pagination component
  PaginationItem,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PencilIcon from "@mui/icons-material/Create";
import AcceptIcon from "@mui/icons-material/Check";
import RejectIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import companyService from "../services/company.service";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import SearchBar from "../components/SearchBar";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: "#FF4B00",
    },
  },
});

const StyledModalContent = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  borderRadius: "5px",
  maxWidth: "70%",
  width: "400px",
  padding: "20px",
  boxShadow: theme.shadows[5],
  outline: "none",
}));

const StyledFileInputButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#FF4B00",
  color: "white",
  "&:hover": {
    backgroundColor: "#8000BA",
  },
}));

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newCompany, setNewCompany] = useState({
    company_name: "",
    company_image: null,
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [donatedHairInput, setDonatedHairInput] = useState({});
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Change this to adjust the number of items per page
  const [loading, setLoading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleDeleteCompany = async (companyId) => {
    setSelectedCompanyId(companyId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);

      const res = await companyService.deleteCompany(selectedCompanyId);
      console.log(res);

      if (res?.status === 200 || res?.status === 204) {
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== selectedCompanyId)
        );
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setSelectedCompanyId(null);
    setDeleteDialogOpen(false);
  };

  const handleAddCompany = () => {
    setOpenModal(true);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const init = React.useCallback(async () => {
    setLoading(true);
    const res = await companyService.fetchData();
    console.log(res);
    if (res?.status === 200) {
      setCompanies(res?.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCompany({
      company_name: "",
      company_image: null,
    });
    setLogoPreview(null);
  };

  const handleAddNewCompany = async () => {
    if (!newCompany.company_image) {
      alert("Please select a company logo.");
      return;
    }

    const newCompanyProps = {
      company_name: newCompany.company_name,
      company_image: newCompany.company_image,
    };

    try {
      setLoading(true);

      const base64Image = await convertToBase64(newCompanyProps.company_image);
      newCompanyProps.company_image = base64Image;

      const res = await companyService.createCompany(newCompanyProps);
      console.log(res);

      if (res?.status === 200) {
        setCompanies(res?.data);
        handleCloseModal();
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setNewCompany({
        ...newCompany,
        company_image: file,
      });
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDonatedHair = (companyId) => {
    setSelectedCompanyId(companyId);
    setDonatedHairInput((prevState) => ({
      ...prevState,
      [companyId]:
        companies.find(
          (company) => company.id === companyId && company.last_updated_mil
        ) || "",
    }));
  };
  const handleAcceptDonatedHair = async (companyId) => {
    setDonatedHairInput((prevState) => ({
      ...prevState,
      [companyId]: "",
    }));
    setLoading(true);
    const updateCompanyProps = {
      id: companyId,
      donatedHair: donatedHairInput[companyId],
    };

    const res = await companyService.updateCompany(updateCompanyProps);
    console.log(res);
    if (res?.status === 200 || res?.status === 201) {
      setLoading(false);
    }
    setSelectedCompanyId(null);
    window.location.reload();
  };

  const handleRejectDonatedHair = (companyId) => {
    // Handle rejecting donated hair and reverting to pencil icon
    setDonatedHairInput((prevState) => ({
      ...prevState,
      [companyId]: "",
    }));
    setSelectedCompanyId(null);
  };

  const handleDonatedHairInputChange = (companyId, value) => {
    setDonatedHairInput((prevState) => ({
      ...prevState,
      [companyId]: value,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const applySearch = async (srchText) => {
    setLoading(true);
    let propsTemp = { search: srchText };
    const res = await companyService.getSearchedTable(propsTemp);
    setCompanies(res?.data);
    setCurrentPage(1); // Reset current page when performing a new search
    setLoading(false);
  };

  const handleSearch = (srchText) => {
    setSearchText(srchText);
    applySearch(srchText);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <ThemeProvider theme={theme}>
      <Box
        maxWidth="90%" // Increase the maximum width for smaller screen sizes
        margin="2rem auto"
        paddingTop="4rem"
        position="relative"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          position="relative"
          maxWidth="100%" // Increase the maximum width for smaller screen sizes
          margin="0 auto 2rem"
        >
          <SearchBar onSearch={handleSearch} />
          <Tooltip title="Add Company">
            <IconButton
              onClick={handleAddCompany}
              sx={{
                background: "linear-gradient(to right, #8000BA, #FF4B00)",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                color: "white",
                transition:
                  "transform 0.3s ease-in-out, background 0.3s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(to right, #FF4B00, #8000BA)",
                  transform: "scale(1.05)",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company ID</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Company Logo</TableCell>
                <TableCell>Last Donated Hair Length(miles)</TableCell>
                <TableCell>Total Donated Hair Length(miles)</TableCell>
                <TableCell>Add Donated Hair (cm)</TableCell>
                <TableCell>Delete Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                companies.slice(startIndex, endIndex).map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>{company.id}</TableCell>
                    <TableCell>{company.company_name}</TableCell>
                    <TableCell>
                      <img
                        src={company.company_image}
                        alt={`${company.company_name} Logo`}
                        style={{ width: "50px", height: "auto" }}
                      />
                    </TableCell>
                    <TableCell>
                      {company.last_updated_mil ? company.last_updated_mil : 0}
                    </TableCell>
                    <TableCell>
                      {company.company_donation_mil
                        ? company.company_donation_mil
                        : 0}
                    </TableCell>
                    <TableCell>
                      {selectedCompanyId === company.id && !deleteDialogOpen ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "14px", // Font boyutunu artırın
                          }}
                        >
                          <TextField
                            value={donatedHairInput[company.id] || ""}
                            onChange={(e) =>
                              handleDonatedHairInputChange(
                                company.id,
                                e.target.value
                              )
                            }
                            size="small"
                            variant="outlined"
                            type="number"
                            sx={{
                              mr: 1,
                              "& .MuiFilledInput-underline: before": {
                                borderBottomColor: "#FF4B00",
                              },
                              "& .MuiFilledInput-underline: after": {
                                borderBottomColor: "#FF4B00",
                              },
                              "& .MuiInputLabel-root.Mui-focused": {
                                color: "#FF4B00",
                              },
                              "& .MuiInputBase-root.Mui-focused": {
                                color: "#FF4B00",
                              },
                            }}
                            inputProps={{
                              style: {
                                fontSize: "14px",
                                padding: "5px",
                                width: "40px", // Input alanının genişliğini artırın
                              },
                            }}
                          />
                          <IconButton
                            onClick={() => handleAcceptDonatedHair(company.id)}
                            aria-label="Accept Donated Hair"
                            style={{ color: "green" }}
                          >
                            <AcceptIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleRejectDonatedHair(company.id)}
                            aria-label="Reject Donated Hair"
                            style={{ color: "red" }}
                          >
                            <RejectIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <IconButton
                          onClick={() => handleAddDonatedHair(company.id)}
                          aria-label="Add Donated Hair"
                          sx={{ padding: "8px" }} // İkonun iç boşluğunu artırın
                        >
                          <PencilIcon sx={{ fontSize: 18, color: "#8000BA" }} />
                          {/* İkon boyutunu artırın */}
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteCompany(company.id)}
                        aria-label="Delete Company"
                        sx={{ padding: "8px" }}
                      >
                        <DeleteIcon sx={{ fontSize: 18, color: "#FF0000" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleConfirmDelete}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={Math.ceil(companies.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: item.selected ? "#FFFFFF" : "#FF4B00",
                  "&.Mui-selected": {
                    backgroundColor: "#FF4B00",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "#FF4B00",
                  },
                  "&:hover": {
                    backgroundColor: item.selected ? "#FF4B00" : "#F5F5F5",
                  },
                }}
              />
            )}
          />
        </Box>

        <Modal open={openModal} onClose={handleCloseModal}>
          <StyledModalContent>
            <Tooltip title="Close Modal">
              <IconButton
                onClick={handleCloseModal}
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>

            <InputLabel style={{ marginTop: "2rem" }}>Company Name</InputLabel>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                margin="normal"
                value={newCompany.company_name}
                onChange={(e) =>
                  setNewCompany({ ...newCompany, company_name: e.target.value })
                }
                variant="outlined"
                sx={{
                  "& .MuiFilledInput-underline: before": {
                    borderBottomColor: "#FF4B00",
                  },
                  "& .MuiFilledInput-underline: after": {
                    borderBottomColor: "#FF4B00",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FF4B00",
                  },
                  "& .MuiInputBase-root.Mui-focused": {
                    color: "#FF4B00",
                  },
                }}
              />
            </ThemeProvider>
            <InputLabel style={{ marginTop: "1rem" }}>Company Logo</InputLabel>
            <StyledFileInputButton
              variant="contained"
              component="label"
              htmlFor="logoInput"
              sx={{
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "1rem",
              }}
            >
              Upload Logo
              <input
                id="logoInput"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                style={{ display: "none" }}
              />
            </StyledFileInputButton>
            {selectedFileName && (
              <Typography variant="body1" color="textSecondary">
                Selected File: {selectedFileName}
              </Typography>
            )}
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Logo Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginBottom: "1rem",
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2rem",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewCompany}
                fullWidth
                sx={{
                  background: "linear-gradient(to right, #8000BA, #FF4B00)",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                  color: "white",
                  transition:
                    "transform 0.3s ease-in-out, background 0.3s ease-in-out",
                  "&:hover": {
                    background: "linear-gradient(to right, #FF4B00, #8000BA)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Add Company
              </Button>
            </div>
          </StyledModalContent>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default Companies;
