"use client";
import CustomModal from "@/components/common/CustomModal";
import PostForm from "@/components/forms/PostForm";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

interface CreatePostButtonProps {}
const CreatePostButton: React.FC<CreatePostButtonProps> = ({}) => {
  const { setOpen } = useModal();
  const openPostModal = () => {
    setOpen(
      <CustomModal title="New Post">
        <PostForm />
      </CustomModal>
    );
  };
  return <Button onClick={() => openPostModal()}>+ Post</Button>;
};
export default CreatePostButton;
