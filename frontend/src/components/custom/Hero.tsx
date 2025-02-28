import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Compass, MapPin, Star } from "lucide-react";
import { toast } from "sonner"
import { JSX, useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Session } from '@supabase/supabase-js';

const Hero = () => {
  
  const [session, setSession] = useState<Session | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  return (
    <>
    <div className="overflow-hidden">
      <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white -z-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left column - Text content */}
            <motion.div 
              className="flex-1 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-6">
                <Star className="w-4 h-4 mr-2" />
                AI-Powered Travel Planning
              </div>
              
              <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
                <span className="text-[#f56551] block">Discover Your Next Adventure</span>
                <span className="block mt-2">Personalized by AI</span>
              </h1>
              
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Let our AI travel assistant create custom itineraries tailored to your interests, 
                budget, and travel style. From hidden gems to popular attractions, we'll plan 
                your perfect trip in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {session ? (
                  <Link to="/create-trip">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-[#f56551] hover:bg-[#e04f3d] transition duration-300"
                    >
                      Plan Your Trip
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-[#f56551] hover:bg-[#e04f3d] transition duration-300"
                    onClick={() => {
                      toast("Please sign in to create a trip");
                    }}
                  >
                    Plan Your Trip
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
                
              </div>
               {/* Trust indicators */}
               <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3, 4].map((i) => (
                      <img 
                        key={i}
                        src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`} 
                        alt="User" 
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <span>Trusted by 10,000+ travelers</span>
                </div>
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>4.9/5 from 2,000+ reviews</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="flex-1 w-full max-w-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                {/* Main image */}
                <motion.div
                  className="rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                    alt="Travel planning on device" 
                    className="w-full h-auto rounded-2xl"
                  />
                  
                  {/* Floating UI elements */}
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="flex items-center mb-2">
                      <MapPin className="w-5 h-5 text-[#f56551] mr-2" />
                      <span className="font-medium">Paris, France</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Perfect 3-day itinerary!</p>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-2">
                      <Compass className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-center">AI-Powered Suggestions</p>
                  </motion.div>
                </motion.div>
                
                {/* Floating image 1 */}
                <motion.div 
                  className="absolute -bottom-12 -right-8 w-32 h-32 rounded-lg overflow-hidden shadow-lg border-4 border-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Travel destination" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Floating image 2 */}
                <motion.div 
                  className="absolute -top-10 left-10 w-24 h-24 rounded-lg overflow-hidden shadow-lg border-4 border-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Travel destination" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
      </div>
      <div>

      </div>
      </section>
      <section>
        <div className="flex w-full justify-center gap-4 py-10">
          {/* Features */}
          {
            features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))
          }
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600">
              Join thousands of happy travelers who have discovered their perfect trips with our AI planner.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ 
                    opacity: activeTestimonial === index ? 1 : 0,
                    x: activeTestimonial === index ? 0 : 100,
                    position: activeTestimonial === index ? 'relative' : 'absolute',
                    zIndex: activeTestimonial === index ? 10 : 0,
                    top: 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <p className="text-sm text-gray-500">{testimonial.trip}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? 'bg-[#f56551]' : 'bg-gray-300'
                  }`}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
      
    <section className="relative flex flex-col items-center py-10 h-screen bg-gradient-to-b from-white to-[#fcae9e] text-black overflow-hidden">
      <div className="relative text-center px-6">
        <h1 className="text-4xl font-bold">See It in Action! 🚀</h1>
        <p className="mt-4 text-lg  font-medium max-w-4xl mx-auto">
          Get a glimpse of how our AI Trip Planner simplifies travel planning. With a sleek interface and smart recommendations, planning your next adventure has never been easier!
        </p>
      </div>
      
      <div className="relative flex justify-between space-x-[-50px] mt-10">
        <img src='./create-trip.png' className="h-80 rounded-2xl shadow-lg mt-20 border-2 border-black"/>
        <img src='./display-trip.png' className="h-150 rounded-2xl shadow-xl border-2 border-black z-1"/>
        <img src='./my-trip.png' className="h-80 rounded-2xl shadow-xl border-2 border-black z-0 mt-20"/>
      </div>
    </section>
    </>
  );
};

interface FeatureProps {
  text: string;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
}

const Feature = ({ text, icon, bgColor, textColor }: FeatureProps) => (
  <div className="flex items-center gap-2">
    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgColor}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={textColor}
      >
        {icon}
      </svg>
    </div>
    <p className="text-sm font-medium">{text}</p>
  </div>
);

const features = [
  {
    text: "AI-Powered Recommendations",
    icon: <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></>,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    text: "Save Time Planning",
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    text: "Personalized Experiences",
    icon: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></>,
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    quote: "The AI planner created the perfect 10-day Italy itinerary for our honeymoon. It suggested amazing restaurants and activities we would have never found on our own!",
    trip: "10-day tour of Italy"
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "As a solo traveler with specific interests in history and architecture, I was amazed at how well the AI understood what I was looking for. My trip to Portugal was perfectly tailored.",
    trip: "7-day cultural tour of Portugal"
  },
  {
    name: "Emma Rodriguez",
    location: "London, UK",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "Planning a family trip with different age groups is usually a nightmare, but the AI created a Japan itinerary with activities everyone loved. Best family vacation ever!",
    trip: "14-day family adventure in Japan"
  }
];

export default Hero;
