import React from 'react'
import { Search, Users,CreditCard} from "lucide-react";
import { MdPlumbing } from "react-icons/md"

export default function HowItWorks() {
    return (
        <div>
            <div className="text-black bg-gray-200 mt-12  h-120">
                <h1 className="text-4xl text-center font-bold pt-16 pb-3 text-black">
                    How It Works
                </h1>

                <p className="text-center text-gray-600 pb-10 ">Booking a s ervice is simple and seamless. In just a few steps, you’ll be connected with the right professional for your needs.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mb-5 gap-5 pt-10  mx-auto">
                    {[
                        {
                            icon: <Search  size={40} color="blue" />,
                            title: "Search for a Service",
                            desc: "Share what you’re looking for and where you need it.",
                        },
                        {
                            icon: <Users size={40} color="blue" />,
                            title: "Select Your Provider",
                            desc: "Explore verified profiles, review ratings, and choose the best fit.",
                        },
                        {
                            icon: <CreditCard size={40} color="blue" />,
                            title: "Book and Pay Securely",
                            desc: "Confirm your appointment and complete payment with confidence through our trusted platform",
                        },
                    ].map((service, idx) => (
                        <div
                            key={idx}
                            className=" w-72 bg-gray-200 text-black   h-60 flex flex-col justify-center items-center rounded-lg  borer-none text-center space-y-2 max-w-8xl mx-auto"
                        >
                            <div className='bg-blue-100 p-4 rounded-full'>
                            {service.icon}
                            </div>
                            <h1 className="text-lg font-semibold">{service.title}</h1>
                            <p className="text-sm text-gray-600">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}
