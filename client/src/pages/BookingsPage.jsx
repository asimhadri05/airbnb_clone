import AccountNav from "../AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg.";
import {differenceInCalendarDays, format} from "date-fns"
import {Link, useParams} from "react-router-dom"

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);
    return (
        <div>
            <AccountNav/>
            <div>
                {bookings?.length > 0 && bookings.map(booking=> (
                    <Link to={'/account/bookings/' + booking._id}className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                          <PlaceImg place={booking.place} /> 
                        </div>

                        <div className="py-3">
                            <h2 className="text-xl">{booking.place.title}</h2>

                            <div>
                                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} -- {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                            </div>

                            <div>
                                Number of nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br /> 
                                Total Price: ${booking.price}
                            </div>
                            
                        </div>

                        
                    </Link>
                ))}
            </div>
        </div>
    )
}