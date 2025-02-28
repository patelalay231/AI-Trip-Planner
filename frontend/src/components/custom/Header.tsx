import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
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

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="sticky top-0 w-full backdrop-blur-lg shadow-md dark:border-white/20 border-black/10 border-b z-50 px-4 sm:px-6 py-4 flex justify-between">
      <div className='flex items-center gap-5'>
        <a href="/" className="flex items-center gap-2">
          <span className="ml-2 text-xl sm:text-2xl font-bold ">AI Trip Planner</span>
        </a>
      </div>
      <div className='flex items-center gap-5'>
        {session ? (<div className='flex gap-2'>
            <Button variant={'link'} onClick={()=>navigate('/my-trips')}>My Trips</Button>
          <Button className="hover:bg-[#f56551] transition duration-300"onClick={handleSignOut}>Sign Out</Button>
          </div>
        ) : (
          <Button className="hover:bg-[#f56551] transition duration-300" onClick={handleSignIn}><img 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          alt="Google Logo" 
          className="w-5 h-5"
        />Sign In with Google</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
