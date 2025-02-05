import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";

export default function PlacePage() {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/places/'+ id).then(response => {
            setPlace(response.data);
        });
    }, [id]);


    if(!place) return '';

    if(showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-8 grid gap-4 ">

                    <div>
                        <h2 className="text-3xl"> Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)}     className="right-12 top-8 fixed flex gap-1 py-2 px-4 rounded-2xl">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                            Close Photos
                        </button>
                    </div>

                {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div>
                        <img src={'http://localhost:4000/uploads/' + photo}></img>
                    </div>
                ))}

                </div>
                
            </div>
        );
    }

    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-2 block font-bold underline"target="_blank"href={'https://maps.google.com/?q=' +place.address}>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            {place.address}
            
            </a>
            
            <div className="relative">

            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img className="aspect-square object cover"src={'http://localhost:4000/uploads/' + place.photos[0]}></img>
                        </div>
                    )}
                </div>

                <div className="grid">
                {place.photos?.[1] && (
                        <img className="aspect-square object cover" src={'http://localhost:4000/uploads/' + place.photos[1]}></img>
                )}

                <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <img className="aspect-square object cover relative top-2" src={'http://localhost:4000/uploads/' + place.photos[2]}></img>
                    )}

                </div>
                </div>
            </div>
            
            <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 ">Show more photos</button>

            </div>

            

            <div className="mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">

                <div>

                <div className="my-4">
                    <h2 className="font-bold text-2xl">Description</h2>
                    {place.description}
                </div>

                    Check in: {place.checkIn} <br/>
                    Check out: {place.checkOut} <br/>
                    Max number of Guests: {place.maxGuests} 

                    
                </div>

                <div>
                    <BookingWidget place={place}/>
                </div>

                </div>

                <div>
                    <h2 className="font-bold text-2xl">Extra Info</h2>
                </div>

                <div className="text-sm text-gray-700 leading-4 mt-1">
                    {place.extraInfo}
                </div>
        </div>
    );
}