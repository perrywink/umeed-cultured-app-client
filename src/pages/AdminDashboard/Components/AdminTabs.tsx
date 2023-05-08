interface Props {
  onUserPostClick: React.MouseEventHandler;
  onMyPostClick: React.MouseEventHandler;
}

const AdminTabs = ({ onUserPostClick, onMyPostClick }: Props) => {
  return (
    <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-slate-300'>
      <ul className='flex flex-wrap -mb-px'>
        <li className='mr-2'>
          <button
            onClick={onUserPostClick}
            className='inline-block px-12 pb-2 border-b-2 rounded-t-lg hover:text-gray-400 active dark:text-slate-950 dark:border-umeed-tangerine-300'>
            User Posts
          </button>
        </li>
        <li className='mr-2'>
          <button
            onClick={onMyPostClick}
            className='inline-block px-12 pb-2 border-b-2 rounded-t-lg hover:text-gray-400 active dark:text-slate-950 dark:border-umeed-tangerine-300'>
            My Posts
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminTabs;
