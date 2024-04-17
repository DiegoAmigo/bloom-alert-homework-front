import { CardHeader, Stack, CardContent, Card, Button, CircularProgress } from "@mui/material";
import { Dispatch, MutableRefObject, SetStateAction } from "react";


export default function CardComponent(
    { 
        orgs, 
        obtainData, 
        nameOrgRef, 
        setIdOrg, 
        drawPolygon 
    } : { 
        orgs: any, 
        obtainData: Function, 
        nameOrgRef: MutableRefObject<string>, 
        setIdOrg: Dispatch<SetStateAction<number | null | undefined>>, 
        drawPolygon: Function
    }) {
    return (
        <Card>
            <CardHeader
                sx={{ textAlign: "center", background: "#2aae84", color: "white" }}
                title="HomeWork Bloom"
                subheader="haga clic en uno de los botones para mostrar información">
            </CardHeader>
            <CardContent
                sx={{ background: "#2aae84"}}>
                {orgs !== null ? 
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent={"center"}
                    bgcolor={"#2aae84"}
                >
                    {orgs.map((vals: any) => (
                    <Button
                        sx={{background: "#8fb73b"}}
                        key={vals.organization}
                        variant="contained" 
                        onClick={() => {
                        obtainData(vals.id);
                        nameOrgRef.current = vals.organization;
                        setIdOrg(vals.id);
                        drawPolygon(vals.id);
                        }}
                    >
                    {vals.organization}
                    </Button>
                    ))}
                </Stack> : 
                <CircularProgress/>}
            </CardContent>
        </Card>
    )
}