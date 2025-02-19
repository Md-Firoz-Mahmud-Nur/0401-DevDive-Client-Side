import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosPublic from "./useAxiosPublic";


const useCommentLike = () => {
    const {user,loading}=UseAuth()
     const axiosPublic=useAxiosPublic()


        const {data:commentLikes=[0],isLoading,refetch:likeRefetch}=useQuery({
            queryKey:['commentLikes',user?.email],
            enabled:!!user?.email && !loading,
            queryFn: async () => {
                const res = await axiosPublic.get(`/getCommentLikes`);
                return [res.data];

            },

        })
        //    likeRefetch()

        console.log("useCommentLike", commentLikes[0]);



        return [commentLikes[0],isLoading,likeRefetch]
};

export default useCommentLike;