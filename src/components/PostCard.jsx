import moment from "moment";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { BiTrashAlt, BiEdit } from "react-icons/bi";

const PostCard = ({ post }) => {
  const [currentUserPostAuthor, setCurrentUserPostAuthor] = useState(false);
  const { _id, title, createdAt, image, category, userId } = post;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (userId === currentUser?._id) setCurrentUserPostAuthor(true);
  }, [currentUser?._id, userId]);

  const handleDeletePost = (e) => {
    console.log("deleted!");
  };

  return (
    <section className="mx-auto border-b border-gray-400 my-4 flex flex-col items-center justify-center md:flex-row md:justify-between max-w-3xl py-4">
      <img
        className="md:w-2/5 w-72 h-44 object-cover"
        src={
          image?.url ||
          "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?b=1&s=170667a&w=0&k=20&c=LEhQ7Gji4-gllQqp80hLpQsLHlHLw61DoiVf7XJsSx0="
        }
        alt="post img"
      />
      <div className="w-full md:ml-6 md:w-3/5 flex flex-col justify-between content-between">
        <Link to={`/post/${_id}`}>
          <h2 className="text-gray-700 hover:text-gray-800 font-bold text-xl">
            {title}
          </h2>
        </Link>
        <Link
          className="text-blue-500 my-2"
          to={`/?cat=${category.toLowerCase()}`}
        >
          {_.capitalize(category)}
        </Link>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">{moment(createdAt).fromNow()}</p>
          {currentUserPostAuthor && (
            <div className="flex">
              <Link
                className="text-3xl ml-2 text-blue-500 hover:text-blue-600"
                to={`/edit/${_id}`}
              >
                <BiEdit />
              </Link>
              <Link
                className="text-3xl ml-2 text-red-500 hover:text-red-600"
                onClick={handleDeletePost}
              >
                <BiTrashAlt />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostCard;
