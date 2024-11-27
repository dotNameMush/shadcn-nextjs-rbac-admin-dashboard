import { db } from "@/lib/db";

interface BlogExplorePageProps {}
const BlogExplorePage: React.FC<BlogExplorePageProps> = async ({}) => {
  const posts = db.post.findMany();
  return <div className="container"></div>;
};
export default BlogExplorePage;
