import CreatePostButton from "./_components/CreatePostButton";

interface PostsPageProps {}
const PostsPage: React.FC<PostsPageProps> = ({}) => {
  return (
    <div>
      <div>
        <CreatePostButton />
      </div>
    </div>
  );
};
export default PostsPage;
