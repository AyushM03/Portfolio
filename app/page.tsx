import { ContactFooter } from "./components/ContactFooter";
import { ProfileBanner } from "./components/ProfileBanner";
import { SelfServise } from "./components/SeftServise";

export default function Home() {
  return (
   
    <><div className="max-w-7xl px-4 w-full md:px-8 mx-auto">
      <ProfileBanner />
      

      
    </div><div><SelfServise />
      </div>
      <div className="max-w-8xl px-4 w-full md:px-8 mx-auto"><ContactFooter/></div>
      </>
    
    
  );
}
