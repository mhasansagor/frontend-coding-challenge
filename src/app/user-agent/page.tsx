import { UserAgentProvider } from "@/components/providers/userAgentProvider";
import { UserAgent } from "@/views/userAgent";


const getServerUserAgent = async () => {  
  return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
};

const UserAgentRoot = async() => {
  const userAgent = await getServerUserAgent();
  return (
    <UserAgentProvider userAgent={userAgent}>
      <UserAgent />
    </UserAgentProvider>
  );
};

export default UserAgentRoot;
