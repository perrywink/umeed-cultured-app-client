import { Post } from "../../../types/Post";

interface Props {
  tabData: [];
}

const AdminTable = ({ tabData }: Props) => {
  const tableContent = tabData || [];

  return (
    <div>
      {tableContent.map((content: Post) => (
        <div>
          <h3> {content.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default AdminTable;
