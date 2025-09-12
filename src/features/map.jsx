import { useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';

export default function Test() {
    const position = { lat: 53.54, lng: 10 };

    return {
        <APIProvider apiKey={import.meta.env.VITE_GOOGLEMAPS_API_KEY}>
            <div>React Google Maps</div>
        </APIProvider>
    }
        
}