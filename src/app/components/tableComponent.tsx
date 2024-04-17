import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Dispatch, SetStateAction } from "react";


export default function TableComponent(
    {
        realdata, 
        page,
        rowsPerPage,
        setPage,
        setRowsPerPage
    } 
    : {
        realdata: any 
        page: number
        rowsPerPage: number
        setPage: Dispatch<SetStateAction<number>>
        setRowsPerPage: Dispatch<SetStateAction<number>>
    }) {

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };
        
        
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
        <TableContainer sx={{ maxHeight: '350px'}}>
            <Table
                stickyHeader 
                sx={{ 'background': "#2aae84"}} 
                aria-label="simple table"
            >
            <TableHead
                sx={{background: "#2aae84"}}
            >
                <TableRow>
                    <TableCell sx={{background: "#2aae84", color: "white"}}>Timestamp</TableCell>
                    <TableCell sx={{background: "#2aae84", color: "white"}} align="right">Variable</TableCell>
                    <TableCell sx={{background: "#2aae84", color: "white"}} align="right">Valor</TableCell>
                    <TableCell sx={{background: "#2aae84", color: "white"}} align="right">Tiempo de ingreso</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {realdata !== null ? 
                    realdata
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => (
                    <TableRow
                        key={row.name}
                        hover 
                        sx={{ cursor: 'pointer'}}
                    >
                        <TableCell sx={{ color: "white" }} component={"th"} scope="row">{row.timestamp}</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">{row.variable}</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">{row.value === null ? null : row.value}</TableCell>
                        <TableCell sx={{ color: "white" }} align="right">{row.ingestionTime}</TableCell>
                    </TableRow>
                )) : 
                <TableRow>
                    <TableCell component={"th"} scope="row">Loading</TableCell>
                </TableRow>}
            </TableBody>
            </Table>
        </TableContainer> 
    <TablePagination
        component="div"
        sx={{background: "#2aae84", color: "white"}}
        count={realdata !== null ? realdata.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5,10,25,50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
    />
        </>
    )
}