import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { IPreviewItems } from "../CreatePost";

interface IProps {
  preview: IPreviewItems[];
  onChange: ({ currentTarget: { files }, }: React.ChangeEvent<HTMLInputElement>) => void
  ref:React.RefObject<HTMLInputElement>
}

const UploadImgEmptyState = ({preview, onChange, ref}: IProps) => {

  return preview.length == 0 ? (
    <div className="flex flex-col items-center justify-center">
      <i>
        <CloudArrowUpIcon className="h-10 w-10 text-gray-800" />
      </i>
      <p className="text-md text-gray-600 font-light">
        Browse and choose files from your device
      </p>
    </div>
  ) : (
    <></>
  );
};

export default UploadImgEmptyState;
