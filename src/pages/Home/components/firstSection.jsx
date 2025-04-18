import "./firstSection.scss";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import icon from "../../../assets/img/pdp.png";
import "mapbox-gl/dist/mapbox-gl.css";
import { DialogDefault } from "../../../components/Modal";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
export const FirstSection = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const mapRef = useRef();
  const mapContainerRef = useRef();
  const initial_position = [12.16068, 9.23252];
  const initial_zoom = 2.39;
  const [position, setPosition] = useState(initial_position);
  const [zoom, setZoom] = useState(initial_zoom);
  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: initial_position,
      zoom: initial_zoom,
    });
  };
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaGFtemFvZmsiLCJhIjoiY2x3MnN0cmRrMHJoYTJpb2N2OGQ2eTNnOSJ9.aLy9CQtGLr0A3rlH3x2TRg";
    // mapRef.current = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    // });
    mapRef.current = new mapboxgl.Map({
      style: 'mapbox://styles/hamzaofk/cm86m7yii008q01s33d4c6qr7',
      container: mapContainerRef.current,
      center: position,
      zoom: zoom,
    });
    // new mapboxgl.Marker({className:"marker"})
    //   .setLngLat([-3.34202, 34.91449])
    //   .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "black", rotation: 45 })
      .setLngLat([-7.17612, 32.55997])
      .addTo(mapRef.current);

    mapRef.current.on("move", () => {
      // get the current center coordinates and zoom level from the map
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      // update state
      setPosition([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    mapRef.current.on("load", () => {
      mapRef.current.setLayoutProperty('country-label', 'text-field', [
        'format',
        ['get', 'name_en'],
        { 'font-scale': 1.2 },
        '\n',
        {},
        ['get', 'name'],
        {
          'font-scale': 0.8,
          'text-font': [
            'literal',
            ['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
          ]
        }
      ]);
      mapRef.current.loadImage(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png",
        (error, image) => {
          if (error) throw error;

          mapRef.current.addImage("cat", image);

          mapRef.current.addSource("point", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [-3.34202, 34.91449],
                  },
                },
              ],
            },
          });

          mapRef.current.addLayer({
            id: "points",
            type: "symbol",
            source: "point",
            layout: {
              "icon-image": "cat",
              "icon-size": 0.05,
            },
          });
          mapRef.current.on("click", "points", (e) => {
            handleOpen();
            console.log("Clicked feature:", e.features[0]);
          });
        }
      );
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);
  return (
    <>
      <div
        className="w-full h-[100vh]"
        id="map-container"
        ref={mapContainerRef}
      ></div>
      <div className="fixed top-5 right-3 bg-white p-3 rounded">
        <span>
          Latitude : {position[0].toFixed(2)} / Langtitude :{" "}
          {position[1].toFixed(2)} / zoom : {zoom}
        </span>
        <button
          onClick={() => {
            handleButtonClick();
            console.log(messi);
          }}
          className="bg-gray-400 rounded-lg px-4 py-2 cursor-pointer"
        >
          Reset map
        </button>
      </div>
      <Dialog className="p-4" open={open} handler={handleOpen}>
        <DialogHeader>Its a simple modal.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 bg-red-500 px-4 py-2"
          >
            <span>Cancel</span>
          </Button>
          <Button className="mr-1 bg-blue-500 px-4 py-2" variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
