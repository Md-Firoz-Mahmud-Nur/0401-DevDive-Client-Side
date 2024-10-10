import { useState } from "react";
import UseLeaderBoardPosts from "../../Hooks/Nur/UseLeaderBoardPosts";
import UseLeaderBoardLikes from "../../Hooks/Nur/UseLeaderBoardLikes";
import UseLeaderBoardComments from "../../Hooks/Nur/UseLeaderBoardComments";
import { useNavigate } from "react-router-dom";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Post");
  const [loadAllPosts, setLoadAllPosts] = useState(false);
  const [loadAllLikes, setLoadAllLikes] = useState(false);

  const [leaderBoardPosts] = UseLeaderBoardPosts(loadAllPosts);
  const [LeaderBoardLikes] = UseLeaderBoardLikes(loadAllLikes);
  const [leaderBoardComments] = UseLeaderBoardComments();

  const tabs = ["Post", "Like", "Comments"];

  const handleLoadAllPosts = (loadAllPosts) => {
    setLoadAllPosts(!loadAllPosts);
  };

  const handleLoadAllLikes = (loadAllLikes) => {
    setLoadAllLikes(!loadAllLikes);
  };

  return (
    <div className="md:p-4 p-1 w-full mx-auto items-center">
      {/* Tab Header */}
      <div className="flex justify-start items-center mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-lg ml-4 mt-2
              ${
                activeTab === tab
                  ? "bg-blue-500 text-white dark:bg-blue-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full flex  justify-center">
        <div className=" bg-transparent p-2 md:p-6 rounded-lg md:m-4 md:pb-4 w-[768px]">
          {activeTab === "Post" && (
            <div>
              <div className="bg-white shadow rounded-lg dark:bg-themeColor2">
                <div className="card-header px-4 py-2 border-b border-gray-500 text-lg">
                  <strong>Popular Karma</strong>
                </div>
                <p className="m-3 card-text text-gray-700 dark:text-slate-100">
                  Users with highest Liked in Post karma.
                </p>
                <ol className="list-group list-group-flush list-group-numbered pl-0 pr-1 md:pr-4">
                  {leaderBoardPosts.map((post, index) => (
                    <div
                      onClick={() => navigate(`/post-details/${post._id}`)}
                      key={index}
                      className="d-flex justify-between items-center list-group-item list-group-item-action px-1 md:px-4 py-2 border-b w-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none border-gray-300 hover:cursor-pointer">
                      <div className=" ml-2 mr-auto flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <p className="flex-grow">{post.title}</p>
                        <p className="font-medium">{post.likes}</p>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-between items-center list-group-item px-4 py-2">
                    <span>&nbsp;</span>
                    <a
                      onClick={() => handleLoadAllPosts(loadAllPosts)}
                      className="link-primary text-blue-500"
                      href="#">
                      {loadAllPosts ? "Show Top 5" : "Show All"}
                    </a>
                  </div>
                </ol>
              </div>
            </div>
          )}
          {activeTab === "Like" && (
            <div>
              <div className="bg-white shadow rounded-lg dark:bg-themeColor2">
                <div className="card-header px-4 py-2 border-b border-gray-500 text-lg">
                  <strong>Like Karma</strong>
                </div>
                <p className="m-3 card-text text-gray-700 dark:text-slate-100">
                  Users with highest Liked karma.
                </p>
                <ol className="list-group list-group-flush list-group-numbered pl-0 pr-1 md:pr-4">
                  {LeaderBoardLikes[0]?.map((user, index) => (
                    <div
                      key={index}
                      className="d-flex justify-between items-center list-group-item list-group-item-action px-1 md:px-4 py-2 border-b w-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none border-gray-300">
                      <div className=" ml-2 mr-auto flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <p className="flex-grow">{user.name}</p>
                        <p className="font-medium">{user.count}</p>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-between items-center list-group-item px-4 py-2">
                    <span>&nbsp;</span>
                    <a
                      onClick={() => handleLoadAllLikes(loadAllLikes)}
                      className="link-primary text-blue-500"
                      href="#">
                      {loadAllLikes ? "Show Top 5" : "Show All"}
                    </a>
                  </div>
                </ol>
              </div>
            </div>
          )}
          {activeTab === "Comments" && (
            <div>
              <div className="bg-white shadow rounded-lg dark:bg-themeColor2">
                <div className="card-header px-4 py-2 border-b border-gray-500 text-lg">
                  <strong>Comments Karma</strong>
                </div>
                <p className="m-3 card-text text-gray-700 dark:text-slate-100">
                  Users with highest Comment karma.
                </p>
                <ol className="list-group list-group-flush list-group-numbered pl-0 pr-1 md:pr-4">
                  {leaderBoardComments.map((user, index) => (
                    <div
                      key={index}
                      className="d-flex justify-between items-center list-group-item list-group-item-action px-1 md:px-4 py-2 border-b w-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none border-gray-300">
                      <div className=" ml-2 mr-auto flex gap-2">
                        <span className="font-bold">{index + 1}.</span>
                        <p className="flex-grow">{user._id}</p>
                        <p className="font-medium">{user.count}</p>
                      </div>
                    </div>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
