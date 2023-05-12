import { PostType } from "../../../types/Post";

interface Props {
  onUserPostClick: React.MouseEventHandler;
  onMyPostClick: React.MouseEventHandler;
  type: PostType
}

const AdminTabs = ({ onUserPostClick, onMyPostClick, type }: Props) => {
  return (
    <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-slate-300'>
      <ul className='flex flex-wrap -mb-px'>
        <li className='mr-2'>
          <button
            onClick={onMyPostClick}
            className={`inline-block px-12 pb-2 border-b-2 rounded-t-lg hover:text-gray-400 active ${type == "MY_POST"?"border-umeed-beige":""}`}>
            My Posts
          </button>
        </li>
        <li className='mr-2'>
          <button
            onClick={onUserPostClick}
            className={`inline-block px-12 pb-2 border-b-2 rounded-t-lg hover:text-gray-400 active  ${type == "USER_POST"?"border-umeed-beige":""}`}>
            User Posts
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminTabs;
