import { IconButton, Toolbar, Tooltip } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Dispatch, SetStateAction } from "react";


export default function ToolbarComponent({setOpen}: {setOpen: Dispatch<SetStateAction<boolean>>}) {
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Toolbar
            disableGutters 
            variant="dense" 
            sx={{ flex: '1 1 auto', flexDirection: 'row-reverse', background: '#2aae84'}}
        >
            <Tooltip title="Filtrar lista">
                <IconButton
                    size="large"
                    edge="start"
                    sx={{ mr: 2, color: "white"}}
                    onClick={handleClickOpen}
                    >
                        <FilterListIcon/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}