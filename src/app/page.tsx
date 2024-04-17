'use client'
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from 'axios';
import { Dayjs } from "dayjs";
import CardComponent from './components/cardComponent';
import ToolbarComponent from './components/toolbarComponent';
import DialogComponent from "./components/dialogComponent";
import TableComponent from "./components/tableComponent";
import { filterQuery } from "./utils/filterQuery";

export default function Home() {
  //States and refs used for the app
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map,setMap] = useState<mapboxgl.Map>();
  const [lng, setLng] = useState(-70.64827);
  const [lat, setLat] = useState(-33.45694);
  const [zoom, setZoom] = useState(9);
  const [orgs, setOrgs] = useState<any>(null);
  const nameOrgRef = useRef<string>('');
  const currentNameOrgRef = useRef<string>('');
  const [realdata, setRealData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [geoJSON, setGeoJSON] = useState<any>();
  const [open, setOpen] = useState(false);
  const [timeStampStart, setTimeStampStart] = useState<Dayjs | null>();
  const [timeStampEnd, setTimeStampEnd] = useState<Dayjs | null>();
  const [DigestTimeStart, setDigestTimeStart] = useState<Dayjs | null>();
  const [DigestTimeEnd, setDigestTimeEnd] = useState<Dayjs | null>();
  const [variable, setVariable] = useState<string | null>();
  const [idOrg, setIdOrg] = useState<number | null>();

  
  const getOrgs = async () => {
    const res = await axios.get("http://localhost:8000/orgs");
    if (res.status === 200) {
      setOrgs(res.data.data);
    }
  }

  const obtainData = async (id: number, 
    options: {
      digestTimeStart?: string, 
      digestTimeEnd?: string, 
      timeStampStart?: string, 
      timeStampEnd?: string, 
      variable?: string
    } = {}) => {
      const query = filterQuery(options);
      const res = await axios.get(`http://localhost:8000/data/${id}${query ? `?${query}` : ''}`);
      if (res.status === 200) {
        setRealData(res.data.data);
      }
  }

  const drawPolygon = async (id: number) => {
    const res = (await axios.get(`http://localhost:8000/org/${id}`)).data;
    setLng(res.polygon[0][0]);
    setLat(res.polygon[0][1]);
    setGeoJSON({
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: 'Polygon',
          coordinates: [res.polygon]
        },
      }
    });
  }

  
  useEffect(() => {
    getOrgs();
  }, []);

  useEffect( () => {
    if (mapContainer.current) {
      mapboxgl.accessToken = "pk.eyJ1IjoiZGllZ29hbWlnbyIsImEiOiJjbHYybmZpNjkwanVhMmtsaHd3ZHY4MnZmIn0.kygS_1v9ovRcmaBgjZy3sQ";
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom || 12
      });
      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
      setMap(map);
      return () => map.remove();
    }
  }, [lng, zoom, lat]);

  useEffect(() => {
    if (geoJSON !== undefined && map !== undefined) {
      try {
        map.on('load', () => {
          map.addSource(nameOrgRef.current, geoJSON);
          currentNameOrgRef.current = nameOrgRef.current;
          map.addLayer(
            {
              'id': `${nameOrgRef.current}-chile`,
              'type': 'fill',
              'source': nameOrgRef.current, // reference the data source
              'layout': {},
              'paint': {
                  'fill-color': '#0080ff', // blue color fill
                  'fill-opacity': 0.5
              }
            }
          );
          map.addLayer({
            'id': `${nameOrgRef.current}-outline`,
            'type': 'line',
            'source': nameOrgRef.current,
            'layout': {},
            'paint': {
                'line-color': '#000',
                'line-width': 3
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [geoJSON, map]);

  
  return (
    <>
    <Box
      gap={4} 
      component="div" 
      display="flex" 
      flexDirection={"column"} 
      justifyContent={"center"} 
      p={10} 
      flexBasis={"auto"} 
      flexGrow={1}
    >
        <CardComponent
          orgs={orgs}
          nameOrgRef={nameOrgRef}
          setIdOrg={setIdOrg}
          drawPolygon={drawPolygon}
          obtainData={obtainData}
        />
        <Box
          gap={2} 
          component={"div"} 
          display={"flex"} 
          flexDirection={"row"} 
          flexBasis={"100%"} 
          flexGrow={1}
        >
          <Box
            component={"div"} 
            display={"flex"}
            flexDirection={"column"}
            flexBasis={"50%"} 
            flexGrow={1}
            ref={map !== null ? mapContainer : null}
          >
          </Box>
          <Box
            component={"div"} 
            display={"flex"} 
            flexDirection={"column"} 
            flexBasis={"50%"} 
            flexGrow={1}
          >
            {realdata === null ? 
            <Typography variant="h2" p={"36px"} color="white">
              No hay datos para mostrar / selecciona una organización
            </Typography> : 
            <>
                <ToolbarComponent
                  setOpen={setOpen}
                />
                <DialogComponent
                  open={open}
                  setOpen={setOpen}
                  obtainData={obtainData}
                  idOrg={idOrg!}
                  setDigestTimeStart={setDigestTimeStart}
                  DigestTimeStart={DigestTimeStart}
                  setDigestTimeEnd={setDigestTimeEnd}
                  DigestTimeEnd={DigestTimeEnd}
                  setTimeStampStart={setDigestTimeStart}
                  timeStampStart={timeStampStart}
                  setTimeStampEnd={setDigestTimeEnd}
                  timeStampEnd={timeStampEnd}
                  setVariable={setVariable}
                  variable={variable!}
                />
                <TableComponent
                  realdata={realdata}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  setPage={setPage}
                  setRowsPerPage={setRowsPerPage}
                />
            </>}
          </Box>
        </Box>
    </Box>
    </>
  );
}
