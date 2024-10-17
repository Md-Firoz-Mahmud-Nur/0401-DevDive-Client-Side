import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useIndividualArchiveData from "../../Hooks/Nur/useIndividualArchiveData";
import { handleUnarchive } from "./HandleUnarchive";

const ArchiveDetails = ({ archiveDataUser }) => {
  console.log("archiveDataUser", archiveDataUser);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext); // Get the user info

  const {
    data: archiveData,
    isLoading,
    error,
    refetch,
  } = useIndividualArchiveData(user?.email); // Fetch archived data based on user email

  // useEffect(() => {
  //   if (archiveData) {
  //     updateArchiveData(archiveData);
  //   }
  // }, [archiveData, updateArchiveData]); // Get the user info

  console.log(archiveData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // Error state

  if (archiveData.length === 0) {
    // Show a custom message if no archived posts
    return <p>You have not archived any post.</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Archived Posts</h1>
      {archiveData.map((post) => (
        <div
          key={post._id}
          className="p-5 border rounded-lg shadow-md hover:cursor-pointer">
          <div className="flex">
            <div
              onClick={() => navigate(`/post-details/${post.post_id}`)}
              className="flex-grow">
              <h2 className="text-xl font-bold">
                {post.title || "No title available"}
              </h2>
              <p className="text-gray-600">By: {post.username || "Unknown"}</p>
              <p className="text-sm text-gray-500">
                Archived At:{" "}
                {post.archivedAt
                  ? new Date(post.archivedAt).toLocaleString()
                  : "Not available"}
              </p>
            </div>
            <div className="flex items-center">
              {/* add unarchive button  */}
              <button
                onClick={() => handleUnarchive(post.post_id, archiveDataUser, refetch)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4">
                Unarchive
              </button>
            </div>
          </div>
          {/* <p
            className="mt-2 text-md"
            dangerouslySetInnerHTML={{ __html: post.body }}></p> */}
          {/* {post.images.length > 0 && (
            <div className="mt-4 flex space-x-4">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Post Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )} */}
          {/* <p className="mt-2">
            <strong>Likes:</strong> {post.likes} | <strong>Dislikes:</strong>{" "}
            {post.dislikes} | <strong>Comments:</strong> {post.comments}
          </p> */}
          {/* <p className="mt-2 text-sm text-gray-500">
            <strong>Archived By:</strong> {post.archivedBy.name} (
            {post.archivedBy.email})
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default ArchiveDetails;
