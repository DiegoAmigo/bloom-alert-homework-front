import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function DialogComponent(
    {
        open, 
        setOpen, 
        obtainData, 
        idOrg, 
        setDigestTimeStart,
        DigestTimeStart,
        setDigestTimeEnd,
        DigestTimeEnd,
        setTimeStampStart,
        timeStampStart,
        setTimeStampEnd,
        timeStampEnd,
        setVariable, 
        variable
} : {
    open: boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>, 
    obtainData: Function
    idOrg: number
    setDigestTimeStart: Dispatch<SetStateAction<dayjs.Dayjs | null | undefined>>
    DigestTimeStart: dayjs.Dayjs | null | undefined
    setDigestTimeEnd: Dispatch<SetStateAction<dayjs.Dayjs | null | undefined>>
    DigestTimeEnd: dayjs.Dayjs | null | undefined
    setTimeStampStart: Dispatch<SetStateAction<dayjs.Dayjs | null | undefined>>
    timeStampStart: dayjs.Dayjs | null | undefined
    setTimeStampEnd: Dispatch<SetStateAction<dayjs.Dayjs | null | undefined>>
    timeStampEnd: dayjs.Dayjs | null | undefined
    setVariable: Dispatch<SetStateAction<string | null | undefined>>
    variable: string
}) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const digestTimeStart = formJson.DigestTimeStart ? dayjs(formJson.DigestTimeStart).format('YYYY-MM-DD HH:mm:sssssss UTC') : undefined;
                        const digestTimeEnd = formJson.DigestTimeEnd ? dayjs(formJson.DigestTimeEnd).format('YYYY-MM-DD HH:mm:sssssss UTC') : undefined;
                        const variable = formJson.variable === '' ? undefined : formJson.variable;
                        const timeStampStart = formJson.timeStampStart ? dayjs(formJson.timeStampStart).format('YYYY-MM-DD HH:mm:sssssss UTC') : undefined;
                        const timeStampEnd = formJson.timeStampEnd ? dayjs(formJson.timeStampEnd).format('YYYY-MM-DD HH:mm:sssssss UTC') : undefined;
                        obtainData(idOrg!, {digestTimeStart, digestTimeEnd, timeStampStart, timeStampEnd, variable});
                        handleClose();
                    },
            }}
        >
            <DialogTitle bgcolor={"#2aae84"} color={"white"}>Aplicar Filtros</DialogTitle>
                <DialogContent sx={{background: "#2aae84"}}>
                    <DialogContentText color={"white"}>Filtros</DialogContentText>
                        <Typography color={"white"}>Fecha de Ingreso a Bloom</Typography>
                        <FormControl>
                            <Box display={"flex"} flexDirection={"row"}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                sx={{ input: { color: "white" }}}
                                name="DigestTimeStart"
                                onChange={(newValue) => setDigestTimeStart(newValue)}
                                slotProps={{ textField: { size: 'small'}}}
                                value={DigestTimeStart}
                                >
                                </DateTimePicker>
                                </LocalizationProvider>
                                -
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                sx={{ input: { color: "white" }}}
                                    name="DigestTimeEnd"
                                    value={DigestTimeEnd}
                                    onChange={(newValue) => setDigestTimeEnd(newValue)}
                                    slotProps={{ textField: { size: 'small'}}}
                                />
                                </LocalizationProvider>

                            </Box>
                            <Typography color={"white"}>Fecha de detección</Typography>
                            <Box display={"flex"} flexDirection={"row"}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        sx={{ input: { color: "white" }}}
                                        name="timeStampStart"
                                        value={timeStampStart}
                                        onChange={(newValue) => setTimeStampStart(newValue)}
                                        slotProps={{ textField: { size: 'small'}}}
                                    />
                                </LocalizationProvider>
                                -
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        sx={{ input: { color: "white" }}}
                                        name="timeStampEnd"
                                        value={timeStampEnd}
                                        onChange={(newValue) => setTimeStampEnd(newValue)}
                                        slotProps={{ textField: { size: 'small'}}}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box
                                sx={{display: 'flex', flexDirection: 'row', mt: '10px'}}
                            >
                            <TextField
                                sx={{ input: { color: "white" }, label: { color: "white" }}}
                                label="Variable"
                                variant="standard"
                                size="small"
                                name="variable"
                                value={variable}
                                onChange={(event) => setVariable(event.target.value)}
                            />
                            </Box>
                        </FormControl>
                    <DialogActions>
                        <Button sx={{ background: "#8fb73b" }} variant="contained" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button sx={{ background: "#8fb73b" }} variant="contained" type="submit">
                            Filtrar
                        </Button>
                    </DialogActions>
                </DialogContent>
                </Dialog>
    )
}