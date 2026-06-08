"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { property } from "@/data/property";

const TEAL = "#31ABB0";

export default function PropertyMap() {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !elRef.current || mapRef.current) return;

      const { lat, lng } = property.coords;

      const map = L.map(elRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      // Property marker — teal pin with home icon
      const propIcon = L.divIcon({
        className: "",
        html: `<div style="width:42px;height:42px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${TEAL};border:3px solid #fff;box-shadow:0 3px 8px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;">
                 <span style="transform:rotate(45deg);font-size:18px;line-height:1;">🏠</span>
               </div>`,
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -40],
      });
      const propMarker = L.marker([lat, lng], { icon: propIcon, zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(
          `<b>${property.layout} · ${property.street}</b><br>${property.city}`
        );

      // POI markers — white circles with emoji
      const pois = property.poiCategories
        .flatMap((c) => c.items)
        .filter((p) => p.coords);

      const bounds: [number, number][] = [[lat, lng]];

      pois.forEach((p) => {
        const c = p.coords!;
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:30px;height:30px;border-radius:50%;background:#fff;border:2px solid ${TEAL};box-shadow:0 2px 5px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:15px;line-height:1;">${p.icon}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
          popupAnchor: [0, -16],
        });
        L.marker([c.lat, c.lng], { icon })
          .addTo(map)
          .bindPopup(`<b>${p.name}</b><br>${p.distance}`);
        bounds.push([c.lat, c.lng]);
      });

      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [45, 45], maxZoom: 16 });
      } else {
        map.setView([lat, lng], 15);
      }

      // Fix sizing after layout + open property popup
      setTimeout(() => {
        map.invalidateSize();
        propMarker.openPopup();
      }, 200);
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        (mapRef.current as { remove: () => void }).remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={elRef} className="absolute inset-0 w-full h-full z-0" />;
}
