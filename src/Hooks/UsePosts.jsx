
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';
import useAxiosPublic from './useAxiosPublic';

const UsePosts = () => {
    
        const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()
 
     
        const {data:posts=[0],isLoading,refetch}=useQuery({
            queryKey:['posts',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/posts`);
                return [res.data];
                
            },
          
        })
           refetch()

        return [posts[0],isLoading,refetch]
    
};

export default UsePosts;